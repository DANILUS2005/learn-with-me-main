// db/drizzle.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from './schema';
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "user",
  port: parseInt(process.env.DB_PORT || "5432"),
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });

// Проверка подключения с обработкой ошибок
const testDatabaseConnection = async () => {
  try {
      const client = await pool.connect();
      const result = await client.query('SELECT 1 as test');
      console.log("Database connection test result:", result.rows[0]);
      client.release();
  } catch (error) {
      console.error("Database connection test failed:", error);
  }
};

testDatabaseConnection();

export default db;