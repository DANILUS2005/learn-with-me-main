"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      console.error("No user found");
      throw new Error("Unauthorized");
    }

    console.log("Processing user progress for:", userId);

    const course = await getCourseById(courseId);
    if (!course) {
      console.error("Course not found:", courseId);
      throw new Error("Course not found");
    }

    const existingUserProgress = await getUserProgress();
    
    if (existingUserProgress) {
      console.log("Updating existing progress for user:", userId);
      await db.update(userProgress)
        .set({
          activeCourseId: courseId,
          userName: user.firstName || "User",
          userImageSrc: user.imageUrl || '/Planes/planeBlue1.png',
          lastUpdated: new Date() // Добавляем отметку времени обновления
        })
        .where(eq(userProgress.userId, userId));
    } else {
      console.log("Creating new progress for user:", userId);
      await db.insert(userProgress)
        .values({
          userId,
          activeCourseId: courseId,
          userName: user.firstName || "User",
          userImageSrc: user.imageUrl || "/Planes/planeBlue1.png",
          hearts: 5,
          points: 0,
          createdAt: new Date(), // Добавляем дату создания
          lastUpdated: new Date()
        });
    }

    console.log("User progress updated successfully");
    
    // Обновляем кэш для обоих путей
    await Promise.all([
      revalidatePath("/courses"),
      revalidatePath("/learn")
    ]);

    redirect("/learn");
  } catch (error) {
    console.error("Error in upsertUserProgress:", error);
    throw error;
  }
};

export const fetchUserProgress = async () => {
  try {
    const progress = await getUserProgress();
    
    if (!progress) {
      console.log("No progress found for user");
      return null;
    }
    
    return progress;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }
};

// Добавляем новую функцию для обновления очков и сердец
export const updateUserStats = async (hearts: number, points: number) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    await db.update(userProgress)
      .set({
        hearts,
        points,
        lastUpdated: new Date()
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw error;
  }
};