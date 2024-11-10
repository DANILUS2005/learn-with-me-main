// components/Counter.tsx
"use client";
import { useState } from 'react';

const Counter = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemove = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div>
      {/* Ваш контент */}
      <button onClick={handleRemove}>Удалить</button>
    </div>
  );
};

export default Counter;