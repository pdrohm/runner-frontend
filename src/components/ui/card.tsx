"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  glowOnHover?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({
  className,
  glowOnHover = false,
  children,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-surface-high rounded-2xl p-5 border border-border transition-all duration-300",
        glowOnHover &&
          "hover:shadow-[0_0_32px_rgba(130,255,153,0.06)] hover:border-primary/10",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
