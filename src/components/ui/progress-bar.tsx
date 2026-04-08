"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  highlight?: boolean;
}

export function ProgressBar({ value, className, highlight = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-1.5 w-full rounded-full bg-surface-high overflow-hidden",
        className
      )}
    >
      <motion.div
        className={cn(
          "h-full rounded-full",
          highlight
            ? "bg-gradient-to-r from-primary to-primary-dark"
            : "bg-text-muted/40"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
