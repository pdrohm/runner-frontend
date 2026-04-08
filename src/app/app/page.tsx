"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  CheckCircle,
  ChevronRight,
  Clock,
  MapPin,
  Gauge,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCurrentWeek } from "@/services/training.service";
import { useMarkSessionComplete } from "@/services/training.service";
import { cn } from "@/lib/utils";
import type { TrainingSession } from "@/types/training";

const phaseLabels: Record<string, string> = {
  base: "Base",
  build: "Construção",
  peak: "Pico",
  taper: "Polimento",
  recovery: "Recuperação",
};

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

const typeAccentColors: Record<string, string> = {
  easy: "bg-emerald-500",
  tempo: "bg-amber-500",
  interval: "bg-red-500",
  long: "bg-blue-500",
  recovery: "bg-teal-400",
  "race-pace": "bg-orange-500",
  hills: "bg-yellow-500",
  fartlek: "bg-purple-500",
  "cross-training": "bg-cyan-500",
  rest: "bg-text-tertiary",
};

const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function formatDuration(minutes?: number): string {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${m}min` : `${h}h`;
}

function formatDistance(km?: number): string {
  if (!km) return "";
  return `${km.toFixed(1)}km`;
}

export default function DashboardPage() {
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
        <p className="text-text-muted">
          Não foi possível carregar seus treinos.
        </p>
        <Button onClick={() => window.location.reload()} variant="secondary" size="sm">
          Tentar novamente
        </Button>
      </div>
    );
  }

  const completedCount = week.sessions.filter((s) => s.completed).length;
  const totalKm = week.sessions.reduce(
    (acc, s) => acc + (s.targetDistance || 0),
    0
  );
  const completionPct =
    week.sessions.length > 0
      ? Math.round((completedCount / week.sessions.length) * 100)
      : 0;
  const todayIndex = new Date().getDay();
  const todaySession = week.sessions.find(
    (s) => s.dayOfWeek === todayIndex && !s.completed
  );
  const todaySessionIndex = todaySession
    ? week.sessions.indexOf(todaySession)
    : -1;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Week Header + Stat Strip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-text font-display">
            Semana {week.weekNumber}
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {phaseLabels[week.phase] || week.phase}
          </p>
        </div>

        {/* Stat Strip — no card, just numbers */}
        <div className="flex items-baseline gap-6">
          <div>
            <span className="text-3xl font-extrabold text-text font-display tabular-nums">
              {totalKm.toFixed(1)}
            </span>
            <span className="text-xs text-text-muted ml-1.5">km</span>
          </div>
          <div className="w-px h-5 bg-border" />
          <div>
            <span className="text-3xl font-extrabold text-text font-display tabular-nums">
              {completedCount}
            </span>
            <span className="text-xs text-text-muted">/{week.sessions.length} sessões</span>
          </div>
          <div className="w-px h-5 bg-border" />
          <div>
            <span className="text-3xl font-extrabold text-text font-display tabular-nums">
              {completionPct}
            </span>
            <span className="text-xs text-text-muted ml-0.5">%</span>
          </div>
        </div>
      </motion.div>

      {/* Today's CTA */}
      {todaySession && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">
            Treino de hoje
          </p>
          <Card className="border-primary/15 bg-primary/[0.03]">
            <div className="flex items-center gap-4">
              <div className={cn("w-1 self-stretch rounded-full flex-shrink-0", typeAccentColors[todaySession.type] || "bg-primary")} />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-text text-base">
                  {todaySession.title ||
                    typeLabels[todaySession.type] ||
                    todaySession.type}
                </h3>
                <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                  {todaySession.targetDuration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(todaySession.targetDuration)}
                    </span>
                  )}
                  {todaySession.targetDistance && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {formatDistance(todaySession.targetDistance)}
                    </span>
                  )}
                  {todaySession.targetPaceZone && (
                    <span className="font-semibold text-text">
                      Z{todaySession.targetPaceZone}
                    </span>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                onClick={() =>
                  markComplete.mutate({
                    weekNumber: week.weekNumber,
                    sessionIndex: todaySessionIndex,
                  })
                }
                disabled={markComplete.isPending}
              >
                {markComplete.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Concluir
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Sessions List — single card, compact rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-3">
          Esta semana
        </p>
        <Card className="p-0 overflow-hidden">
          {week.sessions.map((session, index) => {
            const isToday = session.dayOfWeek === todayIndex && !session.completed;

            return (
              <Link
                key={session.id}
                href={`/app/session/${week.weekNumber}/${index}`}
                className={cn(
                  "flex items-center gap-3 px-5 py-4 transition-colors hover:bg-surface-high/50",
                  index < week.sessions.length - 1 && "border-b border-border",
                  session.completed && "opacity-50",
                  session.type === "rest" && "opacity-40"
                )}
              >
                {/* Accent dot */}
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full flex-shrink-0",
                  session.completed ? "bg-primary" : typeAccentColors[session.type] || "bg-text-muted"
                )} />

                {/* Day */}
                <span className="text-xs font-medium text-text-muted w-8 flex-shrink-0">
                  {dayNames[session.dayOfWeek]}
                </span>

                {/* Title */}
                <span className={cn(
                  "flex-1 text-sm font-medium truncate",
                  session.completed ? "text-text-muted line-through" : "text-text"
                )}>
                  {session.title || typeLabels[session.type] || session.type}
                </span>

                {/* Metadata */}
                <div className="flex items-center gap-2.5 text-xs text-text-muted flex-shrink-0">
                  {session.targetDuration && (
                    <span>{formatDuration(session.targetDuration)}</span>
                  )}
                  {session.targetDistance && (
                    <span>{formatDistance(session.targetDistance)}</span>
                  )}
                  {session.targetPaceZone && (
                    <span className="font-semibold text-text">Z{session.targetPaceZone}</span>
                  )}
                </div>

                {/* Status */}
                {session.completed ? (
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </Card>
      </motion.div>
    </div>
  );
}
