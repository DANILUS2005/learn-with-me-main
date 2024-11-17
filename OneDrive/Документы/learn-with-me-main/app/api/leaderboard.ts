import { db } from '@/db/drizzle';
import { leaderboard } from '@/db/schema';
import { desc } from 'drizzle-orm'; // Import the `desc` function or enum

export const getLeaderboard = async () => {
    return await db
        .select()
        .from(leaderboard)
        .orderBy(desc(leaderboard.points)); 
};