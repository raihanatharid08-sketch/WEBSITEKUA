import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
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
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("bookmarks", () => {
  it("should toggle bookmark on and off", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // First toggle - should bookmark
    const result1 = await caller.bookmarks.toggle({ questionId: 1 });
    expect(result1.bookmarked).toBe(true);

    // Second toggle - should remove bookmark
    const result2 = await caller.bookmarks.toggle({ questionId: 1 });
    expect(result2.bookmarked).toBe(false);
  });

  it("should check if question is bookmarked", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Initially not bookmarked
    const check1 = await caller.bookmarks.check({ questionId: 2 });
    expect(check1.bookmarked).toBe(false);

    // Bookmark it
    await caller.bookmarks.toggle({ questionId: 2 });

    // Should be bookmarked now
    const check2 = await caller.bookmarks.check({ questionId: 2 });
    expect(check2.bookmarked).toBe(true);
  });

  it("should list user bookmarks", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Get initial list
    const list = await caller.bookmarks.list();
    expect(Array.isArray(list)).toBe(true);
  });
});
