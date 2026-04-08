"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, CreditCard, TrendingDown } from "lucide-react";
import { useAdminDashboard } from "@/services/admin.service";

const statCards = [
  {
    key: "totalLeads" as const,
    label: "Total Leads",
    icon: Users,
    format: (v: number) => v.toLocaleString("pt-BR"),
  },
  {
    key: "totalAthletes" as const,
    label: "Total Atletas",
    icon: UserCheck,
    format: (v: number) => v.toLocaleString("pt-BR"),
  },
  {
    key: "activeSubscriptions" as const,
    label: "Assinaturas Ativas",
    icon: CreditCard,
    format: (v: number) => v.toLocaleString("pt-BR"),
  },
  {
    key: "churnRate" as const,
    label: "Taxa de Churn",
    icon: TrendingDown,
    format: (v: number) => `${v.toFixed(1)}%`,
  },
];

function SkeletonCard() {
  return (
    <div className="bg-surface-high rounded-2xl p-5 border border-border animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-surface" />
        <div className="w-16 h-4 rounded bg-surface" />
      </div>
      <div className="w-24 h-8 rounded bg-surface mb-1" />
      <div className="w-20 h-4 rounded bg-surface" />
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading } = useAdminDashboard();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-text font-display">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">
          Visão geral da plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : statCards.map((card, i) => {
              const Icon = card.icon;
              const value = data?.[card.key] ?? 0;
              return (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-surface-high rounded-2xl p-5 border border-border hover:border-primary/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-dim flex items-center justify-center">
                      <Icon size={20} className="text-text-muted" />
                    </div>
                  </div>
                  <p className="text-3xl font-extrabold text-text font-display tabular-nums">
                    {card.format(value)}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{card.label}</p>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
}
