"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Brain, FileText, MessageCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Responda o Quiz",
    description: "Seu nível, objetivo e rotina em 2 minutos.",
  },
  {
    number: "02",
    icon: Brain,
    title: "IA Cria seu Plano",
    description: "Planilha personalizada gerada na hora.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Receba sua Planilha",
    description: "Zonas de pace e detalhamento semanal.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Treine com Suporte",
    description: "Comunidade WhatsApp e acompanhamento.",
  },
  {
    number: "05",
    icon: Trophy,
    title: "Bata seu Recorde",
    description: "Ajustes contínuos rumo ao seu melhor.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 md:py-36 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-accent-warm uppercase tracking-[0.2em] mb-4">
            PROCESSO
          </span>
          <h2 className="text-3xl md:text-[48px] font-extrabold font-display tracking-[-0.04em] leading-[1.05] text-text">
            Do quiz ao{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-warm to-accent-warm-dark">
              pódio
            </span>
          </h2>
        </motion.div>

        {/* Steps - horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative"
              >
                <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.04] transition-all duration-300">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-extrabold font-display text-white/[0.06] group-hover:text-primary/20 transition-colors">
                      {step.number}
                    </span>
                    <Icon
                      size={18}
                      className="text-text-muted/40 group-hover:text-primary transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector - desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
