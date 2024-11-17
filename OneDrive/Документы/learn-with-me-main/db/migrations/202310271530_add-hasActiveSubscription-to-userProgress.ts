// db/migrations/202310271530_add-hasActiveSubscription-to-userProgress.ts
import { sql } from "drizzle-orm/sql";
import { userProgress } from "../schema";

// Создайте миграцию с помощью функции `createMigration`
export const createMigration = {
  up() {
    return sql`
      ALTER TABLE ${userProgress}
      ADD COLUMN hasActiveSubscription BOOLEAN DEFAULT false;
    `;
  },
  down() {
    return sql`
      ALTER TABLE ${userProgress}
      DROP COLUMN hasActiveSubscription;
    `;
  },
};
