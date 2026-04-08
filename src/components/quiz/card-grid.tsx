"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizOption } from "@/types/quiz";

interface CardGridProps {
  options: QuizOption[];
  onSelect: (value: string | string[]) => void;
  selectedValue?: string | string[];
  multiSelect?: boolean;
}

export function CardGrid({
  options,
  onSelect,
  selectedValue,
  multiSelect = false,
}: CardGridProps) {
  const isSelected = (value: string) => {
    if (!selectedValue) return false;
    if (Array.isArray(selectedValue)) return selectedValue.includes(value);
    return selectedValue === value;
  };

  const handleClick = (value: string) => {
    if (multiSelect) {
      const current = Array.isArray(selectedValue) ? selectedValue : [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onSelect(updated);
    } else {
      onSelect(value);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {options.map((option, index) => {
        const selected = isSelected(option.value);

        return (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            onClick={() => handleClick(option.value)}
            className={cn(
              "relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border-2",
              selected
                ? "bg-primary/[0.04] border-primary"
                : "bg-surface-high border-border hover:border-border hover:bg-surface-high/80"
            )}
          >
            {/* Emoji icon */}
            {option.icon && (
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "text-base font-semibold block",
                  selected ? "text-primary" : "text-text"
                )}
              >
                {option.label}
              </span>
              {option.description && (
                <span className="text-sm text-text-muted mt-0.5 block">
                  {option.description}
                </span>
              )}
            </div>

            {/* Checkmark */}
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <Check size={14} className="text-bg" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
