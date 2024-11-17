ALTER TABLE "user_progress" 
ADD COLUMN IF NOT EXISTS "course_id" integer,
ADD COLUMN IF NOT EXISTS "lesson_id" integer,
ADD COLUMN IF NOT EXISTS "completed" boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS "score" integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS "last_attempt" timestamp;