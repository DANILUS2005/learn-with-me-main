import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req: NextRequest) => {
  console.log("Request URL:", req.url); // Логируем URL запроса
  try {
    // Проверяем авторизацию и получаем userId
    const { userId } = await auth(); // Используем await для получения userId

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Здесь вы можете использовать userId для получения информации о пользователе из базы данных, если необходимо

    return NextResponse.next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/api/(.*)"],
};