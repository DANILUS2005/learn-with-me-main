import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db/drizzle';
import { friendships } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { friendId } = await req.json();
    
    const existingFriendship = await db.query.friendships.findFirst({
      where: and(
        eq(friendships.userId, userId),
        eq(friendships.friendId, friendId)
      )
    });

    if (existingFriendship) {
      return new NextResponse("Friendship already exists", { status: 400 });
    }

    await db.insert(friendships).values({
      userId,
      friendId,
      status: 'pending'
    });

    return new NextResponse("Friend request sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const friends = await db.query.friendships.findMany({
      where: eq(friendships.userId, userId),
      with: {
        friend: true
      }
    });

    return NextResponse.json(friends);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}