// Файл: /app/models/Difficulty.ts

export class Course {
    constructor(public title: string, public level: string) {}
  }
  
  export class User {
    selectedLevel: string = "Начальный";
  
    setDifficultyLevel(level: string) {
      this.selectedLevel = level;
      console.log(`Выбран уровень сложности: ${this.selectedLevel}`);
    }
  }
  
  // Пример использования
  const course = new Course("Основы испанского", "Начальный");
  const user = new User();
  user.setDifficultyLevel("Средний");