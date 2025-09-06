import { useState, useEffect } from "react";
import { useDemo } from "@/contexts/DemoContext";

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "multi" | "short" | "truefalse";
  prompt: string;
  options?: QuizOption[];
  points: number;
  explanation?: string;
  expectedAnswer?: string; // for short answer questions
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  status: "draft" | "published";
  timeLimitMinutes?: number;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
}

const STORAGE_KEY = "ecoquest_quizzes";
const COURSES_KEY = "ecoquest_courses";

const SAMPLE_COURSES: Course[] = [
  { id: "course_eco_101", name: "Environmental Science 101", code: "ECO101" },
  { id: "course_eco_102", name: "Climate Change Studies", code: "ECO102" },
  { id: "course_eco_201", name: "Sustainable Development", code: "ECO201" },
  { id: "course_bio_101", name: "Biology Fundamentals", code: "BIO101" }
];

const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: "quiz_climate_basics",
    title: "Climate Change Basics",
    description: "Understanding the fundamentals of climate change and its impact",
    courseId: "course_eco_101",
    teacherId: "demo_teacher_1",
    status: "published",
    timeLimitMinutes: 15,
    questions: [
      {
        id: "q_climate_1",
        type: "mcq",
        prompt: "What is the primary cause of current climate change?",
        options: [
          { id: "o1", text: "Natural climate cycles", correct: false },
          { id: "o2", text: "Human activities and greenhouse gas emissions", correct: true },
          { id: "o3", text: "Solar radiation changes", correct: false },
          { id: "o4", text: "Volcanic activity", correct: false }
        ],
        points: 10,
        explanation: "Human activities, particularly burning fossil fuels, are the primary driver of current climate change."
      },
      {
        id: "q_climate_2",
        type: "truefalse",
        prompt: "CO2 levels in the atmosphere are at their highest in human history.",
        options: [
          { id: "t1", text: "True", correct: true },
          { id: "f1", text: "False", correct: false }
        ],
        points: 5,
        explanation: "CO2 levels have reached over 410 ppm, the highest in over 800,000 years."
      }
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "quiz_renewable_energy",
    title: "Renewable Energy Sources",
    description: "Exploring different types of renewable energy and their benefits",
    courseId: "course_eco_102",
    teacherId: "demo_teacher_1",
    status: "draft",
    timeLimitMinutes: 20,
    questions: [
      {
        id: "q_renewable_1",
        type: "multi",
        prompt: "Which of the following are renewable energy sources? (Select all that apply)",
        options: [
          { id: "r1", text: "Solar power", correct: true },
          { id: "r2", text: "Wind power", correct: true },
          { id: "r3", text: "Coal", correct: false },
          { id: "r4", text: "Hydroelectric power", correct: true },
          { id: "r5", text: "Natural gas", correct: false }
        ],
        points: 15,
        explanation: "Solar, wind, and hydroelectric are all renewable sources that naturally replenish."
      }
    ],
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-12T09:15:00Z"
  }
];

export const useQuizStorage = () => {
  const { isDemoMode } = useDemo();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage or use sample data in demo mode
  useEffect(() => {
    const loadData = () => {
      try {
        // Load courses
        const storedCourses = localStorage.getItem(COURSES_KEY);
        if (storedCourses) {
          setCourses(JSON.parse(storedCourses));
        } else {
          setCourses(SAMPLE_COURSES);
          localStorage.setItem(COURSES_KEY, JSON.stringify(SAMPLE_COURSES));
        }

        // Load quizzes
        const storedQuizzes = localStorage.getItem(STORAGE_KEY);
        if (storedQuizzes) {
          setQuizzes(JSON.parse(storedQuizzes));
        } else if (isDemoMode) {
          setQuizzes(SAMPLE_QUIZZES);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_QUIZZES));
        } else {
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Error loading quiz data:", error);
        setQuizzes(isDemoMode ? SAMPLE_QUIZZES : []);
        setCourses(SAMPLE_COURSES);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isDemoMode]);

  const saveQuizzes = (newQuizzes: Quiz[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuizzes));
      setQuizzes(newQuizzes);
      
      // Emit event for other components
      window.dispatchEvent(new CustomEvent('quizzes.updated', { detail: newQuizzes }));
    } catch (error) {
      console.error("Error saving quizzes:", error);
      throw new Error("Failed to save quiz data");
    }
  };

  const generateId = (prefix: string) => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const createQuiz = (quizData: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: generateId('quiz'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedQuizzes = [...quizzes, newQuiz];
    saveQuizzes(updatedQuizzes);
    return newQuiz;
  };

  const updateQuiz = (id: string, updates: Partial<Quiz>) => {
    const updatedQuizzes = quizzes.map(quiz => 
      quiz.id === id 
        ? { ...quiz, ...updates, updatedAt: new Date().toISOString() }
        : quiz
    );
    saveQuizzes(updatedQuizzes);
    return updatedQuizzes.find(q => q.id === id);
  };

  const deleteQuiz = (id: string) => {
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
    saveQuizzes(updatedQuizzes);
  };

  const duplicateQuiz = (id: string) => {
    const originalQuiz = quizzes.find(q => q.id === id);
    if (!originalQuiz) return null;

    const duplicatedQuiz: Quiz = {
      ...originalQuiz,
      id: generateId('quiz'),
      title: `${originalQuiz.title} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: originalQuiz.questions.map(q => ({
        ...q,
        id: generateId('q'),
        options: q.options?.map(opt => ({ ...opt, id: generateId('o') }))
      }))
    };

    const updatedQuizzes = [...quizzes, duplicatedQuiz];
    saveQuizzes(updatedQuizzes);
    return duplicatedQuiz;
  };

  const exportQuiz = (id: string) => {
    const quiz = quizzes.find(q => q.id === id);
    if (!quiz) return;

    const dataStr = JSON.stringify(quiz, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${quiz.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importQuiz = (quizData: Quiz) => {
    // Validate quiz structure
    if (!quizData.title || !quizData.questions || !Array.isArray(quizData.questions)) {
      throw new Error("Invalid quiz format");
    }

    const importedQuiz: Quiz = {
      ...quizData,
      id: generateId('quiz'),
      teacherId: "demo_teacher_1", // Override with current teacher
      status: 'draft', // Always import as draft
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: quizData.questions.map(q => ({
        ...q,
        id: generateId('q'),
        options: q.options?.map(opt => ({ ...opt, id: generateId('o') }))
      }))
    };

    const updatedQuizzes = [...quizzes, importedQuiz];
    saveQuizzes(updatedQuizzes);
    return importedQuiz;
  };

  return {
    quizzes,
    courses,
    loading,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    duplicateQuiz,
    exportQuiz,
    importQuiz,
    generateId
  };
};