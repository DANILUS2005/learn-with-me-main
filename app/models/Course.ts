// models/Course.ts
export interface ActiveCourse {
    id: number;
    title: string;
    imageSrc: string;
    description?: string | null;
    level?: string | null;
  }