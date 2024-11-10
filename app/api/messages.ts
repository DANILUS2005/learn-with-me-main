import { db } from '@/db/drizzle';
import { messages } from '@/db/schema';

export const sendMessage = async (senderId: string, groupId: string, content: string) => {
    await db.insert(messages).values({
        senderId,
        groupId,
        content,
    });
};