"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Loader2,
  AlertCircle,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useFullPlan } from "@/services/training.service";
import { cn } from "@/lib/utils";
import type { TrainingWeek } from "@/types/training";

const phaseLabels: Record<string, string> = {
  base: "Base",
  build: "Construção",
  peak: "Pico",
  taper: "Polimento",
  recovery: "Recuperação",
};

const phaseColors: Record<string, string> = {
  base: "bg-blue-500/15 text-blue-400",
  build: "bg-orange-500/15 text-orange-400",
  peak: "bg-red-500/15 text-red-400",
  taper: "bg-purple-500/15 text-purple-400",
  recovery: "bg-emerald-500/15 text-emerald-400",
};

function WeekAccordion({
  week,
  isCurrent,
}: {
  week: TrainingWeek;
  isCurrent: boolean;
}) {
  const [isOpen, setIsOpen] = useState(isCurrent);

  const completedCount = week.sessions.filter((s) => s.completed).length;
  const completionPct =
    week.sessions.length > 0
      ? Math.round((completedCount / week.sessions.length) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card
        className={cn(
          "overflow-hidden transition-all",
          isCurrent && "border-primary/15"
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-left cursor-pointer"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-bold text-text font-display">Semana {week.weekNumber}</h3>
              <Badge
                variant="phase"
                className={phaseColors[week.phase] || "bg-surface text-text-muted"}
              >
                {phaseLabels[week.phase] || week.phase}
                {isCurrent && " · Atual"}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>{week.totalDistance.toFixed(1)} km</span>
              <span className="text-text-tertiary">·</span>
              <span>{week.sessions.length} sessões</span>
              <span className="text-text-tertiary">·</span>
              <span>
                {completedCount}/{week.sessions.length} feitas
              </span>
            </div>
            <div className="mt-2.5">
              <ProgressBar value={completionPct} highlight={isCurrent || completionPct === 100} />
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-text-muted transition-transform ml-4 flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border space-y-0.5">
                {week.sessions.map((session, i) => (
                  <div
                    key={session.id || i}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                      session.completed && "opacity-50"
                    )}
                  >
                    {session.completed ? (
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-border flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          session.completed
                            ? "text-text-muted line-through"
                            : "text-text"
                        )}
                      >
                        {session.title || session.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted flex-shrink-0">
                      {session.targetDuration && (
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {session.targetDuration}min
                        </span>
                      )}
                      {session.targetDistance && (
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          {session.targetDistance}km
                        </span>
                      )}
                      {session.targetPaceZone && (
                        <span className="font-semibold text-text">
                          Z{session.targetPaceZone}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export default function PlanPage() {
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
          Não foi possível carregar sua planilha.
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

  const today = new Date();
  const startDate = new Date(plan.startDate);
  const diffMs = today.getTime() - startDate.getTime();
  const currentWeekNumber = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-extrabold text-text font-display">{plan.name}</h1>
        <p className="text-text-muted text-sm mt-1">
          {plan.totalWeeks} semanas · {plan.description}
        </p>
      </motion.div>

      <div className="space-y-3">
        {plan.weeks.map((week, i) => (
          <motion.div
            key={week.weekNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
          >
            <WeekAccordion
              week={week}
              isCurrent={week.weekNumber === currentWeekNumber}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
