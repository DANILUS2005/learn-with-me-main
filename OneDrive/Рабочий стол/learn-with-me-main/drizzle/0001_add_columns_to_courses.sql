ALTER TABLE "courses" 
ADD COLUMN IF NOT EXISTS "description" text,
ADD COLUMN IF NOT EXISTS "level" text;