// app/(main)/leaderboard/page.tsx
import React from 'react';
import { LeaderboardTable } from '@/components/LeaderboardTable';

// Моковые данные для примера
const mockEntries = [
  {
    rank: 1,
    username: "John Doe",
    points: 1500,
    streak: 7,
    image: "/Planes/planeBlue1.png"
  },
  // Добавьте больше записей по необходимости
];

export default function LeaderboardPage() {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700 mb-6">
        Leaderboard
      </h1>
      <div className="bg-white rounded-xl shadow-sm">
        <LeaderboardTable entries={mockEntries} />
      </div>
    </div>
  );
}