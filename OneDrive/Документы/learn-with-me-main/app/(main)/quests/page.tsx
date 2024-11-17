"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Target, Award, Clock } from 'lucide-react';
import { toast } from "sonner";

interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  image: string;
  completed: boolean;
  progress: number;
  totalNeeded: number;
}

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function useBonusTimer(lastClaimedBonus: number) {
  const [timeUntilNextBonus, setTimeUntilNextBonus] = useState<string>('');
  const [canClaimBonus, setCanClaimBonus] = useState<boolean>(false);

  useEffect(() => {
    const updateBonusTimer = () => {
      const now = Date.now();
      const timeSinceLastClaim = now - lastClaimedBonus;
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

      if (timeSinceLastClaim >= cooldownPeriod) {
        setCanClaimBonus(true);
        setTimeUntilNextBonus('Доступно!');
      } else {
        setCanClaimBonus(false);
        const timeLeft = cooldownPeriod - timeSinceLastClaim;
        const hours = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
        setTimeUntilNextBonus(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    };

    const timer = setInterval(updateBonusTimer, 1000);
    updateBonusTimer();

    return () => clearInterval(timer);
  }, [lastClaimedBonus]);

  return { timeUntilNextBonus, canClaimBonus };
}

export default function Quests() {
  const [quests] = useState<Quest[]>([
    {
      id: 1,
      title: "Пройти уроки",
      description: "Завершите 3 урока любого курса",
      reward: 50,
      image: "/Planes/medalSilver.png",
      completed: false,
      progress: 1,
      totalNeeded: 3
    },
    {
      id: 2,
      title: "Словарный запас",
      description: "Выучите 20 новых слов",
      reward: 100,
      image: "/Planes/planeGreen1.png",
      completed: false,
      progress: 8,
      totalNeeded: 20
    },
    {
      id: 3,
      title: "Мастер тестов",
      description: "Получите 100% в тесте",
      reward: 150,
      image: "/Planes/planeRed1.png",
      completed: false,
      progress: 85,
      totalNeeded: 100
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(300);
  const [level, setLevel] = useState(3);
  const pointsToNextLevel = 1000;

  const [lastClaimedBonus, setLastClaimedBonus] = useLocalStorage('lastClaimedBonus', 0);
  const { timeUntilNextBonus, canClaimBonus } = useBonusTimer(lastClaimedBonus);

  const startQuest = useCallback((questId: number) => {
    toast.success("Квест начат!", {
      description: "Удачи в выполнении задания!"
    });
  }, []);

  const calculateProgress = useCallback((progress: number, total: number) => {
    return (progress / total) * 100;
  }, []);

  const claimDailyBonus = useCallback(() => {
    if (canClaimBonus) {
      const bonusAmount = 100; 
      const now = useMemo(() => Date.now(), []); // Кеширование  значения  now 
      setTotalPoints(prev => prev + bonusAmount);
      setLastClaimedBonus(now); 
      
      toast.success("Ежедневный бонус получен!", {
        description: `Вы получили ${bonusAmount} очков!`,
      });
    }
  }, [canClaimBonus, setLastClaimedBonus, setTotalPoints]);

  return (
    <div className="mx-auto flex-1 w-full flex flex-col items-center max-w-[988px] p-4 gap-2">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-neutral-600">
            Ежедневные квесты
          </h1>
        </div>
        <p className="text-neutral-500 text-lg">
          Выполняйте задания и получайте награды
        </p>
      </motion.div>

      {/* Daily Bonus Section */}
      <motion.div
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-[600px] bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 shadow-lg mb-8 text-white"
       >
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <Star className="w-8 h-8 text-yellow-300" />
             <div>
               <h3 className="font-bold text-lg">Ежедневный бонус</h3>
               <div className="flex items-center gap-2">
                 <Clock className="w-4 h-4" />
                 <p className="text-sm opacity-90">
                   {canClaimBonus
                     ? "Бонус доступен!" 
                     : `Следующий бонус через: ${timeUntilNextBonus}`
                   }
                 </p>
               </div>
             </div>
           </div>
           <Button 
             variant="premium"
             onClick={claimDailyBonus}
             disabled={!canClaimBonus}
             className={`
               bg-white text-purple-600 
               ${!canClaimBonus 
                 ? 'opacity-50 cursor-not-allowed' 
                 : 'hover:bg-opacity-90'
               }
             `}
           >
             {canClaimBonus ? "Забрать" : "Подождите"}
           </Button>
         </div>
       </motion.div>
       
       {/* Bonus Information Section */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.3 }}
         className="w-full max-w-[600px] bg-white rounded-lg p-4 mb-8 shadow-sm border border-gray-100"
       >
         <h3 className="font-semibold mb-2">Информация о бонусах</h3>
         <ul className="space-y-2 text-sm text-gray-600">
           <li className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             Ежедневный бонус: 100 очков
           </li>
           <li className="flex items-center gap-2">
             <Clock className="w-4 h-4 text-blue-500" />
             Доступен каждые 24 часа
           </li>
           <li className="flex items-center gap-2">
             <Trophy className="w-4 h-4 text-purple-500" />
             Не пропускайте дни для максимальной награды
           </li>
         </ul>
       </motion.div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <AnimatePresence>
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-100"
            >{/* Содержимое карточки квеста */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <Image
                    src={quest.image}
                    alt="Награда"
                    width={40}
                    height={40}
                    className="transform hover:rotate-12 transition-transform"
                  />
                  {quest.completed && (
                    <div className="absolute -top-2 -right-2">
                      <Award className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{quest.title}</h2>
                  <p className="text-sm text-neutral-500">{quest.description}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress(quest.progress, quest.totalNeeded)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-neutral-500">
                    {quest.progress}/{quest.totalNeeded}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {calculateProgress(quest.progress, quest.totalNeeded)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-neutral-600">
                    {quest.reward} очков
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startQuest(quest.id)}
                  className="hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  Начать
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
 ```typescript
      </div>

      {/* Progress Section */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 w-full max-w-[600px] bg-white rounded-lg p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb -4">
          <h2 className="font-bold text-lg">Ваш прогресс</h2>
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-semibold text-neutral-600">
              Уровень {level}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(totalPoints / pointsToNextLevel) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-neutral-500">{totalPoints}/{pointsToNextLevel} очков</span>
          <span className="text-sm text-neutral-500">{Math.floor((totalPoints / pointsToNextLevel) * 100)}%</span>
        </div>
      </motion.div>
    </div>
  );
}