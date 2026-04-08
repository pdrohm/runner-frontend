"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubmitGoal } from "@/services/athlete.service";
import { cn } from "@/lib/utils";

const distances = [
  {
    value: "5km",
    label: "5km",
    description: "Ideal para quem está começando",
    emoji: "🏃",
  },
  {
    value: "10km",
    label: "10km",
    description: "O próximo passo natural",
    emoji: "🏃‍♂️",
  },
  {
    value: "21km",
    label: "Meia Maratona",
    description: "21.1km de desafio",
    emoji: "🏅",
  },
  {
    value: "42km",
    label: "Maratona",
    description: "42.2km - o desafio máximo",
    emoji: "🏆",
  },
];

export default function GoalPage() {
  const router = useRouter();
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  const [targetTime, setTargetTime] = useState("");
  const submitGoal = useSubmitGoal();

  async function handleSubmit() {
    if (!selectedDistance) return;

    try {
      await submitGoal.mutateAsync({
        distance: selectedDistance,
        targetTime: targetTime.trim() || undefined,
      });
      router.push("/app/generating");
    } catch {
      // Error handled by mutation state
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg space-y-6"
      >
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary-dim flex items-center justify-center mx-auto mb-4">
            <Target className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-text font-display">
            Qual seu objetivo?
          </h1>
          <p className="text-text-muted text-sm mt-2">
            Escolha a distância da sua prova
          </p>
        </div>

        {/* Distance Cards — single column on mobile for easy tapping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-3"
        >
          {distances.map((distance, i) => (
            <motion.div
              key={distance.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <button
                onClick={() => setSelectedDistance(distance.value)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2",
                  selectedDistance === distance.value
                    ? "border-primary bg-primary/[0.04] shadow-[0_0_24px_rgba(130,255,153,0.08)]"
                    : "border-border bg-surface-high hover:border-border hover:bg-surface-high/80"
                )}
              >
                <span className="text-2xl flex-shrink-0">{distance.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text text-base font-display">
                    {distance.label}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {distance.description}
                  </p>
                </div>
                {selectedDistance === distance.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Target Time (Optional) */}
        {selectedDistance && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Tempo alvo (opcional)
              </label>
              <input
                type="text"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                placeholder="Ex: 25:00, 1:45:00"
                className="w-full bg-surface-high border border-border rounded-xl px-4 py-3.5 text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-colors"
              />
              <p className="text-xs text-text-muted">
                Se não souber, sem problema. Vamos focar em completar a
                distância.
              </p>
            </div>
          </motion.div>
        )}

        {submitGoal.isError && (
          <p className="text-red-400 text-sm text-center">
            Erro ao salvar objetivo. Tente novamente.
          </p>
        )}

        {/* Submit */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit}
          disabled={!selectedDistance || submitGoal.isPending}
        >
          {submitGoal.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Gerar minha planilha
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
