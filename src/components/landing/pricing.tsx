"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const plans = [
  {
    name: "Mensal",
    price: 80,
    originalPrice: null,
    interval: "mês",
    highlighted: false,
    badge: null,
    totalLabel: null,
    features: [
      "Planilha personalizada pelo Coach Boto",
      "Zonas de pace calculadas",
      "Plano semanal detalhado",
      "Acesso à comunidade WhatsApp",
      "Suporte por mensagem",
    ],
  },
  {
    name: "Trimestral",
    price: 70,
    originalPrice: 80,
    interval: "mês",
    highlighted: true,
    badge: "MAIS ESCOLHIDO",
    totalLabel: "R$210 a cada 3 meses",
    features: [
      "Tudo do plano Mensal",
      "Ajustes mensais na planilha",
      "Relatório de evolução",
      "Prioridade no suporte",
      "Desconto de 12%",
    ],
  },
  {
    name: "Semestral",
    price: 60,
    originalPrice: 80,
    interval: "mês",
    highlighted: false,
    badge: "MAIS ECONOMIA",
    totalLabel: "R$360 a cada 6 meses",
    features: [
      "Tudo do plano Trimestral",
      "Ajustes quinzenais na planilha",
      "Análise de performance avançada",
      "Consultoria de prova",
      "Desconto de 25%",
    ],
  },
];

interface PricingProps {
  quizUrl: string;
}

export function Pricing({ quizUrl }: PricingProps) {
  return (
    <section id="planos" className="py-24 md:py-36 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[250px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
            INVESTIMENTO
          </span>
          <h2 className="text-3xl md:text-[48px] font-extrabold font-display tracking-[-0.04em] leading-[1.05] text-text">
            Escolha seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              plano
            </span>
          </h2>
          <p className="mt-4 text-base text-text-muted">
            Cancele quando quiser. Sem burocracia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative rounded-3xl p-6 md:p-8 flex flex-col transition-all duration-300",
                plan.highlighted
                  ? "glass-strong md:scale-105 md:-my-4 border-primary/20"
                  : "glass hover:bg-white/[0.04]"
              )}
            >
              {/* Highlighted glow */}
              {plan.highlighted && (
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none" />
              )}

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary-dark text-bg text-[10px] font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(130,255,153,0.2)]">
                    <Sparkles size={10} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="relative mb-6">
                <h3 className="text-lg font-bold text-text mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider self-start mt-2">
                    R$
                  </span>
                  <span className="text-5xl font-extrabold font-display text-text tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-text-muted">/{plan.interval}</span>
                </div>
                {plan.originalPrice && (
                  <div className="mt-1">
                    <span className="text-sm text-text-muted line-through">
                      R${plan.originalPrice}/mês
                    </span>
                  </div>
                )}
                {plan.totalLabel && (
                  <p className="text-xs text-text-muted mt-1">{plan.totalLabel}</p>
                )}
              </div>

              <ul className="relative space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className={cn(
                        "flex-shrink-0 mt-0.5",
                        plan.highlighted ? "text-primary" : "text-text-muted/90"
                      )}
                    />
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={quizUrl}
                className={cn(
                  "relative inline-flex items-center justify-center w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300",
                  plan.highlighted
                    ? "bg-gradient-to-br from-primary to-primary-dark text-bg cta-glow hover:scale-[1.02]"
                    : "glass text-text hover:text-primary hover:border-primary/20"
                )}
              >
                COMEÇAR AGORA
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
