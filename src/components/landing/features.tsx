"use client";

import { motion } from "framer-motion";
import { Brain, Gauge, CalendarCheck, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "Coach que entende seu ritmo",
    label: "METODOLOGIA DO COACH",
    description:
      "O Coach Boto analisa seu histórico, nível e objetivos. Nada de planilhas genéricas — cada treino é pensado para você.",
    highlights: [
      "Análise personalizada",
      "Ajuste de volume pelo coach",
      "Progressão inteligente",
    ],
    gradient: "from-primary/10 to-primary-dark/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Gauge,
    title: "Zonas de pace precisas",
    label: "ALTA PERFORMANCE",
    description:
      "Cálculo preciso das suas zonas de ritmo. Saiba exatamente o pace ideal para cada tipo de treino.",
    highlights: [
      "5 zonas personalizadas",
      "Baseado no seu VDOT",
      "Atualização contínua",
    ],
    gradient: "from-accent-warm/10 to-accent-warm-dark/5",
    iconBg: "bg-accent-warm/10",
    iconColor: "text-accent-warm",
  },
  {
    icon: CalendarCheck,
    title: "Plano semana a semana",
    label: "PLANILHA DETALHADA",
    description:
      "Planilha detalhada com ajustes baseados no seu progresso real. Seu plano evolui junto com você.",
    highlights: [
      "Plano semanal completo",
      "Ajustes por feedback",
      "Periodização completa",
    ],
    gradient: "from-primary/10 to-primary-dark/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: MessageCircle,
    title: "Comunidade que corre junto",
    id: "comunidade",
    label: "COMUNIDADE",
    description:
      "Grupo exclusivo com outros corredores e suporte direto. Tire dúvidas, compartilhe conquistas.",
    highlights: [
      "Grupo exclusivo WhatsApp",
      "Suporte direto",
      "Rede de corredores",
    ],
    gradient: "from-accent-warm/10 to-accent-warm-dark/5",
    iconBg: "bg-accent-warm/10",
    iconColor: "text-accent-warm",
  },
];

export function Features() {
  return (
    <section className="py-24 md:py-36 px-4 md:px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-warm/3 rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
            FERRAMENTAS
          </span>
          <h2 className="text-3xl md:text-[48px] font-extrabold font-display tracking-[-0.04em] leading-[1.05] text-text">
            Tudo para sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              evolução
            </span>
          </h2>
        </motion.div>

        {/* Features grid - 2x2 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                id={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={cn(
                    "relative rounded-3xl p-8 md:p-10 glass overflow-hidden transition-all duration-500",
                    "hover:border-white/10 hover:bg-white/[0.04]"
                  )}
                >
                  {/* Hover gradient glow */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      feature.gradient
                    )}
                  />

                  <div className="relative z-10">
                    {/* Icon + label */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                          feature.iconBg
                        )}
                      >
                        <Icon size={20} className={feature.iconColor} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
                        {feature.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-extrabold font-display tracking-[-0.03em] text-text mb-3 leading-tight">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center text-xs font-medium text-text-muted/80 bg-white/[0.03] rounded-full px-3 py-1.5 border border-white/[0.04]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
