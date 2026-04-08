"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function EmotionalStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-44 px-4 md:px-6 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-[200px]" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <p className="text-2xl sm:text-3xl md:text-[44px] lg:text-[52px] font-extrabold font-display tracking-[-0.04em] leading-[1.1] text-text/90">
          Das manhãs silenciosas no asfalto
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-muted via-text to-text-muted">
            ao rugido do dia da prova.
          </span>
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-10 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Cada corrida conta uma história. Sua planilha deveria contar a sua.
        </motion.p>
      </motion.div>
    </section>
  );
}
