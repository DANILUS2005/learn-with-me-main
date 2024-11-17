// Файл: /app/models/Streak.ts

export class Streak {
    lastActiveDate: Date | null = null;
    currentStreak: number = 0;
  
    updateStreak() {
      const today = new Date();
      if (!this.lastActiveDate || this.lastActiveDate < today) {
        if (this.lastActiveDate && this.isYesterday(this.lastActiveDate, today)) {
          this.currentStreak += 1;
        } else {
          this.currentStreak = 1;
        }
        this.lastActiveDate = today;
      }
    }
  
    private isYesterday(lastDate: Date, today: Date): boolean {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return lastDate.toDateString() === yesterday.toDateString();
    }
  }
  
  // Пример использования
  const streak = new Streak();
  streak.updateStreak();
  console.log(`Текущий streak: ${streak.currentStreak} дней`);