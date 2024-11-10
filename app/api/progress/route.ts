import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import db from '@/db/drizzle';
import { getAuth } from '@clerk/nextjs/server';
import { userProgress } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const courseId = searchParams.get("courseId");

    if (courseId) {
      const progress = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, userId),
            eq(userProgress.courseId, parseInt(courseId))
          )
        );

      return NextResponse.json(progress);
    } else {
      const userProgressData = await db
        .select()
        .from(userProgress)
        .where(eq(userProgress.userId, userId));

      return NextResponse.json(userProgressData);
    }
  } catch (error) {
    console.error('[PROGRESS_GET]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { lessonId, completed, score, courseId } = body;

    // Получаем текущий прогресс пользователя
    const currentProgress = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.courseId, courseId),
          eq(userProgress.lessonId, lessonId)
        )
      )
      .limit(1);

    const currentPoints = currentProgress[0]?.points || 0;

    // Обновляем или создаем запись о прогрессе
    const result = await db
      .insert(userProgress)
      .values({
        userId,
        courseId,
        lessonId,
        completed,
        score,
        lastAttempt: new Date(),
        points: currentPoints + score, // Обновляем очки здесь
        lastUpdated: new Date(),
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.courseId, userProgress.lessonId],
        set: {
          completed,
          score,
          lastAttempt: new Date(),
          points: currentPoints + score, // Обновляем очки здесь
          lastUpdated: new Date(),
        },
      })
      .returning();

      return NextResponse.json({ 
        message: "Progress saved successfully", 
        progress: result[0] 
      });
    } catch (error) {
      console.error('[PROGRESS_POST]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }