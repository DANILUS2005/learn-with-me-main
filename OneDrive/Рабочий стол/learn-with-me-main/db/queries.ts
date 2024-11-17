// db/queries.ts
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { courses, userProgress } from "./schema";
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ActiveCourse } from "app/models/Course";

// Создаем пул подключений
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Создаем единственный экземпляр db
const db = drizzle(pool, { schema: { courses, userProgress } });

export type Course = typeof courses.$inferSelect;
export type UserProgressType = {
    userId: string;
    userName: string | null;
    userImageSrc: string | null;
    activeCourseId: number | null;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
    courseId: number | null;  
    lessonId: number | null;  
    completed: boolean | null;  
    score: number | null;  
    lastAttempt: Date | null;
    performed: boolean;
    activeCourse: ActiveCourse | null | undefined;
};

// Тестируем подключение
const testDatabaseConnection = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT 1 as test');
      console.log("Database connection test result:", result.rows[0]);
      client.release();
    } catch (error) {
      console.error("Database connection test failed:", error);
      // Можно добавить принудительное завершение процесса
      process.exit(1);
    }
  };

testDatabaseConnection();


export const getCourses = cache(async (): Promise<Course[]> => {
    try {
        console.log("Попытка получить курсы...");
        const data = await db.select().from(courses);
        console.log("Успешно пройденные курсы:", data);
        return data;
    } catch (error) {
        console.error("Подробные курсы по выборке ошибок:", {
            error,
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            stack: error instanceof Error ? error.stack : undefined
        });
        throw new Error('Не удалось получить курсы');
    }
});

export const getUserProgress = cache(async (): Promise<UserProgressType | null> => {
    try {
        const { userId } = await auth();
        if (!userId) {
            console.log("Идентификатор пользователя не найден");
            return null;
        }

        console.log("Попытка получить прогресс пользователя для userId:", userId);

        const data = await db.select({
            user_progress: {
                userId: userProgress.userId,
                userName: userProgress.userName,
                userImageSrc: userProgress.userImageSrc,
                activeCourseId: userProgress.activeCourseId,
                hearts: userProgress.hearts,
                points: userProgress.points,
                courseId: userProgress.courseId,
                lessonId: userProgress.lessonId,
                completed: userProgress.completed,
                score: userProgress.score,
                lastAttempt: userProgress.lastAttempt,
                performed: userProgress.performed,
                hasActiveSubscription: userProgress.hasActiveSubscription,
            },
            courses: {
                id: courses.id,
                title: courses.title,
                imageSrc: courses.imageSrc,
                description: courses.description,
                level: courses.level
            }
        })
        .from(userProgress)
        .where(eq(userProgress.userId, userId))
        .leftJoin(courses, eq(userProgress.activeCourseId, courses.id));

        console.log("Исходные данные из базы данных:", data);

        if (data.length === 0) {
            console.log("Прогресс пользователя не найден");
            return null;
        }
        const result: UserProgressType = {
            userId: data[0].user_progress.userId,
            userName: data[0].user_progress.userName ?? "User ",
            userImageSrc: data[0].user_progress.userImageSrc ?? "/Planes/planeBlue1.png",
            activeCourseId: data[0].user_progress.activeCourseId ?? null,
            hearts: data[0].user_progress.hearts ?? 5, 
            points: data[0].user_progress.points ?? 0,
            courseId: data[0].user_progress.courseId ?? null,
            lessonId: data[0].user_progress.lessonId ?? null,
            completed: data[0].user_progress.completed,
            score: data[0].user_progress.score ?? 0,
            lastAttempt: data[0].user_progress.lastAttempt,
            activeCourse: data[0].courses,
            hasActiveSubscription: data[0].user_progress.hasActiveSubscription ?? false,
            performed: data[0].user_progress.performed ?? false
        };

        console.log("Обрабатываемый прогресс пользователя:", result);
        return result;
    } catch (error) {
        console.error("Подробная информация об ошибке при получении пользовательского прогресса:", {
            error,
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
    }
});

export const getCourseById = cache(async (courseId: number): Promise<Course | null> => {
    try {
        const data = await db.select()
            .from(courses)
            .where(eq(courses.id, courseId));
        return data[0] || null;
    } catch (error) {
        console.error("Ошибка при получении курса по id:", error);
        throw new Error('Не удалось получить курс');
    }
});

type DatabaseCredentials = {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
    ssl?: boolean;
};
  
const createDatabasePool = (credentials: DatabaseCredentials): Pool => {
    return new Pool({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password,
        database: credentials.database,
        port: credentials.port,
        ssl: credentials.ssl
    });
};