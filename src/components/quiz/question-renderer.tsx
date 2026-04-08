"use client";

import type { QuizQuestion } from "@/types/quiz";
import { CardGrid } from "./card-grid";

interface QuestionRendererProps {
  question: QuizQuestion;
  onAnswer: (value: string | string[] | number) => void;
  currentValue?: string | string[] | number;
}

export function QuestionRenderer({
  question,
  onAnswer,
  currentValue,
}: QuestionRendererProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.03em] text-text leading-tight">
          {question.question}
        </h2>
        {question.description && (
          <p className="mt-3 text-base text-text-muted">
            {question.description}
          </p>
        )}
      </div>

      {(question.type === "single" || question.type === "multiple") &&
        question.options && (
          <CardGrid
            options={question.options}
            onSelect={onAnswer}
            selectedValue={currentValue as string | undefined}
            multiSelect={question.type === "multiple"}
          />
        )}
    </div>
  );
}
