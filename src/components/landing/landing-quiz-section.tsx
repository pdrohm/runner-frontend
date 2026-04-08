"use client";

import { motion } from "framer-motion";
import { QuizFlow } from "@/components/quiz/quiz-flow";

interface LandingQuizSectionProps {
  tenantSlug: string;
}

export function LandingQuizSection({ tenantSlug }: LandingQuizSectionProps) {
  return (
    <section id="quiz" className="py-20 md:py-28 px-4 md:px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-[40px] font-extrabold tracking-[-0.04em] leading-tight text-text">
            Monte sua Planilha
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            Responda algumas perguntas rapidas e receba um plano feito sob medida
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <QuizFlow tenantSlug={tenantSlug} embedded />
        </div>
      </div>
    </section>
  );
}
