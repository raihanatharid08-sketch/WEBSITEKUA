import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, ratings, InsertRating, testimonials, InsertTestimonial, adminLogs, InsertAdminLog, categories, questions, answers, InsertQuestion, InsertAnswer, InsertCategory, fiqihMaterials, bookmarks } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Category queries
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(categories).orderBy(categories.displayOrder);
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Question queries
export async function createQuestion(question: InsertQuestion) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(questions).values(question);
  return result;
}

export async function getAllQuestions(filters?: { categoryId?: number; isAnswered?: boolean; isPublished?: boolean; userId?: number }) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(questions);
  
  const conditions = [];
  if (filters?.categoryId) {
    conditions.push(eq(questions.categoryId, filters.categoryId));
  }
  if (filters?.isAnswered !== undefined) {
    conditions.push(eq(questions.isAnswered, filters.isAnswered));
  }
  if (filters?.isPublished !== undefined) {
    conditions.push(eq(questions.isPublished, filters.isPublished));
  }
  if (filters?.userId !== undefined) {
    conditions.push(eq(questions.userId, filters.userId));
  }
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }
  
  return await query.orderBy(desc(questions.createdAt));
}

export async function getQuestionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(questions).where(eq(questions.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateQuestion(id: number, data: Partial<InsertQuestion>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(questions).set(data).where(eq(questions.id, id));
}

// Answer queries
export async function createAnswer(answer: InsertAnswer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(answers).values(answer);
  
  // Mark question as answered and published
  await updateQuestion(answer.questionId, { isAnswered: true, isPublished: true });
  
  return result;
}

export async function getQuestionWithDetails(questionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const question = await getQuestionById(questionId);
  if (!question) return undefined;
  
  const category = await getCategoryById(question.categoryId);
  
  return {
    ...question,
    category,
  };
}

export async function getAnswersByQuestionId(questionId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(answers).where(eq(answers.questionId, questionId)).orderBy(desc(answers.createdAt));
}

// Fiqih Materials queries
export async function getMaterialsByCategoryId(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(fiqihMaterials).where(eq(fiqihMaterials.categoryId, categoryId)).orderBy(fiqihMaterials.displayOrder);
}

// Admin logs
export async function createAdminLog(log: InsertAdminLog) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create admin log: database not available");
    return;
  }

  try {
    await db.insert(adminLogs).values(log);
  } catch (error) {
    console.error("[Database] Failed to create admin log:", error);
  }
}

export async function getAdminLogs(limit: number = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get admin logs: database not available");
    return [];
  }

  const logs = await db.select().from(adminLogs).orderBy(desc(adminLogs.createdAt)).limit(limit);
  return logs;
}

// Bookmarks
export async function createBookmark(userId: number, questionId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create bookmark: database not available");
    return;
  }

  try {
    await db.insert(bookmarks).values({ userId, questionId });
  } catch (error) {
    console.error("[Database] Failed to create bookmark:", error);
    throw error;
  }
}

export async function deleteBookmark(userId: number, questionId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete bookmark: database not available");
    return;
  }

  try {
    await db.delete(bookmarks).where(and(eq(bookmarks.userId, userId), eq(bookmarks.questionId, questionId)));
  } catch (error) {
    console.error("[Database] Failed to delete bookmark:", error);
    throw error;
  }
}

export async function getUserBookmarks(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select({
      id: bookmarks.id,
      questionId: bookmarks.questionId,
      createdAt: bookmarks.createdAt,
      questionText: questions.questionText,
      categoryId: questions.categoryId,
      isAnswered: questions.isAnswered,
    })
    .from(bookmarks)
    .innerJoin(questions, eq(bookmarks.questionId, questions.id))
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));

  return result;
}

export async function isBookmarked(userId: number, questionId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .select()
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.questionId, questionId)))
    .limit(1);

  return result.length > 0;
}

// Rating functions
export async function createRating(rating: InsertRating) {
  const db = await getDb();
  if (!db) return null;
  
  await db.insert(ratings).values(rating);
  return { success: true };
}

export async function getAverageRating(answerId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(ratings)
    .where(eq(ratings.answerId, answerId));
  
  if (result.length === 0) return { average: 0, count: 0 };
  
  const sum = result.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / result.length, count: result.length };
}

// Testimonial functions
export async function createTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) return null;
  
  await db.insert(testimonials).values(testimonial);
  return { success: true };
}

export async function getApprovedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isApproved, 1))
    .orderBy(desc(testimonials.createdAt))
    .limit(10);
}

export async function getPendingTestimonials() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isApproved, 0))
    .orderBy(desc(testimonials.createdAt));
}

export async function approveTestimonial(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  await db
    .update(testimonials)
    .set({ isApproved: 1 })
    .where(eq(testimonials.id, id));
  
  return { success: true };
}

// Delete question and its related data
export async function deleteQuestion(questionId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Delete related answers first
    await db.delete(answers).where(eq(answers.questionId, questionId));
    
    // Delete related bookmarks
    await db.delete(bookmarks).where(eq(bookmarks.questionId, questionId));
    
    // Delete the question
    await db.delete(questions).where(eq(questions.id, questionId));
  } catch (error) {
    console.error("[Database] Failed to delete question:", error);
    throw error;
  }
}

// User authentication functions
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUserWithPassword(data: {
  email: string;
  password: string;
  name: string;
}): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create user: database not available");
    return;
  }

  const openId = `user-${data.email}`;
  
  await db.insert(users).values({
    openId,
    email: data.email,
    password: data.password, // In production, this should be hashed
    name: data.name,
    role: 'user',
    loginMethod: 'email',
    lastSignedIn: new Date(),
  });
}

export async function updateUserOpenId(userId: number, openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user openId: database not available");
    return;
  }

  try {
    await db.update(users).set({ openId }).where(eq(users.id, userId));
  } catch (error) {
    console.error("[Database] Failed to update user openId:", error);
    throw error;
  }
}


// ============================================
// USER MANAGEMENT FUNCTIONS (ADMIN)
// ============================================

export async function getAllUsers(filters?: { role?: string; status?: string }) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db.select().from(users);
  
  const conditions = [];
  if (filters?.role) {
    conditions.push(eq(users.role, filters.role as any));
  }
  if (filters?.status) {
    conditions.push(eq(users.status, filters.status as any));
  }
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }
  
  return await query.orderBy(desc(users.createdAt));
}

export async function suspendUser(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(users)
    .set({ 
      status: "suspended",
      isSuspended: true,
      updatedAt: new Date()
    })
    .where(eq(users.id, userId));
}

export async function unsuspendUser(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(users)
    .set({ 
      status: "active",
      isSuspended: false,
      updatedAt: new Date()
    })
    .where(eq(users.id, userId));
}

export async function deleteUser(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Soft delete: mark as deleted instead of actually deleting
  await db
    .update(users)
    .set({ 
      status: "deleted",
      updatedAt: new Date()
    })
    .where(eq(users.id, userId));
}

export async function permanentlyDeleteUser(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Hard delete: actually remove from database
  await db
    .delete(users)
    .where(eq(users.id, userId));
}
