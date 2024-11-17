// components/LeaderboardTable.tsx
import React from 'react';
import Image from 'next/image';

type LeaderboardEntry = {
  rank: number;
  username: string;
  points: number;
  streak: number;
  image: string;
};

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-right">Points</th>
            <th className="px-4 py-2 text-right">Streak</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.username} className="border-b hover:bg-slate-50">
              <td className="px-4 py-2">{entry.rank}</td>
              <td className="px-4 py-2 flex items-center gap-2">
                <Image
                  src={entry.image}
                  alt={entry.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                {entry.username}
              </td>
              <td className="px-4 py-2 text-right">{entry.points}</td>
              <td className="px-4 py-2 text-right">{entry.streak} days</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}