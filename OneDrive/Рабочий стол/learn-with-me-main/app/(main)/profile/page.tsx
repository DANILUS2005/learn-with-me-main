import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'; // Для редиректа нужно использовать server-side redirect
import { db } from '@/db/drizzle';
import { friendships } from '@/db/schema';
import { userProgress } from '@/db/schema'; 
import { eq } from 'drizzle-orm';
import FriendsList from '@/components/FriendsList';
import UserProgress from '@/components/UserProgress';
import type { UserProgressType } from '@/db/queries';

const ProfilePage = async () => {
  const { userId } = await auth();
  
  // Логирование и проверка типа userId
  console.log('userId:', userId);
  console.log('Тип userId:', typeof userId);

  // Если userId не строка, выбрасываем ошибку
  if (typeof userId !== 'string') {
    throw new Error('userId должен быть строкой');
  }

  const userProgressData = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),  // userId теперь точно строка
    with: {
      activeCourse: {
        columns: {
          id: true,
          title: true,
          imageSrc: true,
          description: true,
          level: true,
        },
      },
    },
  });

  if (!userProgressData) {
    return <div>Нет данных о прогрессе пользователя.</div>;
  }

  // Здесь объявляем userProgress
  const userProgress: UserProgressType = {
    userId: userProgressData.userId || '',
    userName: userProgressData.userName || null,
    userImageSrc: userProgressData.userImageSrc || null,
    activeCourseId: userProgressData.activeCourseId || null,
    hearts: userProgressData.hearts || 0,
    points: userProgressData.points || 0,
    hasActiveSubscription: userProgressData.hasActiveSubscription || false,
    performed: userProgressData.performed || false,
    courseId: userProgressData.courseId || null,
    lessonId: userProgressData.lessonId || null,
    completed: userProgressData.completed || false,
    score: userProgressData.score || 0,
    lastAttempt: userProgressData.lastAttempt || null,
    activeCourse: userProgressData.activeCourse || null,
  };

  // Далее запросим список друзей
  const friendsList = await db.query.friendships.findMany({
    where: eq(friendships.userId, userId),
    with: {
      friend: {
        columns: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <UserProgress {...userProgress} />
      <FriendsList 
        friends={friendsList.map(friend => ({
          id: friend.friend.id,
          email: friend.friend.email,
          name: friend.friend.name,
          createdAt: friend.friend.createdAt,
          imageUrl: friend.friend.imageUrl,
        }))} 
      />
    </div>
  );
};
