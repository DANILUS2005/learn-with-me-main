"use client";
import React, { useState } from 'react';

interface MultipleChoiceExerciseProps {
  question: string; // Указываем, что question должен быть строкой
  options: string[]; // Указываем, что options должен быть массивом строк
  correctAnswer: string; // Указываем, что correctAnswer должен быть строкой
}

const MultipleChoiceExercise: React.FC<MultipleChoiceExerciseProps> = ({ question, options, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const checkAnswer = () => {
    if (selectedAnswer === correctAnswer) {
      alert("Правильно!");
    } else {
      alert("Неправильно, попробуйте еще раз.");
    }
  };

  return (
    <div>
      <h3>{question}</h3>
      {options.map((option, index) => (
        <button key={index} onClick={() => setSelectedAnswer(option)}>
          {option}
        </button>
      ))}
      <button onClick={checkAnswer}>Проверить ответ</button>
    </div>
  );
};

export default MultipleChoiceExercise;