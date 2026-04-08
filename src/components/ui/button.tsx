"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "pill";
type Size = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children" | "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-primary to-primary-dark text-bg font-bold rounded-xl shadow-[0_0_16px_rgba(130,255,153,0.12)] hover:shadow-[0_0_24px_rgba(130,255,153,0.2)]",
  secondary:
    "bg-transparent border border-border text-text font-semibold rounded-xl hover:border-primary/30 hover:text-primary",
  ghost:
    "bg-transparent text-text-muted font-medium rounded-xl hover:bg-surface-high hover:text-text",
  pill: "bg-surface-high text-text-muted font-medium rounded-full hover:bg-surface-high/80 hover:text-text",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 font-display",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
