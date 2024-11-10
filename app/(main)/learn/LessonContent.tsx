"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Heart, Award, BarChart, CheckCircle } from 'lucide-react';
import { useAuth } from "@clerk/nextjs";
import { toast } from 'sonner';
import { allLessons } from './lessonsData';

interface AchievementState {
  successfulLessons: number;
  correctAnswersInARow: number;
  overallProgress: number;
  lessonCompletedWithoutMistakes: boolean;
  streak: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: AchievementState) => boolean;
}


interface SaveProgressParams {
  lessonId: number;
  courseId: number;
  completed: boolean;
  score: number;
}

const saveProgress = async ({ lessonId, courseId, completed, score }: SaveProgressParams) => {
  try {
    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lessonId, courseId, completed, score }),
    });

    if (!response.ok) {
      throw new Error('Не удалось сохранить прогресс');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка сохранения прогресса:', error);
    throw error;
  }
};

const achievements: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'Первый шаг',
    description: 'Завершите свой первый урок',
    icon: '🎓',
    condition: (state) => state.successfulLessons > 1
  },
  {
    id: 'three_in_a_row',
    title: 'На одной волне',
    description: 'Ответьте правильно на 3 вопроса подряд',
    icon: '🔥',
    condition: (state) => state.correctAnswersInARow > 3
  },
  {
    id: 'five_days_streak',
    title: 'Пятерка подряд',
    description: 'Занимайтесь языком 5 дней подряд',
    icon: '🔥',
    condition: (state) => state.streak >= 5
  },
  {
    id: 'half_course',
    title: 'Экватор',
    description: 'Пройдите половину курса',
    icon: '🌍',
    condition: (state) => state.overallProgress > 50
  },
  {
    id: 'perfect_lesson',
    title: 'Безупречно',
    description: 'Завершите урок без ошибок',
    icon: '💯',
    condition: (state) => state.lessonCompletedWithoutMistakes && state.successfulLessons > 0
  },
  {
    id: 'course_completed',
    title: 'Мастер языка',
    description: 'Завершите весь курс',
    icon: '🏆',
    condition: (state) => state.overallProgress > 100
  }
];

// Добавьте состояние для streak
const [streak, setStreak] = useState(0);

// В функции, которая вызывается при завершении занятия
const handleLessonCompletion = () => {
  // Логика для увеличения streak
  const lastCompletionDate = localStorage.getItem('lastCompletionDate');
  const today = new Date().toDateString();

  if (lastCompletionDate === today) {
    // Если сегодня уже было занятие, ничего не делаем
    return;
  } else if (lastCompletionDate && new Date(lastCompletionDate).getDate() === new Date().getDate() - 1) {
    // Если занятие было вчера
    setStreak((prev) => prev + 1);
  } else {
    // Если пропущен день
    setStreak(1);
  }

  localStorage.setItem('lastCompletionDate', today);
};


interface LessonContentProps {
  courseId: number;
}

const LessonContent: React.FC<LessonContentProps> = ({ courseId }) => {
  const { userId } = useAuth();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hearts, setHearts] = useState(5);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [allLessonsCompleted, setAllLessonsCompleted] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [successfulLessons, setSuccessfulLessons] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [correctAnswersInARow, setCorrectAnswersInARow] = useState(0);
  const [lessonCompletedWithoutMistakes, setLessonCompletedWithoutMistakes] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [currentCourseLessons, setCurrentCourseLessons] = useState(allLessons[courseId] || []); 
  const currentLesson = currentCourseLessons[currentLessonIndex];
 

  useEffect(() => {
    if (currentCourseLessons.length > 0) {
      const calculatedProgress = (successfulLessons / currentCourseLessons.length) * 100;
      setOverallProgress(calculatedProgress);
    }
  }, [successfulLessons, currentCourseLessons.length]);
    
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === currentLesson.correctAnswer);
    if (answer === currentLesson.correctAnswer) {
      setPoints(points + 10);
      setSuccessfulLessons(successfulLessons + 1);
    } else {
      setHearts(hearts - 1);
    }
  }; 
    
  const handleNextLesson = async () => {
    if (currentLessonIndex < currentCourseLessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setShowQuestion(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
      setLessonCompletedWithoutMistakes(false); 
    } else {
      setAllLessonsCompleted(true);
      await handleSaveProgress(true, points);
    }
  };

  const handleRestart = () => {
    setCurrentLessonIndex(0);
    setHearts(5);
    setPoints(0);
    setSuccessfulLessons(0);
    setShowGameOver(false);
    setAllLessonsCompleted(false);
    setUnlockedAchievements([]);
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setShowQuestion(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
    }
  }

  useEffect(() => {
    const calculatedProgress = (successfulLessons / currentCourseLessons.length) * 100;
    setOverallProgress(calculatedProgress);
  }, [successfulLessons, currentCourseLessons.length]);

  useEffect(() => {
    setProgress((currentLessonIndex / currentCourseLessons.length) * 100);
  }, [currentLessonIndex, currentCourseLessons.length]);

  useEffect(() => {
    if (hearts === 0) {
      handleGameOver();
    }
  }, [hearts]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`lessonProgress_${courseId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentLessonIndex(progress.lessonIndex);
      setPoints(progress.points);
      setHearts(progress.hearts);
      setSuccessfulLessons(progress.successfulLessons);
    }
  }, [courseId]);

  useEffect(() => {
    localStorage.setItem(`lessonProgress_${courseId}`, JSON.stringify({
      lessonIndex: currentLessonIndex,
      points,
      hearts,
      successfulLessons
    }));
  }, [courseId, currentLessonIndex, points, hearts, successfulLessons]);

  const handleSaveProgress = async (completed: boolean, score: number) => {
    if (!userId) return;

    setIsSaving(true);
    try {
      await saveProgress({
        lessonId: currentLesson.id,
        courseId: courseId,
        completed,
        score,
      });
    } catch (error) {
      console.error('Не удалось сохранить ход урока:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGameOver = () => {
    setShowGameOver(true);
    handleSaveProgress(false, points);
  };

  const handleContinue = () => {
    setShowQuestion(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  const calculateBonus = () => {
    return Math.floor(points / 100);
  };

  const handleSelectAnswer = async (option: string) => {
    if (selectedAnswer || hearts === 0) return;
    
    setSelectedAnswer(option);
    const correct = option === currentLesson.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      const bonus = calculateBonus();
    const newPoints = points + 10 + bonus;
    setPoints(newPoints);
    setSuccessfulLessons(prev => prev + 1);
    // Устанавливаем флаг успешного завершения только если не было ошибок
    setLessonCompletedWithoutMistakes(true);
    await handleSaveProgress(true, newPoints);
  } else {
    const newHearts = Math.max(0, hearts - 1);
    const newPoints = Math.max(0, points - 5);
    setHearts(newHearts);
    setPoints(newPoints);
    // Сбрасываем флаг при ошибке
    setLessonCompletedWithoutMistakes(false);
    await handleSaveProgress(false, newPoints);
  }
  
  setShowExplanation(true);
};


  const handleRestartCourse = async () => {
     setCurrentLessonIndex(0);
     setShowQuestion(false);
     setSelectedAnswer(null);
     setIsCorrect(null);
     setShowExplanation(false);
     setAllLessonsCompleted(false);
     setHearts(5);
     setPoints(0);
     setProgress(0);
     setSuccessfulLessons(0);
     setShowGameOver(false);
     localStorage.removeItem(`lessonProgress_${courseId}`);
     await handleSaveProgress(false, 0);
  };

  const checkAchievements = useCallback(() => {
    const newAchievements = achievements.filter(achievement => {
      const state = {
        successfulLessons,
        correctAnswersInARow,
        overallProgress,
        lessonCompletedWithoutMistakes,
        streak,
      };

      return !unlockedAchievements.includes(achievement.id) && achievement.condition(state);
    });
  
  if (newAchievements.length > 0) {
    setUnlockedAchievements(prev => {
      const updatedAchievements = [...prev];
      
      newAchievements.forEach(achievement => {
        if (!prev.includes(achievement.id)) {
          updatedAchievements.push(achievement.id);
          toast.success(`Новое достижение: ${achievement.title}`, {
            description: achievement.description,
            icon: achievement.icon,
          });
        }
      });
      
      return updatedAchievements;
    });
  }
}, [successfulLessons, correctAnswersInARow, overallProgress, lessonCompletedWithoutMistakes, unlockedAchievements]);


useEffect(() => {
  const timeoutId = setTimeout(() => {
    checkAchievements();
  }, 0); // Небольшая задержка для предотвращения множественных вызовов

  return () => clearTimeout(timeoutId);
}, [checkAchievements]);

if (showGameOver) {
  return (
    <motion.div
      key={currentLesson.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Игра окончена</h2>
      <p>Вы успешно прошли {successfulLessons} уроков</p>
      <p>Ваши очки: {points}</p>
      <Button onClick={handleRestartCourse} className="mt-4">Начать заново</Button>
    </motion.div>
  );
}

if (allLessonsCompleted) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center"
    >
      <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">Поздравляем!</h2>
      <p className="mb-4">Вы успешно завершили все уроки курса!</p>
      <p className="mb-4">Итоговые очки: {points}</p>
      <Button onClick={handleRestartCourse}>Начать курс заново</Button>
    </motion.div>
  );
}

return (
<motion.div 
  key={currentLesson.id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md relative"
>
  {isSaving && (
    <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
      Сохранение...
    </div>
  )}
  
  {currentLesson.image && (
    <Image 
      src={currentLesson.image} 
      alt={currentLesson.title} 
      width={500} 
      height={300} 
      className="rounded-lg mb-4"
    />
  )}
  <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
  <p className="mb-4">{currentLesson.content}</p>
  
  {!showQuestion ? (
    <Button onClick={() => setShowQuestion(true)} className="w-full">Продолжить</Button>
  ) : (
    <>
      <h3 className="text-xl font-semibold mb-3">{currentLesson.question}</h3>
      <div className="space-y-2">
        {currentLesson.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleSelectAnswer(option)}
            variant={selectedAnswer === option ? 'secondary' : 'default'} 
            className="w-full"
          >
            {option}
          </Button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4">
          <p className="mb-2">{currentLesson.explanation}</p>
          <Button onClick={handleNextLesson} disabled={currentLessonIndex === currentCourseLessons.length - 1}>
           Следующий урок
           </Button>
        </div>
      )}
    </>
  )}
  
  <div className="flex justify-between mt-4">
    <Button onClick={handlePreviousLesson} disabled={currentLessonIndex === 0}>
      Предыдущий урок
    </Button>
    <div className="flex items-center">
      <Heart className="w-6 h-6 text-red- 500" />
      <span className="ml-2 font-bold">{hearts}</span>
    </div>
    <div className="flex items-center">
      <Award className="w-6 h-6 text-yellow-500" />
      <span className="ml-2 font-bold">{points}</span>
    </div>
    <div className="flex items-center">
      <BarChart className="w-6 h-6 text-blue-500" />
      <span className="ml-2 font-bold">{progress.toFixed(2)}%</span>
    </div>
  </div>

  {/* Прогресс-бар */}
  <div className="mt-4">
    <h4 className="text-lg font-semibold">Ваш прогресс:</h4>
    <div className="relative w-full h-4 bg-gray-200 rounded">
      <div
        className="absolute h-full bg-blue-500 rounded"
        style={{ width: `${progress.toFixed(2)}%` }}
      />
    </div>
  </div>

  {/* Дополнительная статистика */}
  <div className="mt-4">
    <h4 className="text-lg font-semibold">Статистика прогресса:</h4>
    <p>Успешные уроки: <span className="font-bold">{successfulLessons}</span></p>
    <p>Общий прогресс: <span className="font-bold">{overallProgress.toFixed(2)}%</span></p>
  </div>
</motion.div>
 );
}
export default LessonContent;