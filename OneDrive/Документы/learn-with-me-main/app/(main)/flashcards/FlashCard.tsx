"use client";
import React, { useState } from 'react';

// Определите интерфейс для пропсов
interface FlashCardProps {
  word: string;        // Указываем, что word должен быть строкой
  translation: string; // Указываем, что translation должен быть строкой
}

const FlashCard: React.FC<FlashCardProps> = ({ word, translation }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div onClick={() => setFlipped(!flipped)} className="flash-card">
      {flipped ? translation : word}
    </div>
  );
};

export default FlashCard;