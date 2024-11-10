console.log(process.env);
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./db/schema",
  out: "./drizzle",
  dialect: "postgresql",  // Используем dialect вместо driver
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "12345",
    database: process.env.DB_NAME || "user",
    port: Number(process.env.DB_PORT) || 5432,
  },
  verbose: true,
  strict: true,
} satisfies Config;