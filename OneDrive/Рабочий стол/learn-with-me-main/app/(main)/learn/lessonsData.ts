

interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  image?: string;
}

const hindiLessons: Lesson[] = [
  {
    id: 1,
    courseId: 1,
    title: "Базовые приветствия",
    content: "В этом уроке мы изучим базовые приветствия на хинди. 'Намасте' - это традиционное индийское приветствие, которое сопровождается складыванием ладоней перед грудью.",
    question: "Как сказать 'Привет' на хинди?",
    options: ["Намасте", "Дханьявад", "Шубх ратри", "Алвида"],
    correctAnswer: "Намасте",
    explanation: "'Намасте' - самое распространенное приветствие в Индии.",
    image: "/flags/india.png"
  },
  {
    id: 2,
    courseId: 1,
    title: "Числа от 1 до 5",
    content: "Давайте выучим числа от 1 до 5 на хинди: 1 - эк, 2 - до, 3 - тин, 4 - чар, 5 - панч.",
    question: "Как сказать '3' на хинди?",
    options: ["Эк", "До", "Тин", "Чар"],
    correctAnswer: "Тин",
    explanation: "'Тин' означает '3' на хинди.",
    image: "/images/numbers.jpg"
  },
  {
    id: 3,
    courseId: 1,
    title: "Базовые фразы",
    content: "Изучим несколько базовых фраз: 'Меня зовут...' - 'Мера нам... хай', 'Как дела?' - 'Ап кайсе хайн?', 'Спасибо' - 'Дханьявад'.",
    question: "Как сказать 'Спасибо' на хинди?",
    options: ["Намасте", "Дханьявад", "Ап кайсе хайн", "Мера нам"],
    correctAnswer: "Дханьявад",
    explanation: "'Дханьявад' означает 'Спасибо' на хинди.",
    image: "/images/thank-you.jpg"
  }
];

// Уроки для португальского (курс 2)
const portugueseLessons: Lesson[] = [
  {
    id: 1,
    courseId: 2,
    title: "Основные приветствия",
    content: "Давайте изучим основные приветствия в португальском языке. 'Olá' - это неформальное приветствие, используемое в повседневной жизни.",
    question: "Как сказать 'Привет' на португальском?",
    options: ["Olá", "Tchau", "Obrigado", "Por favor"],
    correctAnswer: "Olá",
    explanation: "'Olá' - это универсальное приветствие в португальском языке.",
    image: "/flags/brazilpng.png"
  },
  {
    id: 2,
    courseId: 2,
    title: "Время суток",
    content: "В португальском есть разные приветствия в зависимости от времени суток: 'Bom dia' (доброе утро), 'Boa tarde' (добрый день), 'Boa noite' (добрый вечер).",
    question: "Как сказать 'Доброе утро' на португальском?",
    options: ["Bom dia", "Boa tarde", "Boa noite", "Olá"],
    correctAnswer: "Bom dia",
    explanation: "'Bom dia' используется утром, до полудня.",
    image: "/flags/brazilpng.png"
  }
];

// Уроки для испанского (курс 3)
const spanishLessons: Lesson[] = [
  {
    id: 1,
    courseId: 3,
    title: "Приветствия и прощания",
    content: "Изучим основные приветствия в испанском языке. 'Hola' - это универсальное приветствие, а 'Adiós' используется при прощании.",
    question: "Как сказать 'Привет' на испанском?",
    options: ["Hola", "Adiós", "Gracias", "Por favor"],
    correctAnswer: "Hola",
    explanation: "'Hola' - это стандартное приветствие в испанском языке.",
    image: "/flags/spain.png"
  },
  {
    id: 2,
    courseId: 3,
    title: "Числа от 1 до 5",
    content: "Давайте выучим числа от 1 до 5 на испанском: 1 - uno, 2 - dos, 3 - tres, 4 - cuatro, 5 - cinco.",
    question: "Как сказать '4' на испанском?",
    options: ["Uno", "Dos", "Tres", "Cuatro"],
    correctAnswer: "Cuatro",
    explanation: "'Cuatro' означает '4' на испанском.",
    image: "/images/numbers.jpg"
  }
];

// Уроки для малайского (курс 4)
const malayLessons: Lesson[] = [
  {
    id: 1,
    courseId: 4,
    title: "Основные приветствия",
    content: "В малайском языке 'Selamat datang' означает 'Добро пожаловать'. Это распространенное приветствие.",
    question: "Как сказать 'Добро пожаловать' на малайском?",
    options: ["Selamat datang", "Terima kasih", "Selamat tinggal", "Apa khabar"],
    correctAnswer: "Selamat datang",
    explanation: "'Selamat datang' - это приветствие, используемое для приветствия гостей.",
    image: "/flags/malaysia.png"
  },

  {
    id: 2,
    courseId: 4,
    title: "Числа от 1 до 5",
    content: "Давайте выучим числа от 1 до 5 на малайском: 1 - satu, 2 - dua, 3 - tiga, 4 - empat, 5 - lima.",
    question: "Как сказать '2' на малайском?",
    options: ["Satu", "Dua", "Tiga", "Empat"],
    correctAnswer: "Dua",
    explanation: "'Dua' означает '2' на малайском.",
    image: "/images/numbers.jpg"
  }
];

// Объединяем все уроки в один объект
const allLessons: Record<number, Lesson[]> = {
  1: hindiLessons,
  2: portugueseLessons,
  3: spanishLessons,
  4: malayLessons,
};

export { allLessons };