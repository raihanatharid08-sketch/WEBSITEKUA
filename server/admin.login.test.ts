import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createMockContext(): { ctx: TrpcContext; cookies: CookieCall[] } {
  const cookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        cookies.push({ name, value, options });
      },
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx, cookies };
}

describe("admin.login", () => {
  it("should login successfully with correct password", async () => {
    const { ctx, cookies } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.login({
      email: "ustadz@kuapecalungan.com",
      password: "KUAPECALUNGAN",
    });

    expect(result).toEqual({ success: true });
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.name).toBe("app_session_id");
  });

  it("should reject login with wrong password", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.login({
        email: "ustadz@kuapecalungan.com",
        password: "wrongpassword",
      })
    ).rejects.toThrow("Password salah");
  });

  it("should reject login with invalid email format", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.login({
        email: "invalid-email",
        password: "KUAPECALUNGAN",
      })
    ).rejects.toThrow();
  });
});
