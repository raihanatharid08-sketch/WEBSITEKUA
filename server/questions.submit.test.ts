import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { getDb } from "./db";
import { questions } from "../drizzle/schema";
import { eq } from "drizzle-orm";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("questions.submit", () => {
  it("allows public users to submit questions", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.questions.submit({
      name: "Ahmad",
      email: "ahmad@example.com",
      categoryId: 1,
      questionText: "Bagaimana hukum shalat berjamaah di rumah?",
    });

    expect(result).toEqual({ success: true });

    // Verify question was created in database
    const db = await getDb();
    if (db) {
      const createdQuestions = await db
        .select()
        .from(questions)
        .where(eq(questions.name, "Ahmad"))
        .limit(1);

      expect(createdQuestions.length).toBe(1);
      expect(createdQuestions[0]?.questionText).toBe("Bagaimana hukum shalat berjamaah di rumah?");
      expect(createdQuestions[0]?.isAnswered).toBe(false);
      expect(createdQuestions[0]?.isPublished).toBe(false);
    }
  });

  it("validates minimum question length", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.questions.submit({
        name: "Ahmad",
        categoryId: 1,
        questionText: "Pendek",
      })
    ).rejects.toThrow();
  });

  it("requires name field", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.questions.submit({
        name: "",
        categoryId: 1,
        questionText: "Bagaimana hukum shalat berjamaah?",
      })
    ).rejects.toThrow();
  });
});
