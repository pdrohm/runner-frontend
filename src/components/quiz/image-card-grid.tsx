"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizOption } from "@/types/quiz";

interface ImageCardGridProps {
  options: (QuizOption & { imageUrl?: string })[];
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export function ImageCardGrid({
  options,
  onSelect,
  selectedValue,
}: ImageCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => {
        const selected = selectedValue === option.value;

        return (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            onClick={() => onSelect(option.value)}
            className={cn(
              "relative overflow-hidden rounded-2xl aspect-[16/10] text-left transition-all duration-200 cursor-pointer group",
              selected
                ? "border-2 border-primary shadow-[0_0_24px_rgba(130,255,153,0.12)]"
                : "border-2 border-transparent"
            )}
          >
            {/* Background image / placeholder */}
            <div className="absolute inset-0 bg-surface-high">
              {option.imageUrl ? (
                <img
                  src={option.imageUrl}
                  alt={option.label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-surface-high to-surface" />
              )}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-lg font-bold text-text block">
                {option.label}
              </span>
              {option.description && (
                <span className="text-sm text-text-muted mt-1 block">
                  {option.description}
                </span>
              )}
            </div>

            {/* Selected checkmark */}
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
              >
                <Check size={18} className="text-bg" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
