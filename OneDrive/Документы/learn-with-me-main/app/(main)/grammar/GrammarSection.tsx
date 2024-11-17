import React from 'react';

// Определите интерфейс для каждого правила
interface Rule {
  title: string;       // Заголовок правила
  description: string; // Описание правила
}

// Определите интерфейс для пропсов
interface GrammarSectionProps {
  rules: Rule[]; // Массив правил
}

const GrammarSection: React.FC<GrammarSectionProps> = ({ rules }) => (
  <div>
    {rules.map((rule: Rule, index: number) => (
      <div key={index}>
        <h3>{rule.title}</h3>
        <p>{rule.description}</p>
      </div>
    ))}
  </div>
);

export default GrammarSection;