var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";
var users, adminLogs, categories, questions, answers, bookmarks, ratings, testimonials, fiqihMaterials;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      password: varchar("password", { length: 255 }),
      loginMethod: varchar("loginMethod", { length: 64 }),
      role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
      status: mysqlEnum("status", ["active", "suspended", "deleted"]).default("active").notNull(),
      isSuspended: boolean("isSuspended").default(false).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    adminLogs = mysqlTable("adminLogs", {
      id: int("id").autoincrement().primaryKey(),
      adminId: int("adminId").notNull(),
      action: varchar("action", { length: 100 }).notNull(),
      // e.g., "ANSWER_QUESTION", "LOGIN", "CHANGE_PASSWORD"
      details: text("details"),
      // JSON string with additional details
      questionId: int("questionId"),
      // Optional reference to question
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    categories = mysqlTable("categories", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 100 }).notNull(),
      slug: varchar("slug", { length: 100 }).notNull().unique(),
      description: text("description"),
      displayOrder: int("displayOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    questions = mysqlTable("questions", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId"),
      categoryId: int("categoryId").notNull(),
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }),
      questionText: text("questionText").notNull(),
      isAnswered: boolean("isAnswered").default(false).notNull(),
      isPublished: boolean("isPublished").default(false).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    answers = mysqlTable("answers", {
      id: int("id").autoincrement().primaryKey(),
      questionId: int("questionId").notNull(),
      ustadzId: int("ustadzId").notNull(),
      answerText: text("answerText").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    bookmarks = mysqlTable("bookmarks", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      questionId: int("questionId").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    ratings = mysqlTable("ratings", {
      id: int("id").autoincrement().primaryKey(),
      answerId: int("answerId").notNull(),
      userId: int("userId").notNull(),
      rating: int("rating").notNull(),
      // 1-5 stars
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    testimonials = mysqlTable("testimonials", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      name: text("name").notNull(),
      content: text("content").notNull(),
      rating: int("rating").notNull(),
      // 1-5 stars
      isApproved: int("isApproved").default(0).notNull(),
      // 0 = pending, 1 = approved
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    fiqihMaterials = mysqlTable("fiqih_materials", {
      id: int("id").autoincrement().primaryKey(),
      categoryId: int("categoryId").notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      content: text("content").notNull(),
      displayOrder: int("displayOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  approveTestimonial: () => approveTestimonial,
  createAdminLog: () => createAdminLog,
  createAnswer: () => createAnswer,
  createBookmark: () => createBookmark,
  createQuestion: () => createQuestion,
  createRating: () => createRating,
  createTestimonial: () => createTestimonial,
  createUserWithPassword: () => createUserWithPassword,
  deleteBookmark: () => deleteBookmark,
  deleteQuestion: () => deleteQuestion,
  deleteUser: () => deleteUser,
  getAdminLogs: () => getAdminLogs,
  getAllCategories: () => getAllCategories,
  getAllQuestions: () => getAllQuestions,
  getAllUsers: () => getAllUsers,
  getAnswersByQuestionId: () => getAnswersByQuestionId,
  getApprovedTestimonials: () => getApprovedTestimonials,
  getAverageRating: () => getAverageRating,
  getCategoryById: () => getCategoryById,
  getDb: () => getDb,
  getMaterialsByCategoryId: () => getMaterialsByCategoryId,
  getPendingTestimonials: () => getPendingTestimonials,
  getQuestionById: () => getQuestionById,
  getQuestionWithDetails: () => getQuestionWithDetails,
  getUserBookmarks: () => getUserBookmarks,
  getUserByEmail: () => getUserByEmail,
  getUserByOpenId: () => getUserByOpenId,
  isBookmarked: () => isBookmarked,
  permanentlyDeleteUser: () => permanentlyDeleteUser,
  suspendUser: () => suspendUser,
  unsuspendUser: () => unsuspendUser,
  updateQuestion: () => updateQuestion,
  updateUserOpenId: () => updateUserOpenId,
  upsertUser: () => upsertUser
});
import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
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
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(categories).orderBy(categories.displayOrder);
}
async function getCategoryById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createQuestion(question) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(questions).values(question);
  return result;
}
async function getAllQuestions(filters) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(questions);
  const conditions = [];
  if (filters?.categoryId) {
    conditions.push(eq(questions.categoryId, filters.categoryId));
  }
  if (filters?.isAnswered !== void 0) {
    conditions.push(eq(questions.isAnswered, filters.isAnswered));
  }
  if (filters?.isPublished !== void 0) {
    conditions.push(eq(questions.isPublished, filters.isPublished));
  }
  if (filters?.userId !== void 0) {
    conditions.push(eq(questions.userId, filters.userId));
  }
  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }
  return await query.orderBy(desc(questions.createdAt));
}
async function getQuestionById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(questions).where(eq(questions.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function updateQuestion(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(questions).set(data).where(eq(questions.id, id));
}
async function createAnswer(answer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(answers).values(answer);
  await updateQuestion(answer.questionId, { isAnswered: true, isPublished: true });
  return result;
}
async function getQuestionWithDetails(questionId) {
  const db = await getDb();
  if (!db) return void 0;
  const question = await getQuestionById(questionId);
  if (!question) return void 0;
  const category = await getCategoryById(question.categoryId);
  return {
    ...question,
    category
  };
}
async function getAnswersByQuestionId(questionId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(answers).where(eq(answers.questionId, questionId)).orderBy(desc(answers.createdAt));
}
async function getMaterialsByCategoryId(categoryId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(fiqihMaterials).where(eq(fiqihMaterials.categoryId, categoryId)).orderBy(fiqihMaterials.displayOrder);
}
async function createAdminLog(log) {
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
async function getAdminLogs(limit = 100) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get admin logs: database not available");
    return [];
  }
  const logs = await db.select().from(adminLogs).orderBy(desc(adminLogs.createdAt)).limit(limit);
  return logs;
}
async function createBookmark(userId, questionId) {
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
async function deleteBookmark(userId, questionId) {
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
async function getUserBookmarks(userId) {
  const db = await getDb();
  if (!db) return [];
  const result = await db.select({
    id: bookmarks.id,
    questionId: bookmarks.questionId,
    createdAt: bookmarks.createdAt,
    questionText: questions.questionText,
    categoryId: questions.categoryId,
    isAnswered: questions.isAnswered
  }).from(bookmarks).innerJoin(questions, eq(bookmarks.questionId, questions.id)).where(eq(bookmarks.userId, userId)).orderBy(desc(bookmarks.createdAt));
  return result;
}
async function isBookmarked(userId, questionId) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(bookmarks).where(and(eq(bookmarks.userId, userId), eq(bookmarks.questionId, questionId))).limit(1);
  return result.length > 0;
}
async function createRating(rating) {
  const db = await getDb();
  if (!db) return null;
  await db.insert(ratings).values(rating);
  return { success: true };
}
async function getAverageRating(answerId) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(ratings).where(eq(ratings.answerId, answerId));
  if (result.length === 0) return { average: 0, count: 0 };
  const sum = result.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / result.length, count: result.length };
}
async function createTestimonial(testimonial) {
  const db = await getDb();
  if (!db) return null;
  await db.insert(testimonials).values(testimonial);
  return { success: true };
}
async function getApprovedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).where(eq(testimonials.isApproved, 1)).orderBy(desc(testimonials.createdAt)).limit(10);
}
async function getPendingTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).where(eq(testimonials.isApproved, 0)).orderBy(desc(testimonials.createdAt));
}
async function approveTestimonial(id) {
  const db = await getDb();
  if (!db) return null;
  await db.update(testimonials).set({ isApproved: 1 }).where(eq(testimonials.id, id));
  return { success: true };
}
async function deleteQuestion(questionId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    await db.delete(answers).where(eq(answers.questionId, questionId));
    await db.delete(bookmarks).where(eq(bookmarks.questionId, questionId));
    await db.delete(questions).where(eq(questions.id, questionId));
  } catch (error) {
    console.error("[Database] Failed to delete question:", error);
    throw error;
  }
}
async function getUserByEmail(email) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createUserWithPassword(data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create user: database not available");
    return;
  }
  const openId = `user-${data.email}`;
  await db.insert(users).values({
    openId,
    email: data.email,
    password: data.password,
    // In production, this should be hashed
    name: data.name,
    role: "user",
    loginMethod: "email",
    lastSignedIn: /* @__PURE__ */ new Date()
  });
}
async function updateUserOpenId(userId, openId) {
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
async function getAllUsers(filters) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(users);
  const conditions = [];
  if (filters?.role) {
    conditions.push(eq(users.role, filters.role));
  }
  if (filters?.status) {
    conditions.push(eq(users.status, filters.status));
  }
  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }
  return await query.orderBy(desc(users.createdAt));
}
async function suspendUser(userId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(users).set({
    status: "suspended",
    isSuspended: true,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(users.id, userId));
}
async function unsuspendUser(userId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(users).set({
    status: "active",
    isSuspended: false,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(users.id, userId));
}
async function deleteUser(userId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(users).set({
    status: "deleted",
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(users.id, userId));
}
async function permanentlyDeleteUser(userId) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.delete(users).where(eq(users.id, userId));
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    _db = null;
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/oauth.ts
init_db();

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/routers.ts
init_schema();
import { eq as eq2, like, and as and2 } from "drizzle-orm";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
init_db();
init_db();
import { z as z2 } from "zod";

// server/emailNotification.ts
var KUA_EMAIL = "kuapecalungan15@gmail.com";
async function sendEmail({ to, subject, body }) {
  try {
    console.log("[Email Notification]");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Body:", body);
    console.log("---");
    return true;
  } catch (error) {
    console.error("[Email Notification] Failed to send email:", error);
    return false;
  }
}
async function sendQuestionAnsweredEmail(params) {
  const { recipientEmail, recipientName, questionText, answerText, categoryName, questionId } = params;
  const subject = `Pertanyaan Fiqih Anda Telah Dijawab - ${categoryName}`;
  const body = `
Assalamu'alaikum ${recipientName},

Pertanyaan fiqih Anda telah dijawab oleh ustadz kami.

PERTANYAAN ANDA:
${questionText}

JAWABAN USTADZ:
${answerText}

Anda dapat melihat jawaban lengkap di website kami:
${process.env.VITE_APP_URL || "https://websitekua.manus.space"}/pertanyaan/${questionId}

Jika Anda memiliki pertanyaan lanjutan, jangan ragu untuk mengajukan pertanyaan baru melalui website kami.

Jazakumullahu khairan,
KUA Kecamatan Pecalungan

---
Email ini dikirim otomatis. Untuk pertanyaan lebih lanjut, hubungi kami di ${KUA_EMAIL}
  `.trim();
  return await sendEmail({
    to: recipientEmail,
    subject,
    body
  });
}

// server/routers.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
var adminProcedure2 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var appRouter = router({
  search: router({
    global: publicProcedure.input(z2.object({ query: z2.string() })).query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { questions: [], materials: [] };
      const { query } = input;
      const searchTerm = `%${query}%`;
      const questions2 = await db.select({
        id: questions.id,
        questionText: questions.questionText,
        askerName: questions.name,
        categoryName: categories.name
      }).from(questions).leftJoin(categories, eq2(questions.categoryId, categories.id)).where(
        and2(
          like(questions.questionText, searchTerm),
          eq2(questions.isAnswered, true)
        )
      ).limit(5);
      const materials = await db.select({
        id: fiqihMaterials.id,
        title: fiqihMaterials.title,
        categoryId: fiqihMaterials.categoryId,
        categoryName: categories.name
      }).from(fiqihMaterials).leftJoin(categories, eq2(fiqihMaterials.categoryId, categories.id)).where(like(fiqihMaterials.title, searchTerm)).limit(5);
      return { questions: questions2, materials };
    })
  }),
  testimonials: router({
    getApproved: publicProcedure.query(async () => {
      return await getApprovedTestimonials();
    }),
    create: publicProcedure.input(z2.object({
      name: z2.string().min(1),
      content: z2.string().min(10),
      rating: z2.number().min(1).max(5)
    })).mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new TRPCError3({ code: "UNAUTHORIZED" });
      }
      await createTestimonial({
        userId: ctx.user.id,
        name: input.name,
        content: input.content,
        rating: input.rating,
        isApproved: 0
      });
      return { success: true };
    }),
    getPending: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN" });
      }
      return await getPendingTestimonials();
    }),
    approve: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN" });
      }
      await approveTestimonial(input.id);
      return { success: true };
    })
  }),
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    register: publicProcedure.input(z2.object({
      email: z2.string().email("Email tidak valid"),
      password: z2.string().min(6, "Password minimal 6 karakter"),
      name: z2.string().min(1, "Nama harus diisi")
    })).mutation(async ({ input, ctx }) => {
      const existingUser = await getUserByEmail(input.email);
      if (existingUser) {
        throw new TRPCError3({ code: "CONFLICT", message: "Email sudah terdaftar" });
      }
      await createUserWithPassword({
        email: input.email,
        password: input.password,
        name: input.name
      });
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Gagal membuat akun" });
      }
      if (!user.openId) {
        user.openId = `user_${user.id}_${Date.now()}`;
        await updateUserOpenId(user.id, user.openId);
      }
      const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);
      return { success: true, user: { id: user.id, name: user.name, email: user.email } };
    }),
    login: publicProcedure.input(z2.object({
      email: z2.string().email("Email tidak valid"),
      password: z2.string().min(1, "Password harus diisi")
    })).mutation(async ({ input, ctx }) => {
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError3({ code: "UNAUTHORIZED", message: "Email atau password salah" });
      }
      if (user.password !== input.password) {
        throw new TRPCError3({ code: "UNAUTHORIZED", message: "Email atau password salah" });
      }
      await upsertUser({
        openId: user.openId,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      if (!user.openId) {
        user.openId = `user_${user.id}_${Date.now()}`;
        await updateUserOpenId(user.id, user.openId);
      }
      const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);
      return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  bookmarks: router({
    toggle: protectedProcedure.input(z2.object({ questionId: z2.number() })).mutation(async ({ input, ctx }) => {
      const bookmarked = await isBookmarked(ctx.user.id, input.questionId);
      if (bookmarked) {
        await deleteBookmark(ctx.user.id, input.questionId);
        return { bookmarked: false };
      } else {
        await createBookmark(ctx.user.id, input.questionId);
        return { bookmarked: true };
      }
    }),
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserBookmarks(ctx.user.id);
    }),
    check: protectedProcedure.input(z2.object({ questionId: z2.number() })).query(async ({ input, ctx }) => {
      const bookmarked = await isBookmarked(ctx.user.id, input.questionId);
      return { bookmarked };
    })
  }),
  categories: router({
    list: publicProcedure.query(async () => {
      return await getAllCategories();
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      const category = await getCategoryById(input.id);
      if (!category) {
        throw new TRPCError3({ code: "NOT_FOUND", message: "Category not found" });
      }
      return category;
    }),
    getMaterials: publicProcedure.input(z2.object({ categoryId: z2.number() })).query(async ({ input }) => {
      return await getMaterialsByCategoryId(input.categoryId);
    })
  }),
  questions: router({
    submit: protectedProcedure.input(z2.object({
      name: z2.string().min(1, "Nama harus diisi"),
      email: z2.string().email("Email tidak valid").optional(),
      categoryId: z2.number(),
      questionText: z2.string().min(1, "Pertanyaan harus diisi")
    })).mutation(async ({ input, ctx }) => {
      await createQuestion({
        userId: ctx.user?.id,
        name: input.name,
        email: input.email || ctx.user?.email,
        categoryId: input.categoryId,
        questionText: input.questionText,
        isAnswered: false,
        isPublished: false
      });
      return { success: true };
    }),
    list: protectedProcedure.input(z2.object({
      categoryId: z2.number().optional(),
      isAnswered: z2.boolean().optional()
    }).optional()).query(async ({ input, ctx }) => {
      return await getAllQuestions({
        ...input,
        userId: ctx.user?.id
      });
    }),
    getById: protectedProcedure.input(z2.object({ id: z2.number() })).query(async ({ input, ctx }) => {
      const question = await getQuestionById(input.id);
      if (!question) {
        throw new TRPCError3({ code: "NOT_FOUND", message: "Question not found" });
      }
      if (question.userId !== ctx.user?.id && ctx.user?.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "You can only view your own questions" });
      }
      const answers2 = await getAnswersByQuestionId(input.id);
      const category = await getCategoryById(question.categoryId);
      return {
        ...question,
        answers: answers2,
        category
      };
    })
  }),
  admin: router({
    login: publicProcedure.input(z2.object({ email: z2.string().email(), password: z2.string() })).mutation(async ({ input, ctx }) => {
      if (input.email !== "kuapecalungan15@gmail.com") {
        throw new TRPCError3({ code: "UNAUTHORIZED", message: "Email tidak terdaftar sebagai admin" });
      }
      if (input.password !== "KUAPECALUNGAN") {
        throw new TRPCError3({ code: "UNAUTHORIZED", message: "Password salah" });
      }
      const openId = `admin-${input.email}`;
      await upsertUser({
        openId,
        email: input.email,
        name: "Ustadz Admin",
        role: "admin",
        loginMethod: "password",
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const user = await getUserByOpenId(openId);
      if (!user) {
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Gagal membuat session" });
      }
      const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);
      await createAdminLog({
        adminId: user.id,
        action: "LOGIN",
        details: JSON.stringify({ email: input.email })
      });
      return { success: true };
    }),
    logs: adminProcedure2.query(async () => {
      const logs = await getAdminLogs(50);
      return logs;
    }),
    changePassword: adminProcedure2.input(z2.object({ newPassword: z2.string().min(8) })).mutation(async ({ input, ctx }) => {
      await createAdminLog({
        adminId: ctx.user.id,
        action: "CHANGE_PASSWORD",
        details: JSON.stringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString() })
      });
      return { success: true };
    }),
    deleteQuestion: adminProcedure2.input(z2.object({ questionId: z2.number() })).mutation(async ({ input, ctx }) => {
      await deleteQuestion(input.questionId);
      await createAdminLog({
        adminId: ctx.user.id,
        action: "delete_question",
        details: `Deleted question ID: ${input.questionId}`
      });
      return { success: true };
    }),
    questions: router({
      list: adminProcedure2.input(z2.object({
        isAnswered: z2.boolean().optional()
      }).optional()).query(async ({ input }) => {
        return await getAllQuestions(input);
      }),
      getById: adminProcedure2.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
        const question = await getQuestionById(input.id);
        if (!question) {
          throw new TRPCError3({ code: "NOT_FOUND", message: "Question not found" });
        }
        const answers2 = await getAnswersByQuestionId(input.id);
        const category = await getCategoryById(question.categoryId);
        return {
          ...question,
          answers: answers2,
          category
        };
      }),
      answer: adminProcedure2.input(z2.object({
        questionId: z2.number(),
        answerText: z2.string().min(1, "Jawaban harus diisi")
      })).mutation(async ({ input, ctx }) => {
        const questionDetails = await getQuestionWithDetails(input.questionId);
        await createAnswer({
          questionId: input.questionId,
          ustadzId: ctx.user.id,
          answerText: input.answerText
        });
        await createAdminLog({
          adminId: ctx.user.id,
          action: "ANSWER_QUESTION",
          details: JSON.stringify({ questionId: input.questionId }),
          questionId: input.questionId
        });
        if (questionDetails?.email) {
          try {
            await sendQuestionAnsweredEmail({
              recipientEmail: questionDetails.email,
              recipientName: questionDetails.name,
              questionText: questionDetails.questionText,
              answerText: input.answerText,
              categoryName: questionDetails.category?.name || "Fiqih",
              questionId: input.questionId
            });
          } catch (error) {
            console.error("Failed to send email notification:", error);
          }
        }
        return { success: true };
      })
    }),
    // User Management
    users: router({
      list: adminProcedure2.input(z2.object({
        role: z2.enum(["user", "admin"]).optional(),
        status: z2.enum(["active", "suspended", "deleted"]).optional()
      }).optional()).query(async ({ input }) => {
        const { getAllUsers: getAllUsers2 } = await Promise.resolve().then(() => (init_db(), db_exports));
        return await getAllUsers2(input || {});
      }),
      suspend: adminProcedure2.input(z2.object({ userId: z2.number() })).mutation(async ({ input }) => {
        const { suspendUser: suspendUser2 } = await Promise.resolve().then(() => (init_db(), db_exports));
        await suspendUser2(input.userId);
        return { success: true, message: "User berhasil disuspend" };
      }),
      unsuspend: adminProcedure2.input(z2.object({ userId: z2.number() })).mutation(async ({ input }) => {
        const { unsuspendUser: unsuspendUser2 } = await Promise.resolve().then(() => (init_db(), db_exports));
        await unsuspendUser2(input.userId);
        return { success: true, message: "Suspend user berhasil dibatalkan" };
      }),
      delete: adminProcedure2.input(z2.object({ userId: z2.number(), permanent: z2.boolean().optional() })).mutation(async ({ input }) => {
        const { deleteUser: deleteUser2, permanentlyDeleteUser: permanentlyDeleteUser2 } = await Promise.resolve().then(() => (init_db(), db_exports));
        if (input.permanent) {
          await permanentlyDeleteUser2(input.userId);
          return { success: true, message: "User berhasil dihapus permanen" };
        } else {
          await deleteUser2(input.userId);
          return { success: true, message: "User berhasil dihapus" };
        }
      })
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
