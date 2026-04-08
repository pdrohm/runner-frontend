"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Brain,
  Gauge,
  CalendarCheck,
  MessageCircle,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useQuizStore } from "@/stores/quiz.store";
import { Button } from "@/components/ui/button";

interface QuizResultProps {
  tenantSlug: string;
}

const benefits = [
  {
    icon: Brain,
    title: "Planilha 100% Personalizada",
    description: "Criada por IA com base nas suas respostas",
  },
  {
    icon: Gauge,
    title: "Zonas de Pace Calculadas",
    description: "Ritmo ideal para cada tipo de treino",
  },
  {
    icon: CalendarCheck,
    title: "Plano Semanal Detalhado",
    description: "Cada sessão explicada passo a passo",
  },
  {
    icon: MessageCircle,
    title: "Comunidade Exclusiva",
    description: "Grupo WhatsApp com corredores e suporte",
  },
];

export function QuizResult({ tenantSlug }: QuizResultProps) {
  const router = useRouter();
  const { answers, reset } = useQuizStore();

  // Derive a personalized message based on answers
  const goalAnswer = answers.find((a) => a.questionId === "goal");
  const levelAnswer = answers.find((a) => a.questionId === "experience");

  const goalLabels: Record<string, string> = {
    first_race: "completar sua primeira prova",
    improve_time: "melhorar seu tempo",
    health: "melhorar sua saude e condicionamento",
    weight_loss: "emagrecer correndo",
    fun: "correr com mais prazer",
  };

  const levelLabels: Record<string, string> = {
    beginner: "iniciante",
    intermediate: "intermediario",
    advanced: "avancado",
    elite: "competidor",
  };

  const goalText = goalLabels[(goalAnswer?.value as string) || ""] || "alcancar seu objetivo";
  const levelText = levelLabels[(levelAnswer?.value as string) || ""] || "";

  const handleCTA = () => {
    router.push(`/${tenantSlug}/checkout`);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 md:px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-primary-dim flex items-center justify-center">
              <CheckCircle2 size={40} className="text-primary" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-[44px] font-extrabold tracking-[-0.04em] font-display leading-tight text-text">
              Sua planilha está{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                pronta para ser criada
              </span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-text-muted max-w-lg mx-auto">
              Analisamos suas respostas e montamos um plano perfeito para
              {levelText ? ` um corredor ${levelText}` : " voce"} que quer {goalText}.
            </p>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-surface-high rounded-2xl border border-border p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-dim flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-0.5">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-surface-high rounded-2xl border border-border p-6 mb-10"
          >
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-primary fill-primary" />
              ))}
            </div>
            <p className="text-sm text-text/90 leading-relaxed italic">
              &ldquo;Em 3 meses baixei 8 minutos na meia maratona. A planilha era
              certeira — cada treino fazia sentido.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-bg text-xs font-bold">
                RS
              </div>
              <div>
                <span className="text-sm font-semibold text-text">
                  Rafael Santos
                </span>
                <span className="text-xs text-primary ml-2">
                  -8 min na meia
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-center"
          >
            <Button size="lg" onClick={handleCTA} className="text-lg px-10 py-5 gap-3">
              QUERO MINHA PLANILHA!
              <ArrowRight size={20} />
            </Button>
            <p className="mt-3 text-xs text-text-muted">
              Acesso imediato após a inscrição
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  reset();
                  router.push(`/${tenantSlug}/quiz`);
                }}
                className="text-sm text-text-muted hover:text-text transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                Refazer questionário
              </button>
              <span className="text-border">|</span>
              <button
                onClick={() => router.push(`/${tenantSlug}`)}
                className="text-sm text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                Voltar ao início
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
