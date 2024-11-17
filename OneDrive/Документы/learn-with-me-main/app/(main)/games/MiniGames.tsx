"use client";
import React, { useState, useEffect } from 'react';

interface MiniGameProps {
  onWin: (points: number) => void;
}

const MiniGame: React.FC<MiniGameProps> = ({ onWin }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOutcome, setGameOutcome] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10); // Таймер на 10 секунд

  const handleOutcome = () => {
    const win = Math.random() > 0.5; // Случайный выбор исхода
    if (win) {
      onWin(10); // Добавляем очки за победу
      setGameOutcome('Вы выиграли!');
    } else {
      setGameOutcome('Вы проиграли!');
    }
    setIsPlaying(false); // Завершаем игру
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleOutcome(); // Завершаем игру при окончании таймера
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(10); // Сбрасываем таймер
    setGameOutcome(null); // Очищаем прошлый результат
  };

  return (
    <div>
      <h2>Мини-игра</h2>
      {gameOutcome && <p>{gameOutcome}</p>}
      {isPlaying ? (
        <div>
          <p>Игра идет! Осталось времени: {timeLeft} сек.</p>
          <button onClick={handleOutcome}>Попробовать завершить игру</button>
        </div>
      ) : (
        <button onClick={startGame}>Начать мини-игру</button>
      )}
    </div>
  );
};

export default MiniGame;