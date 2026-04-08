"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/stores/quiz.store";
import { ProgressBar } from "@/components/ui/progress-bar";
import { QuestionRenderer } from "./question-renderer";
import type { QuizQuestion } from "@/types/quiz";

const TEAMBOTO_QUESTIONS: QuizQuestion[] = [
  {
    id: "sex",
    type: "single",
    question: "Qual é o seu sexo?",
    description: "Isso nos ajuda a personalizar seu plano de treino",
    options: [
      { value: "male", label: "Masculino", icon: "♂️" },
      { value: "female", label: "Feminino", icon: "♀️" },
    ],
    required: true,
  },
  {
    id: "age",
    type: "single",
    question: "Qual é a sua faixa etária?",
    description: "A idade influencia nas zonas de treino e recuperação",
    options: [
      { value: "under_18", label: "Menos de 18 anos", icon: "🧒" },
      { value: "18_25", label: "18 a 25 anos", icon: "🧑" },
      { value: "26_35", label: "26 a 35 anos", icon: "💪" },
      { value: "36_45", label: "36 a 45 anos", icon: "🏃" },
      { value: "46_55", label: "46 a 55 anos", icon: "🏅" },
      { value: "56_plus", label: "56 anos ou mais", icon: "🌟" },
    ],
    required: true,
  },
  {
    id: "goal",
    type: "single",
    question: "Qual é o seu principal objetivo?",
    description: "Escolha o que mais te motiva a correr",
    options: [
      { value: "first_race", label: "Completar minha primeira prova", icon: "🏁" },
      { value: "improve_time", label: "Melhorar meu tempo", icon: "⏱️" },
      { value: "health", label: "Saúde e condicionamento", icon: "💪" },
      { value: "weight_loss", label: "Emagrecer correndo", icon: "🔥" },
      { value: "fun", label: "Correr por diversão", icon: "😄" },
    ],
    required: true,
  },
  {
    id: "experience",
    type: "single",
    question: "Qual é o seu nível de experiência?",
    description: "Seja honesto — isso ajuda a criar o plano ideal",
    options: [
      { value: "beginner", label: "Iniciante", icon: "🌱", description: "Nunca corri ou corro há pouco tempo" },
      { value: "intermediate", label: "Intermediário", icon: "🏃", description: "Corro regularmente há meses" },
      { value: "advanced", label: "Avançado", icon: "🚀", description: "Corro há anos com treinos estruturados" },
      { value: "elite", label: "Competidor", icon: "🏆", description: "Já competi e busco performance" },
    ],
    required: true,
  },
  {
    id: "weekly_frequency",
    type: "single",
    question: "Quantas vezes por semana você quer treinar?",
    description: "Considere sua rotina e disponibilidade real",
    options: [
      { value: "2-3", label: "2 a 3 vezes", icon: "📅" },
      { value: "4-5", label: "4 a 5 vezes", icon: "📆" },
      { value: "6+", label: "6 ou mais vezes", icon: "🗓️" },
    ],
    required: true,
  },
  {
    id: "target_distance",
    type: "single",
    question: "Qual distância te interessa?",
    description: "Escolha a prova que mais combina com seu objetivo",
    options: [
      { value: "5k", label: "5 km", icon: "5️⃣" },
      { value: "10k", label: "10 km", icon: "🔟" },
      { value: "half_marathon", label: "Meia Maratona", icon: "🏅" },
      { value: "marathon", label: "Maratona", icon: "🎖️" },
      { value: "ultra", label: "Ultramaratona", icon: "🦸" },
      { value: "no_race", label: "Não tenho prova em vista", icon: "🤷" },
    ],
    required: true,
  },
  {
    id: "current_pace",
    type: "single",
    question: "Qual é seu pace médio atual?",
    description: "Se não sabe, escolha a opção mais próxima",
    options: [
      { value: "above_7", label: "Acima de 7:00 min/km", icon: "🐢" },
      { value: "6_7", label: "6:00 - 7:00 min/km", icon: "🚶" },
      { value: "5_6", label: "5:00 - 6:00 min/km", icon: "🏃" },
      { value: "4_5", label: "4:00 - 5:00 min/km", icon: "💨" },
      { value: "below_4", label: "Abaixo de 4:00 min/km", icon: "⚡" },
      { value: "dont_know", label: "Não sei meu pace", icon: "❓" },
    ],
    required: true,
  },
  {
    id: "injury_history",
    type: "single",
    question: "Você tem ou teve alguma lesão recente?",
    description: "Isso nos ajuda a proteger seu corpo",
    options: [
      { value: "none", label: "Nenhuma lesão", icon: "✅" },
      { value: "knee", label: "Joelho", icon: "🦵" },
      { value: "ankle", label: "Tornozelo/Pé", icon: "🦶" },
      { value: "shin", label: "Canela (canelite)", icon: "🦴" },
      { value: "hip_back", label: "Quadril/Lombar", icon: "🔙" },
      { value: "other", label: "Outra lesão", icon: "🩹" },
    ],
    required: true,
  },
  {
    id: "preferred_time",
    type: "single",
    question: "Quando você prefere treinar?",
    description: "Vamos encaixar os treinos na sua rotina",
    options: [
      { value: "morning", label: "Manhã", icon: "🌅" },
      { value: "afternoon", label: "Tarde", icon: "☀️" },
      { value: "evening", label: "Noite", icon: "🌙" },
      { value: "flexible", label: "Horário flexível", icon: "🔄" },
    ],
    required: true,
  },
];

interface QuizFlowProps {
  tenantSlug: string;
  embedded?: boolean;
}

export function QuizFlow({ tenantSlug, embedded = false }: QuizFlowProps) {
  const router = useRouter();
  const {
    currentStep,
    setAnswer,
    nextStep,
    prevStep,
    setTenantSlug,
    setCurrentStep,
    getAnswer,
    answers,
  } = useQuizStore();

  const [hydrated, setHydrated] = useState(false);

  const questions = TEAMBOTO_QUESTIONS;
  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / totalSteps) * 100;

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setTenantSlug(tenantSlug);
  }, [tenantSlug, setTenantSlug]);

  const handleAnswer = useCallback(
    (value: string | string[] | number) => {
      if (!currentQuestion) return;

      setAnswer({
        questionId: currentQuestion.id,
        value,
        answeredAt: new Date().toISOString(),
      });

      // Auto-advance after 300ms
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          nextStep();
        } else {
          // Quiz complete — navigate to result
          router.push(`/${tenantSlug}/result`);
        }
      }, 300);
    },
    [currentQuestion, currentStep, totalSteps, setAnswer, nextStep, router, tenantSlug]
  );

  const handleBack = () => {
    if (currentStep > 0) {
      prevStep();
    }
  };

  const handleClose = () => {
    if (embedded) {
      setCurrentStep(0);
      const hero = document.querySelector("#hero");
      if (hero) hero.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${tenantSlug}`);
    }
  };

  if (!hydrated || !currentQuestion) return null;

  const existingAnswer = getAnswer(currentQuestion.id);

  return (
    <div
      className={
        embedded
          ? "w-full"
          : "min-h-screen flex flex-col bg-bg"
      }
    >
      {/* Header */}
      <div className="px-4 md:px-6 pt-6 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className={`text-text-muted hover:text-text transition-colors cursor-pointer ${
              currentStep === 0 ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-text-muted font-medium">
            {currentStep + 1} de {totalSteps}
          </span>
          {!embedded ? (
            <button
              onClick={handleClose}
              className="text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-4 md:px-6 pt-8 pb-20">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <QuestionRenderer
                question={currentQuestion}
                onAnswer={handleAnswer}
                currentValue={existingAnswer?.value}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
