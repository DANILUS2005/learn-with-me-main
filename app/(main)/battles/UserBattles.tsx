"use client";
import React, { useState } from 'react';
import MiniGame from '@/app/(main)/games/MiniGames'; 
// Определяем тип для пользователя
interface User {
  name: string;
  score: number;
}

const UserBattles: React.FC = () => {
  const [user1, setUser1] = useState<User>({ name: 'Игрок 1', score: 0 });
  const [user2, setUser2] = useState<User>({ name: 'Игрок 2', score: 0 });
  const [winner, setWinner] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [isMiniGameVisible, setMiniGameVisible] = useState(false);

  const generateScore = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return Math.floor(Math.random() * 50); // 0-49
      case 'medium':
        return Math.floor(Math.random() * 100); // 0-99
      case 'hard':
        return Math.floor(Math.random() * 150); // 0-149
      default:
        return 0;
    }
  };

  const startBattle = () => {
    const score1 = generateScore(difficulty);
    const score2 = generateScore(difficulty);
    
    setUser1(prev => ({ ...prev, score: score1 }));
    setUser2(prev => ({ ...prev, score: score2 }));

    if (score1 > score2) {
      setWinner(user1.name);
      setStreak(prev => prev + 1);
    } else if (score2 > score1) {
      setWinner(user2.name);
      setStreak(0);
    } else {
      setWinner('Ничья');
    }
  };

  const resetScores = () => {
    setUser1({ name: 'Игрок 1', score: 0 });
    setUser2({ name: 'Игрок 2', score: 0 });
    setWinner(null);
    setStreak(0);
  };

  const handleMiniGameWin = () => {
    // Добавляем очки к игроку 1 (или другому игроку) за выигрыш в мини-игре
    setUser1(prev => ({ ...prev, score: prev.score + 10 }));
    setMiniGameVisible(false); // Скрываем мини-игру
  };

  return (
    <div>
      <h1>Битвы между пользователями</h1>
      <div>
        <h2>{user1.name}: {user1.score} очков</h2>
        <h2>{user2.name}: {user2.score} очков</h2>
      </div>
      <button onClick={startBattle}>Начать битву</button>
      {winner && <h2>Победитель: {winner}</h2>}
      <h2>Текущий streak: {streak}</h2>
      <button onClick={resetScores}>Сбросить очки</button>

      <div>
        <h3>Выберите уровень сложности:</h3>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Легкий</option>
          <option value="medium">Средний</option>
          <option value="hard">Сложный</option>
        </select>
      </div>
  
      <button onClick={() => setMiniGameVisible(true)}>Запустить мини-игру</button>

      { isMiniGameVisible && <MiniGame onWin={handleMiniGameWin} />}
    </div>
  );
};

export default UserBattles;