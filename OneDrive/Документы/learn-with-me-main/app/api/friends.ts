import { db } from '@/db/drizzle';
import { friendships } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const addFriend = async (userId: string, friendId: string) => {
    await db.insert(friendships).values({
        userId,
        friendId,
        status: 'pending',
    });
};