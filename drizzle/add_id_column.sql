-- drizzle/add_id_column.sql
ALTER TABLE "user_progress" 
ADD COLUMN IF NOT EXISTS "id" SERIAL PRIMARY KEY;