import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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

describe("categories.getMaterials", () => {
  it("returns materials for a valid category", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Get materials for Thaharah (categoryId: 1)
    const materials = await caller.categories.getMaterials({ categoryId: 1 });

    expect(Array.isArray(materials)).toBe(true);
    expect(materials.length).toBeGreaterThan(0);
    
    if (materials.length > 0) {
      expect(materials[0]).toHaveProperty("title");
      expect(materials[0]).toHaveProperty("content");
      expect(materials[0]?.categoryId).toBe(1);
    }
  });

  it("returns empty array for category without materials", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Use a high category ID that likely doesn't exist
    const materials = await caller.categories.getMaterials({ categoryId: 9999 });

    expect(Array.isArray(materials)).toBe(true);
    expect(materials.length).toBe(0);
  });

  it("returns materials ordered by displayOrder", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const materials = await caller.categories.getMaterials({ categoryId: 1 });

    if (materials.length > 1) {
      // Check that materials are ordered
      for (let i = 0; i < materials.length - 1; i++) {
        expect(materials[i]!.displayOrder).toBeLessThanOrEqual(materials[i + 1]!.displayOrder);
      }
    }
  });
});
