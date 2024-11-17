import { db } from '@/db/drizzle';
import { studyGroups } from '@/db/schema';

export const createGroup = async (name: string, creatorId: string) => {
    await db.insert(studyGroups).values({
        name,
        creatorId,
    });
};