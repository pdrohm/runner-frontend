"use client";

import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useFullPlan } from "@/services/training.service";
import { cn } from "@/lib/utils";

export default function ProgressPage() {
  const { data: plan, isLoading, error } = useFullPlan();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-10 h-10 text-text-muted" />
        <p className="text-text-muted">
          Não foi possível carregar seu progresso.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="secondary"
          size="sm"
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  const allSessions = plan.weeks.flatMap((w) => w.sessions);
  const completedSessions = allSessions.filter((s) => s.completed);
  const totalKm = completedSessions.reduce(
    (acc, s) => acc + (s.actualDistance || s.targetDistance || 0),
    0
  );

  // Calculate streak
  let streak = 0;
  const sortedCompleted = [...completedSessions]
    .filter((s) => s.completedAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() -
        new Date(a.completedAt!).getTime()
    );

  if (sortedCompleted.length > 0) {
    streak = 1;
    for (let i = 1; i < sortedCompleted.length; i++) {
      const curr = new Date(sortedCompleted[i - 1].completedAt!);
      const prev = new Date(sortedCompleted[i].completedAt!);
      const diffDays = Math.round(
        (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays <= 3) {
        streak++;
      } else {
        break;
      }
    }
  }

  // Determine current week
  const today = new Date();
  const startDate = new Date(plan.startDate);
  const diffMs = today.getTime() - startDate.getTime();
  const currentWeekNumber = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;

  const overallPct =
    allSessions.length > 0
      ? Math.round((completedSessions.length / allSessions.length) * 100)
      : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-extrabold text-text font-display">Progresso</h1>
        <p className="text-text-muted text-sm mt-1">
          Acompanhe sua evolução
        </p>
      </motion.div>

      {/* Hero Stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center py-6"
      >
        <p className="text-5xl font-extrabold font-display text-text tracking-tight tabular-nums">
          {totalKm.toFixed(1)}
        </p>
        <p className="text-[10px] text-text-muted mt-2 uppercase tracking-widest font-semibold">
          km corridos
        </p>

        {/* Secondary stats inline */}
        <div className="flex items-center justify-center gap-4 mt-5 text-sm text-text-muted">
          <span>
            <span className="font-bold text-text font-display">{completedSessions.length}</span> sessões
          </span>
          <span className="text-text-tertiary">·</span>
          <span>
            <span className="font-bold text-text font-display">{streak}</span> sequência
          </span>
          <span className="text-text-tertiary">·</span>
          <span>
            <span className="font-bold text-text font-display">{overallPct}%</span> total
          </span>
        </div>
      </motion.div>

      {/* Weekly Completion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
          Semana a semana
        </p>
        <div className="space-y-3">
          {plan.weeks.map((week, i) => {
            const weekCompleted = week.sessions.filter(
              (s) => s.completed
            ).length;
            const weekPct =
              week.sessions.length > 0
                ? Math.round((weekCompleted / week.sessions.length) * 100)
                : 0;
            const isCurrent = week.weekNumber === currentWeekNumber;
            const isFuture = week.weekNumber > currentWeekNumber;

            return (
              <motion.div
                key={week.weekNumber}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.02 }}
                className={cn(
                  "flex items-center gap-3",
                  isFuture && "opacity-30"
                )}
              >
                <span className={cn(
                  "text-xs font-medium w-8 flex-shrink-0 tabular-nums",
                  isCurrent ? "text-primary font-bold" : "text-text-muted"
                )}>
                  S{week.weekNumber}
                </span>
                <div className="flex-1">
                  <ProgressBar
                    value={weekPct}
                    highlight={isCurrent || weekPct === 100}
                  />
                </div>
                <span className={cn(
                  "text-xs w-10 text-right tabular-nums flex-shrink-0",
                  isCurrent ? "text-primary font-semibold" : "text-text-muted"
                )}>
                  {isFuture ? "—" : `${weekPct}%`}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
