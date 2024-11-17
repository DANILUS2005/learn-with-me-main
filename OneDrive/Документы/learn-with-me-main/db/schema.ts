import { integer, pgTable, serial, text, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { boolean as pgBoolean } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
    description: text("description"),
    level: text("level"),
    difficulty: text("difficulty").default("easy"), 
});

export const friendships = pgTable('friendships', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  friendId: text('friend_id').notNull(),
  status: text('status').notNull(), 
  createdAt: timestamp('created_at').defaultNow(),
});

export const leaderboard = pgTable('leaderboard', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  points: serial('points').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: text('sender_id').notNull(),
  groupId: text('group_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const studyGroups = pgTable('study_groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  creatorId: text('creator_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  userName: text("user_name").default("User"),
  userImageSrc: text("image_src").default("/Planes/planeBlue1.png"),
  activeCourseId: integer("active_course_id"),
  hearts: integer("hearts").default(5),
  points: integer("points").default(0),
  courseId: integer("course_id"),
  lessonId: integer("lesson_id"),
  completed: pgBoolean("completed").default(false),
  score: integer("score").default(0),
  lastAttempt: timestamp("last_attempt"),
  createdAt: timestamp("created_at").defaultNow(),
  lastUpdated: timestamp("last_updated").defaultNow(),
  performed: pgBoolean("performed").default(false),
  hasActiveSubscription: pgBoolean("hasActiveSubscription").default(false),
});

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    type: text("type").notNull(), // 'text', 'quiz', 'audio', 'video'
    content: jsonb("content").notNull(),
    order: integer("order").notNull()
});

export const courseLessonRelations = relations(courses, ({ many }) => ({
    lessons: many(lessons)
}));

export const lessonRelations = relations(lessons, ({ one }) => ({
    course: one(courses, {
        fields: [lessons.courseId],
        references: [courses.id]
    })
}));

export const courseRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress)
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}));
export const users = pgTable('users', {
    id: text('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow(),
  });
  
  
  export const friendshipsRelations = relations(friendships, ({ one }) => ({
    user: one(users, {
      fields: [friendships.userId],
      references: [users.id],
    }),
    friend: one(users, {
      fields: [friendships.friendId],
      references: [users.id],
    }),
  }));
  
  // Добавляем отношения для users
  export const usersRelations = relations(users, ({ many }) => ({
    friendships: many(friendships),
  }));