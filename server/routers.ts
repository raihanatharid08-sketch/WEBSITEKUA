import { COOKIE_NAME } from "@shared/const";
import { questions as questionsTable, categories, fiqihMaterials } from "../drizzle/schema";
import { eq, like, and, isNotNull } from "drizzle-orm";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getApprovedTestimonials, createTestimonial, getPendingTestimonials, approveTestimonial, getDb, updateUserOpenId } from "./db";
import { z } from "zod";
import { 
  getAllCategories, 
  createQuestion, 
  getAllQuestions, 
  getQuestionById,
  getAnswersByQuestionId,
  createAnswer,
  getCategoryById,
  getQuestionWithDetails,
  getMaterialsByCategoryId,
  getUserByOpenId,
  upsertUser,
  getUserByEmail,
  createUserWithPassword,
  createAdminLog,
  getAdminLogs,
  deleteQuestion,
  createBookmark,
  deleteBookmark,
  getUserBookmarks,
  isBookmarked
} from "./db";
import { sendQuestionAnsweredEmail } from "./emailNotification";
import { TRPCError } from "@trpc/server";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  search: router({
    global: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { questions: [], materials: [] };

        const { query } = input;
        const searchTerm = `%${query}%`;

        // Search questions
        const questions = await db
          .select({
            id: questionsTable.id,
            questionText: questionsTable.questionText,
            askerName: questionsTable.name,
            categoryName: categories.name,
          })
          .from(questionsTable)
          .leftJoin(categories, eq(questionsTable.categoryId, categories.id))
          .where(
            and(
              like(questionsTable.questionText, searchTerm),
              eq(questionsTable.isAnswered, true)
            )
          )
          .limit(5);

        // Search materials
        const materials = await db
          .select({
            id: fiqihMaterials.id,
            title: fiqihMaterials.title,
            categoryId: fiqihMaterials.categoryId,
            categoryName: categories.name,
          })
          .from(fiqihMaterials)
          .leftJoin(categories, eq(fiqihMaterials.categoryId, categories.id))
          .where(like(fiqihMaterials.title, searchTerm))
          .limit(5);

        return { questions, materials };
      }),
  }),
  testimonials: router({
    getApproved: publicProcedure.query(async () => {
      return await getApprovedTestimonials();
    }),
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        content: z.string().min(10),
        rating: z.number().min(1).max(5),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        await createTestimonial({
          userId: ctx.user.id,
          name: input.name,
          content: input.content,
          rating: input.rating,
          isApproved: 0,
        });
        return { success: true };
      }),
    getPending: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return await getPendingTestimonials();
    }),
    approve: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        await approveTestimonial(input.id);
        return { success: true };
      }),
  }),
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    register: publicProcedure
      .input(z.object({
        email: z.string().email("Email tidak valid"),
        password: z.string().min(6, "Password minimal 6 karakter"),
        name: z.string().min(1, "Nama harus diisi"),
      }))
      .mutation(async ({ input, ctx }) => {
        // Check if user already exists
        const existingUser = await getUserByEmail(input.email);
        if (existingUser) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Email sudah terdaftar' });
        }

        // Create new user
        await createUserWithPassword({
          email: input.email,
          password: input.password,
          name: input.name,
        });

        // Get the created user
        const user = await getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Gagal membuat akun' });
        }

        // Create openId if not exists (for regular users)
        if (!user.openId) {
          user.openId = `user_${user.id}_${Date.now()}`;
          await updateUserOpenId(user.id, user.openId);
        }

        // Set session cookie
        const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);

        return { success: true, user: { id: user.id, name: user.name, email: user.email } };
      }),

    login: publicProcedure
      .input(z.object({
        email: z.string().email("Email tidak valid"),
        password: z.string().min(1, "Password harus diisi"),
      }))
      .mutation(async ({ input, ctx }) => {
        // Find user by email
        const user = await getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Email atau password salah' });
        }

        // Verify password (in production, use bcrypt.compare)
        if (user.password !== input.password) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Email atau password salah' });
        }

        // Update last signed in
        await upsertUser({
          openId: user.openId,
          lastSignedIn: new Date(),
        });

        // Create openId if not exists (for regular users)
        if (!user.openId) {
          user.openId = `user_${user.id}_${Date.now()}`;
          await updateUserOpenId(user.id, user.openId);
        }

        // Set session cookie
        const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);

        return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
      }),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  bookmarks: router({
    toggle: protectedProcedure
      .input(z.object({ questionId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const bookmarked = await isBookmarked(ctx.user.id, input.questionId);
        
        if (bookmarked) {
          await deleteBookmark(ctx.user.id, input.questionId);
          return { bookmarked: false };
        } else {
          await createBookmark(ctx.user.id, input.questionId);
          return { bookmarked: true };
        }
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await getUserBookmarks(ctx.user.id);
      }),
      
    check: protectedProcedure
      .input(z.object({ questionId: z.number() }))
      .query(async ({ input, ctx }) => {
        const bookmarked = await isBookmarked(ctx.user.id, input.questionId);
        return { bookmarked };
      }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return await getAllCategories();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const category = await getCategoryById(input.id);
        if (!category) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Category not found' });
        }
        return category;
      }),
    getMaterials: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await getMaterialsByCategoryId(input.categoryId);
      }),
  }),

  questions: router({
    submit: protectedProcedure
      .input(z.object({
        name: z.string().min(1, "Nama harus diisi"),
        email: z.string().email("Email tidak valid").optional(),
        categoryId: z.number(),
        questionText: z.string().min(1, "Pertanyaan harus diisi"),
      }))
      .mutation(async ({ input, ctx }) => {
        await createQuestion({
          userId: ctx.user?.id,
          name: input.name,
          email: input.email || ctx.user?.email,
          categoryId: input.categoryId,
          questionText: input.questionText,
          isAnswered: false,
          isPublished: false,
        });
        return { success: true };
      }),

    list: protectedProcedure
      .input(z.object({
        categoryId: z.number().optional(),
        isAnswered: z.boolean().optional(),
      }).optional())
      .query(async ({ input, ctx }) => {
        // Users only see their own questions
        return await getAllQuestions({
          ...input,
          userId: ctx.user?.id,
        });
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const question = await getQuestionById(input.id);
        if (!question) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Question not found' });
        }
        
        // Only show question to owner or admin
        if (question.userId !== ctx.user?.id && ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'You can only view your own questions' });
        }
        
        const answers = await getAnswersByQuestionId(input.id);
        const category = await getCategoryById(question.categoryId);
        
        return {
          ...question,
          answers,
          category,
        };
      }),
  }),

  admin: router({
    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        // Validasi email admin
        if (input.email !== "kuapecalungan15@gmail.com") {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Email tidak terdaftar sebagai admin" });
        }
        
        // Validasi password
        if (input.password !== "KUAPECALUNGAN") {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Password salah" });
        }

        // Buat atau update user dengan role admin
        const openId = `admin-${input.email}`;
        await upsertUser({
          openId,
          email: input.email,
          name: "Ustadz Admin",
          role: "admin",
          loginMethod: "password",
          lastSignedIn: new Date(),
        });

        // Set session cookie
        const user = await getUserByOpenId(openId);
        if (!user) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Gagal membuat session" });
        }

        // Set session cookie dengan JWT
        const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);
        
        // Log admin login
        await createAdminLog({
          adminId: user.id,
          action: "LOGIN",
          details: JSON.stringify({ email: input.email }),
        });

        return { success: true };
      }),
      
    logs: adminProcedure
      .query(async () => {
        const logs = await getAdminLogs(50);
        return logs;
      }),
      
    changePassword: adminProcedure
      .input(z.object({ newPassword: z.string().min(8) }))
      .mutation(async ({ input, ctx }) => {
        // TODO: Implementasi change password dengan hash
        // Untuk saat ini, hanya log aktivitas
        await createAdminLog({
          adminId: ctx.user.id,
          action: "CHANGE_PASSWORD",
          details: JSON.stringify({ timestamp: new Date().toISOString() }),
        });
        
        return { success: true };
      }),
      
    deleteQuestion: adminProcedure
      .input(z.object({ questionId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await deleteQuestion(input.questionId);
        
        // Log admin activity
        await createAdminLog({
          adminId: ctx.user.id,
          action: 'delete_question',
          details: `Deleted question ID: ${input.questionId}`,
        });

        return { success: true };
      }),

    questions: router({
      list: adminProcedure
        .input(z.object({
          isAnswered: z.boolean().optional(),
        }).optional())
        .query(async ({ input }) => {
          // Admin can see all questions including unpublished
          return await getAllQuestions(input);
        }),

      getById: adminProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input }) => {
          const question = await getQuestionById(input.id);
          if (!question) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Question not found' });
          }
          
          const answers = await getAnswersByQuestionId(input.id);
          const category = await getCategoryById(question.categoryId);
          
          return {
            ...question,
            answers,
            category,
          };
        }),

      answer: adminProcedure
        .input(z.object({
          questionId: z.number(),
          answerText: z.string().min(1, "Jawaban harus diisi"),
        }))
        .mutation(async ({ input, ctx }) => {
          // Get question details before answering
          const questionDetails = await getQuestionWithDetails(input.questionId);
          
          await createAnswer({
            questionId: input.questionId,
            ustadzId: ctx.user.id,
            answerText: input.answerText,
          });
          
          // Log admin activity
          await createAdminLog({
            adminId: ctx.user.id,
            action: "ANSWER_QUESTION",
            details: JSON.stringify({ questionId: input.questionId }),
            questionId: input.questionId,
          });
          
          // Send email notification if user provided email
          if (questionDetails?.email) {
            try {
              await sendQuestionAnsweredEmail({
                recipientEmail: questionDetails.email,
                recipientName: questionDetails.name,
                questionText: questionDetails.questionText,
                answerText: input.answerText,
                categoryName: questionDetails.category?.name || "Fiqih",
                questionId: input.questionId,
              });
            } catch (error) {
              console.error("Failed to send email notification:", error);
              // Don't fail the mutation if email fails
            }
          }
          
          return { success: true };
        }),
    }),

    // User Management
    users: router({
      list: adminProcedure
        .input(z.object({
          role: z.enum(["user", "admin"]).optional(),
          status: z.enum(["active", "suspended", "deleted"]).optional(),
        }).optional())
        .query(async ({ input }) => {
          const { getAllUsers } = await import("./db");
          return await getAllUsers(input || {});
        }),

      suspend: adminProcedure
        .input(z.object({ userId: z.number() }))
        .mutation(async ({ input }) => {
          const { suspendUser } = await import("./db");
          await suspendUser(input.userId);
          return { success: true, message: "User berhasil disuspend" };
        }),

      unsuspend: adminProcedure
        .input(z.object({ userId: z.number() }))
        .mutation(async ({ input }) => {
          const { unsuspendUser } = await import("./db");
          await unsuspendUser(input.userId);
          return { success: true, message: "Suspend user berhasil dibatalkan" };
        }),

      delete: adminProcedure
        .input(z.object({ userId: z.number(), permanent: z.boolean().optional() }))
        .mutation(async ({ input }) => {
          const { deleteUser, permanentlyDeleteUser } = await import("./db");
          
          if (input.permanent) {
            await permanentlyDeleteUser(input.userId);
            return { success: true, message: "User berhasil dihapus permanen" };
          } else {
            await deleteUser(input.userId);
            return { success: true, message: "User berhasil dihapus" };
          }
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
