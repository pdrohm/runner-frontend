"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { QuizAnswer } from "@/types/quiz";

interface QuizState {
  answers: QuizAnswer[];
  currentStep: number;
  tenantSlug: string | null;
  startedAt: string | null;

  setTenantSlug: (slug: string) => void;
  setAnswer: (answer: QuizAnswer) => void;
  removeAnswer: (questionId: string) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  getAnswer: (questionId: string) => QuizAnswer | undefined;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      answers: [],
      currentStep: 0,
      tenantSlug: null,
      startedAt: null,

      setTenantSlug: (slug) =>
        set({
          tenantSlug: slug,
          startedAt: new Date().toISOString(),
        }),

      setAnswer: (answer) =>
        set((state) => {
          const existing = state.answers.findIndex(
            (a) => a.questionId === answer.questionId
          );
          const answers = [...state.answers];
          if (existing >= 0) {
            answers[existing] = answer;
          } else {
            answers.push(answer);
          }
          return { answers };
        }),

      removeAnswer: (questionId) =>
        set((state) => ({
          answers: state.answers.filter((a) => a.questionId !== questionId),
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({ currentStep: state.currentStep + 1 })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
        })),

      getAnswer: (questionId) =>
        get().answers.find((a) => a.questionId === questionId),

      reset: () =>
        set({
          answers: [],
          currentStep: 0,
          tenantSlug: null,
          startedAt: null,
        }),
    }),
    {
      name: "quiz-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? sessionStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
