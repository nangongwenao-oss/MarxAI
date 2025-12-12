export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface VocabCard {
  id: string;
  term: string;
  definition: string;
  citation: string;
  status: 'new' | 'learned' | 'fuzzy';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  chapters: string[];
}

export interface UserStats {
  theoryMastery: number; // 0-100
  wordsLearned: number;
  wordsFuzzy: number;
  totalStudyHours: number;
  dailyData: { day: string; hours: number }[];
}

export enum TabView {
  CHAT = 'CHAT',
  THEORY = 'THEORY',
  QUIZ = 'QUIZ',
  PROGRESS = 'PROGRESS'
}
