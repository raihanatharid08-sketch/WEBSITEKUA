import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Detailed fiqih material content for each category
 */
export const fiqihMaterials = mysqlTable("fiqih_materials", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FiqihMaterial = typeof fiqihMaterials.$inferSelect;
export type InsertFiqihMaterial = typeof fiqihMaterials.$inferInsert;
