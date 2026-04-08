"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Gauge,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrentWeek, useMarkSessionComplete } from "@/services/training.service";

const typeLabels: Record<string, string> = {
  easy: "Rodagem leve",
  tempo: "Tempo",
  interval: "Intervalado",
  long: "Longão",
  recovery: "Recuperação",
  "race-pace": "Ritmo de prova",
  hills: "Subidas",
  fartlek: "Fartlek",
  "cross-training": "Cross-training",
  rest: "Descanso",
};

function formatDuration(minutes?: number): string {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function formatDistance(km?: number): string {
  if (!km) return "";
  return `${km.toFixed(1)} km`;
}

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [notes, setNotes] = useState("");

  const weekNumber = Number(params.weekNumber);
  const sessionIndex = Number(params.sessionIndex);

  const { data: week, isLoading, error } = useCurrentWeek();
  const markComplete = useMarkSessionComplete();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !week) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-10 h-10 text-text-muted" />
        <p className="text-text-muted">Sessão não encontrada.</p>
        <Button onClick={() => router.push("/app")} variant="secondary" size="sm">
          Voltar ao dashboard
        </Button>
      </div>
    );
  }

  const session = week.sessions[sessionIndex];

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-10 h-10 text-text-muted" />
        <p className="text-text-muted">Sessão não encontrada.</p>
        <Button onClick={() => router.push("/app")} variant="secondary" size="sm">
          Voltar ao dashboard
        </Button>
      </div>
    );
  }

  async function handleComplete() {
    await markComplete.mutateAsync({
      weekNumber,
      sessionIndex,
      notes: notes.trim() || undefined,
    });
    router.push("/app");
  }

  const metaParts = [
    session.targetPaceZone && `Z${session.targetPaceZone}`,
    session.targetDuration && formatDuration(session.targetDuration),
    session.targetDistance && formatDistance(session.targetDistance),
  ].filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.push("/app")}
        className="flex items-center gap-2 text-text-muted hover:text-text transition-colors cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Voltar</span>
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
            {typeLabels[session.type] || session.type}
          </span>
          {session.completed && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
              <CheckCircle className="w-3 h-3" />
              Concluído
            </span>
          )}
        </div>
        <h1 className="text-2xl font-extrabold text-text font-display">
          {session.title || typeLabels[session.type] || session.type}
        </h1>
        {metaParts.length > 0 && (
          <p className="text-sm text-text-muted mt-1.5">
            {metaParts.join(" · ")}
          </p>
        )}
      </motion.div>

      <div className="space-y-8">
        {/* Description */}
        {session.description && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">
              {session.description}
            </p>
          </motion.div>
        )}

        {/* Warmup */}
        {session.warmup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2">
              Aquecimento
            </h2>
            <p className="text-sm text-text">
              {session.warmup.description}
            </p>
            {session.warmup.duration && (
              <p className="text-xs text-text-muted mt-1">
                {formatDuration(session.warmup.duration)}
              </p>
            )}
          </motion.div>
        )}

        {/* Main Set */}
        {session.mainSet && session.mainSet.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3">
              Série principal
            </h2>
            <Card className="p-0 overflow-hidden">
              {session.mainSet.map((set, i) => (
                <div
                  key={i}
                  className={
                    i < session.mainSet!.length - 1
                      ? "px-5 py-4 border-b border-border"
                      : "px-5 py-4"
                  }
                >
                  <p className="text-sm text-text font-medium">
                    {set.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                    {set.repeats && <span>{set.repeats}x</span>}
                    {set.distance && <span>{set.distance}m</span>}
                    {set.duration && (
                      <span>{formatDuration(set.duration)}</span>
                    )}
                    {set.restDuration && (
                      <span>Descanso: {set.restDuration}s</span>
                    )}
                    {set.paceZone && (
                      <span className="font-semibold text-text">
                        Z{set.paceZone}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
        )}

        {/* Cooldown */}
        {session.cooldown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2">
              Volta à calma
            </h2>
            <p className="text-sm text-text">
              {session.cooldown.description}
            </p>
          </motion.div>
        )}

        {/* Notes & Complete */}
        {!session.completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="space-y-4 pb-24 lg:pb-0"
          >
            <div className="border-t border-border pt-6">
              <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3">
                Observações
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Como foi o treino? Alguma observação..."
                rows={3}
                className="w-full bg-surface-high border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
              />
            </div>

            {/* Sticky CTA on mobile */}
            <div className="fixed bottom-24 left-0 right-0 px-5 lg:static lg:px-0 z-20">
              <Button
                className="w-full"
                size="lg"
                onClick={handleComplete}
                disabled={markComplete.isPending}
              >
                {markComplete.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Marcar como concluído
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Already completed feedback */}
        {session.completed && session.athleteFeedback && (
          <div className="border-t border-border pt-6">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2">
              Suas observações
            </h2>
            <p className="text-sm text-text-muted">{session.athleteFeedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
