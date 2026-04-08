export interface QuizOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  type: "single" | "multiple" | "scale" | "input";
  question: string;
  description?: string;
  options?: QuizOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

export interface QuizAnswer {
  questionId: string;
  value: string | string[] | number;
  answeredAt: string;
}

export interface QuizSession {
  tenantSlug: string;
  answers: QuizAnswer[];
  currentStep: number;
  totalSteps: number;
  startedAt: string;
  completedAt?: string;
}
