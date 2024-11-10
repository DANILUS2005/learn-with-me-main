// scripts/seed.ts
import "dotenv/config";
import db from "../db/drizzle";
import * as schema from "../db/schema";
import { sql } from "drizzle-orm"; 

const main = async () => {
  try {
    console.log("Seeding database...");
    
    // Очищаем существующие данные
    await db.delete(schema.userProgress);
    await db.delete(schema.lessons);
    await db.delete(schema.courses);
    
    // Создаем таблицу для прогресса пользователя
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        course_id INTEGER NOT NULL,
        lesson_id INTEGER NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        score INTEGER NOT NULL DEFAULT 0,
        last_attempt TIMESTAMP,
        UNIQUE(user_id, course_id, lesson_id)
      )
    `);

    // Добавляем курсы
    const courses = await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Индийский",
        imageSrc: "/flags/india.png",
        description: "Изучите индийский - самый распространенный язык в Индии",
        level: "Начальный"
      },
      {
        id: 2,
        title: "Португальский",
        imageSrc: "/flags/brazilpng.png",
        description: "Освойте бразильский португальский",
        level: "Начальный"
      },
      {
        id: 3,
        title: "Испанский",
        imageSrc: "/flags/Spain.png",
        description: "Изучите испанский - один из самых популярных языков в мире",
        level: "Начальный"
      },
      {
        id: 4,
        title: "Малайский",
        imageSrc: "/flags/malaysiapng.png",
        description: "Откройте для себя малайский язык и культуру",
        level: "Начальный"
      }
    ]).returning();

    // Добавляем уроки для индийского курса
    await db.insert(schema.lessons).values([
      {
        courseId: 1,
        title: "Базовые приветствия",
        type: "text",
        order: 1,
        content: JSON.stringify({
          text: "В этом уроке мы изучим базовые приветствия на хинди",
          examples: [
            { hindi: "नमस्ते", transliteration: "Namaste", meaning: "Здравствуйте" },
            { hindi: "शुभ प्रभात", transliteration: "Shubh Prabhat", meaning: "Доброе утро" }
          ],
          quiz: {
            question: "Как сказать 'Здравствуйте' на хинди?",
            options: ["Namaste", "Dhanyavaad", "Shubh Ratri", "Alvida"],
            correctAnswer: "Namaste"
          }
        })
      },
      {
        courseId: 1,
        title: "Числа от 1 до 5",
        type: "text",
        order: 2,
        content: JSON.stringify({
          text: "Изучим числа от 1 до 5 на хинди",
          examples: [
            { hindi: "एक", transliteration: "Ek", meaning: "1" },
            { hindi: "दो", transliteration: "Do", meaning: "2" },
            { hindi: "तीन", transliteration: "Teen", meaning: "3" },
            { hindi: "चार", transliteration: "Char", meaning: "4" },
            { hindi: "पांच", transliteration: "Paanch", meaning: "5" }
          ],
          quiz: {
            question: "Как сказать 'три' на хинди?",
            options: ["Ek", "Do", "Teen", "Char"],
            correctAnswer: "Teen"
          }
        })
      }
    ]);

    // Добавляем уроки для португальского курса
    await db.insert(schema.lessons).values([
      {
        courseId: 2,
        title: "Приветствия по-португальски",
        type: "text",
        order: 1,
        content: JSON.stringify({
          text: "Изучаем основные приветствия в португальском языке",
          examples: [
            { portuguese: "Olá", meaning: "Привет" },
            { portuguese: "Bom dia", meaning: "Доброе утро" },
            { portuguese: "Boa tarde", meaning: "Добрый день" }
          ],
          quiz: {
            question: "Как сказать 'Привет' по-португальски?",
            options: ["Olá", "Tchau", "Obrigado", "Por favor"],
            correctAnswer: "Olá"
          }
        })
      }
    ]);

    // Добавляем уроки для испанского курса
    await db.insert(schema.lessons).values([
      {
        courseId: 3,
        title: "Базовые фразы на испанском",
        type: "text",
        order: 1,
        content: JSON.stringify({
          text: "Изучаем базовые фразы испанского языка",
          examples: [
            { spanish: "Hola", meaning: "Привет" },
            { spanish: "Buenos días", meaning: "Доброе утро" },
            { spanish: "Gracias", meaning: "Спасибо" }
          ],
          quiz: {
            question: "Как сказать 'Спасибо' по-испански?",
            options: ["Hola", "Gracias", "Por favor", "Adiós"],
            correctAnswer: "Gracias"
          }
        })
      }
    ]);

    // Добавляем уроки для малайского курса
    await db.insert(schema.lessons).values([
      {
        courseId: 4,
        title: "Приветствия на малайском",
        type: "text",
        order: 1,
        content: JSON.stringify({
          text: "Изучаем приветствия в малайском языке",
          examples: [
            { malay: "Selamat pagi", meaning: "Доброе утро" },
            { malay: "Apa khabar", meaning: "Как дела?" },
            { malay: "Terima kasih", meaning: "Спасибо" }
          ],
          quiz: {
            question: "Как сказать 'Доброе утро' на малайском?",
            options: ["Selamat pagi", "Apa khabar", "Terima kasih", "Selamat tinggal"],
            correctAnswer: "Selamat pagi"
          }
        })
      }
    ]);

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

main();