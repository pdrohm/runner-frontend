"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  titleClassName?: string;
}

export function Section({
  id,
  title,
  subtitle,
  className,
  children,
  titleClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 px-4 md:px-6", className)}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            {title && (
              <h2
                className={cn(
                  "text-3xl md:text-[40px] font-extrabold tracking-[-0.04em] leading-tight text-text",
                  titleClassName
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-text-muted max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
