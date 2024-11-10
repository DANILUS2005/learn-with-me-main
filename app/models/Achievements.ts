// Файл: /app/models/Achievements.ts

export class Achievement {
    constructor(public name: string, public description: string, public points: number, public isEarned: boolean = false) {}
  }
  
  export class User {
    achievements: Achievement[] = [];
  
    earnAchievement(achievement: Achievement) {
      achievement.isEarned = true;
      this.achievements.push(achievement);
      console.log(`Достижение получено: ${achievement.name}`);
    }
  }
  
  // Пример использования
  const achievement1 = new Achievement("Первый урок завершен", "Завершите свой первый урок", 10);
  const user = new User();
  user.earnAchievement(achievement1);