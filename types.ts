export type QuestionType = 'choice' | 'text';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface UserAnswer {
  questionId: number;
  questionText: string;
  selectedOption: string;
}

export interface UserInfo {
  name: string;
  age: string;
  grade: string;
}

export interface CareerResult {
  title: string;
  specialization: string;
  description: string;
  strengths: string[];
  skillsToDevelop: string[];
  famousFigure: string;
}

export enum AppState {
  WELCOME,
  USER_INFO,
  QUIZ,
  ANALYZING,
  RESULT,
  ERROR
}