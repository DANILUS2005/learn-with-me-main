"use client";
import React from 'react';

// Определите интерфейс для пропсов
interface AudioLessonProps {
  audioSrc: string; // Указываем, что audioSrc должен быть строкой
}

const AudioLesson: React.FC<AudioLessonProps> = ({ audioSrc }) => {
  return (
    <audio controls>
      <source src={audioSrc} type="audio/mpeg" />
      Ваш браузер не поддерживает тег audio.
    </audio>
  );
};

export default AudioLesson;