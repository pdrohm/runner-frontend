"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Timer, ArrowRight, Loader2, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubmitAssessment } from "@/services/athlete.service";

export default function AssessmentPage() {
  const router = useRouter();
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [result, setResult] = useState<{
    level: string;
    vdot: number;
    zones: { zone: number; name: string; pace: string }[];
  } | null>(null);

  const submitAssessment = useSubmitAssessment();

  const levelLabels: Record<string, string> = {
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
    elite: "Elite",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    const totalSeconds = mins * 60 + secs;

    if (totalSeconds <= 0) return;

    try {
      const data = await submitAssessment.mutateAsync({
        timeSeconds: totalSeconds,
      });
      setResult(data);
    } catch {
      // Error is handled by mutation state
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
            <Timer className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-text font-display">Teste de 3km</h1>
          <p className="text-text-muted text-sm mt-2">
            Insira o tempo que você completou os 3km
          </p>
        </div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
                    Tempo do teste
                  </label>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        placeholder="00"
                        className="w-24 h-20 bg-surface border border-border rounded-2xl text-center text-3xl font-extrabold font-display text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-colors tabular-nums"
                      />
                      <p className="text-[10px] text-text-muted mt-2 uppercase tracking-wider font-medium">minutos</p>
                    </div>
                    <span className="text-3xl font-extrabold text-text-muted mb-6 font-display">
                      :
                    </span>
                    <div className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        placeholder="00"
                        className="w-24 h-20 bg-surface border border-border rounded-2xl text-center text-3xl font-extrabold font-display text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-colors tabular-nums"
                      />
                      <p className="text-[10px] text-text-muted mt-2 uppercase tracking-wider font-medium">segundos</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-4">
                  <p className="text-xs text-text-muted leading-relaxed">
                    O teste de 3km mede seu nível aeróbico atual. Com base no
                    seu tempo, calculamos seu VDOT (indice de performance) e
                    suas zonas de pace personalizadas.
                  </p>
                </div>

                {submitAssessment.isError && (
                  <p className="text-red-400 text-sm text-center">
                    Erro ao enviar. Tente novamente.
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={
                    submitAssessment.isPending ||
                    (!minutes && !seconds)
                  }
                >
                  {submitAssessment.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Enviar resultado
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="text-center py-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3">
                Seu nível
              </p>
              <p className="text-lg font-bold text-text font-display">
                {levelLabels[result.level] || result.level}
              </p>
              <p className="text-5xl font-extrabold text-primary font-display mt-2 tabular-nums">
                {result.vdot}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mt-1">
                VDOT
              </p>
              <p className="text-sm text-text-muted mt-3">
                Tempo: {minutes}:{seconds.padStart(2, "0")}
              </p>
            </div>

            {result.zones && result.zones.length > 0 && (
              <Card>
                <h3 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
                  Suas zonas de pace
                </h3>
                <div className="space-y-2">
                  {result.zones.map((zone) => (
                    <div
                      key={zone.zone}
                      className="flex items-center justify-between py-3 px-3 rounded-xl bg-surface"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold bg-primary-dim text-primary w-7 h-7 rounded-lg flex items-center justify-center font-display">
                          Z{zone.zone}
                        </span>
                        <span className="text-sm font-medium text-text">
                          {zone.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-text font-display tabular-nums">
                        {zone.pace}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={() => router.push("/app/goal")}
            >
              Escolher objetivo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
