import React from 'react';
import Header from './Header';
import UserProgress from '@/components/UserProgress';
import { redirect } from 'next/navigation';
import { getUserProgress } from '@/db/queries';
import List from './List';
import { getCourses } from '@/db/queries';
import { UserProgressType } from '@/db/queries';
import AudioLessons from 'app/(main)/lessons/AudioLessons'; 
import FlashCard from 'app/(main)/flashcards/FlashCard';
import GrammarSection from 'app/(main)/grammar/GrammarSection';
import VideoLesson from 'app/(main)/lessons/VideoLesson';
import MultipleChoiceExercise from 'app/(main)/exercises/MultipleChoiceExercise';

const rules = [
  {
    title: "Согласование подлежащего и сказуемого",
    description: "В русском языке подлежащее и сказуемое должны согласовываться по числу и роду."
  },
  {
    title: "Употребление артиклей",
    description: "В английском языке определенный артикль 'the' используется перед существительными, когда говорим о чем-то конкретном."
  },
  {
    title: "Порядок слов в предложении",
    description: "В русском языке порядок слов может изменяться для акцента, но в английском чаще всего используется порядок: подлежащее - сказуемое - дополнение."
  },
  {
    title: "Времена глаголов",
    description: "В английском языке существует несколько времен, каждое из которых используется для обозначения различных временных аспектов."
  },
  {
    title: "Использование предлогов",
    description: "Предлоги в английском языке могут изменять значение словосочетания."
  },
  {
    title: "Прямой и косвенный порядок",
    description: "В русском языке прямой порядок слов используется для нейтральных предложений."
  }
];



// Компонент для отображения уроков
const LessonsPage: React.FC = () => {
  return (
    <div>
      <h1>Уроки</h1>
      <AudioLessons audioSrc="/path/to/audio.mp3" />
      <FlashCard word="Слово" translation="Translation" />
      <GrammarSection rules={rules} />
      <VideoLesson videoSrc="https://www.youtube.com/embed/video-id" />
      <MultipleChoiceExercise 
        question="Какой правильный ответ?" 
        options={["Ответ 1", "Ответ 2"]} 
        correctAnswer="Ответ 1" 
      />
    </div>
  );
};

// Асинхронный компонент для курсов
export default async function Courses() {
  // Получение данных о прогрессе пользователя и курсах
  const userProgressData = await getUserProgress (); // Исправлено: добавлен await
  const coursesData = await getCourses(); // Исправлено: добавлен await
  const [userProgress, courses] = await Promise.all([
    userProgressData,
    coursesData
  ]);
  
  // Проверка наличия прогресса пользователя
  if (!userProgress) {
    console.log("No user progress found");
    return (
      <div className="h-full max-w-[912px] px-3 mx-auto">
        <Header title="Языковые курсы" />
        <div className="flex flex-col gap-4">
          <List 
            courses={courses} 
            activeCourseId={null} 
          />
        </div>
      </div>
    );
  }
  
  // Отображение курсов и прогресса пользователя
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <Header title="Языковые курсы" />
      <div className="flex flex-col gap-4">
        {userProgress.activeCourse && (
          <UserProgress 
          activeCourse={userProgress.activeCourse} // Убедитесь, что userProgress определен
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={userProgress.hasActiveSubscription || false} // Замените undefined на false
          />
        )}
        <List 
          courses={courses} 
          activeCourseId={userProgress.activeCourseId} 
        />
      </div>
    </div>
  );
}