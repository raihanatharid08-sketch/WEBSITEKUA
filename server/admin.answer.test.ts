import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

function createUserContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("admin.questions.answer", () => {
  it("allows admin to answer questions", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // First create a question
    const publicCaller = appRouter.createCaller({
      user: undefined,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    await publicCaller.questions.submit({
      name: "Test User",
      categoryId: 1,
      questionText: "Bagaimana hukum wudhu dengan air hujan?",
    });

    // Get the question to answer
    const pendingQuestions = await caller.admin.questions.list({ isAnswered: false });
    expect(pendingQuestions.length).toBeGreaterThan(0);

    const questionToAnswer = pendingQuestions[0];

    // Answer the question
    const result = await caller.admin.questions.answer({
      questionId: questionToAnswer!.id,
      answerText: "Air hujan adalah air yang suci dan mensucikan, boleh digunakan untuk wudhu berdasarkan dalil Al-Quran dan Hadits.",
    });

    expect(result).toEqual({ success: true });
  });

  it("prevents non-admin from answering questions", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.questions.answer({
        questionId: 1,
        answerText: "This should fail",
      })
    ).rejects.toThrow("Admin access required");
  });

  it("validates minimum answer length", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.questions.answer({
        questionId: 1,
        answerText: "Pendek",
      })
    ).rejects.toThrow();
  });
});
