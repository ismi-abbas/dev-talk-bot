import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const users = pgTable("users", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

type SelectUser = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5432/drizzle",
});

const db = drizzle(pool);

export const getUsers = async (user: SelectUser) =>
  await db.select().from(users);
