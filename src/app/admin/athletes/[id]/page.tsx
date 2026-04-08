"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Activity,
  Target,
  ShoppingBag,
} from "lucide-react";
import { useAdminAthleteDetail } from "@/services/admin.service";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  onboarding: "bg-yellow-500/15 text-yellow-400",
  assessment_pending: "bg-orange-500/15 text-orange-400",
  plan_generating: "bg-blue-500/15 text-blue-400",
  active: "bg-primary-dim text-primary",
  churned: "bg-red-500/15 text-red-400",
};

const statusLabels: Record<string, string> = {
  onboarding: "Onboarding",
  assessment_pending: "Avaliação Pendente",
  plan_generating: "Gerando Plano",
  active: "Ativo",
  churned: "Churned",
};

function SectionSkeleton() {
  return (
    <div className="bg-surface-high rounded-2xl p-5 border border-border animate-pulse">
      <div className="w-32 h-5 bg-surface rounded mb-4" />
      <div className="space-y-3">
        <div className="w-full h-4 bg-surface rounded" />
        <div className="w-3/4 h-4 bg-surface rounded" />
        <div className="w-1/2 h-4 bg-surface rounded" />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-text-muted">
        {label}
      </span>
      <span className="text-sm font-medium text-text">{value || "—"}</span>
    </div>
  );
}

export default function AthleteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: athlete, isLoading } = useAdminAthleteDetail(id);

  if (isLoading) {
    return (
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-muted hover:text-text text-sm mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SectionSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">Atleta não encontrado.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-primary text-sm hover:underline cursor-pointer"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-text-muted hover:text-text text-sm mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary-dim flex items-center justify-center text-2xl font-bold text-primary font-display">
          {athlete.name?.[0] || "?"}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-text font-display">{athlete.name}</h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span
              className={cn(
                "inline-flex px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                statusColors[athlete.status] || "bg-surface text-text-muted"
              )}
            >
              {statusLabels[athlete.status] || athlete.status}
            </span>
            <span className="text-xs text-text-muted tabular-nums">
              Cadastro em{" "}
              {new Date(athlete.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="bg-surface-high rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Mail size={16} className="text-text-muted" />
            <h2 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
              Informações Pessoais
            </h2>
          </div>
          <div className="divide-y divide-border">
            <InfoRow label="Nome" value={athlete.name} />
            <InfoRow label="Email" value={athlete.email} />
            <InfoRow label="Telefone" value={athlete.phone} />
            <InfoRow
              label="Assinatura"
              value={athlete.subscriptionStatus}
            />
          </div>

          {athlete.quizAnswers && Object.keys(athlete.quizAnswers).length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <h3 className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-3">
                Respostas do Quiz
              </h3>
              <div className="divide-y divide-border">
                {Object.entries(athlete.quizAnswers).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between text-sm py-3"
                  >
                    <span className="text-text-muted capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-text font-medium">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Assessment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-high rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-text-muted" />
            <h2 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
              Avaliação
            </h2>
          </div>
          {athlete.assessment ? (
            <>
              <div className="divide-y divide-border">
                <InfoRow label="Nível" value={athlete.assessment.level} />
                <InfoRow
                  label="Km Semanal"
                  value={
                    athlete.assessment.weeklyMileage
                      ? `${athlete.assessment.weeklyMileage} km`
                      : undefined
                  }
                />
              </div>
              {athlete.assessment.paceZones &&
                athlete.assessment.paceZones.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h3 className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-3">
                      Zonas de Pace
                    </h3>
                    <div className="divide-y divide-border">
                      {athlete.assessment.paceZones.map((zone) => (
                        <div
                          key={zone.zone}
                          className="flex items-center justify-between text-sm py-3"
                        >
                          <span className="text-text-muted">{zone.zone}</span>
                          <span className="text-text font-bold font-display tabular-nums">
                            {zone.minPace} - {zone.maxPace}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </>
          ) : (
            <p className="text-sm text-text-muted">Sem dados de avaliação.</p>
          )}
        </motion.div>

        {/* Training Plan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-surface-high rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} className="text-text-muted" />
            <h2 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
              Plano de Treino
            </h2>
          </div>
          {athlete.trainingPlan ? (
            <div>
              <div className="divide-y divide-border">
                <InfoRow label="Plano" value={athlete.trainingPlan.planName} />
                <InfoRow
                  label="Semana Atual"
                  value={`${athlete.trainingPlan.currentWeek} de ${athlete.trainingPlan.totalWeeks}`}
                />
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-muted">Progresso Semanal</span>
                  <span className="text-primary font-bold font-display tabular-nums">
                    {athlete.trainingPlan.weeklyProgress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500"
                    style={{
                      width: `${athlete.trainingPlan.weeklyProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Nenhum plano de treino ativo.
            </p>
          )}
        </motion.div>

        {/* Purchase History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-high rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={16} className="text-text-muted" />
            <h2 className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
              Histórico de Compras
            </h2>
          </div>
          {athlete.purchaseHistory && athlete.purchaseHistory.length > 0 ? (
            <div className="divide-y divide-border">
              {athlete.purchaseHistory.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm text-text font-medium">
                      {purchase.productName}
                    </p>
                    <p className="text-xs text-text-muted tabular-nums">
                      {new Date(purchase.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text font-bold font-display tabular-nums">
                      R${" "}
                      {purchase.amount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        purchase.status === "paid"
                          ? "text-primary"
                          : purchase.status === "refunded"
                          ? "text-red-400"
                          : "text-text-muted"
                      )}
                    >
                      {purchase.status === "paid"
                        ? "Pago"
                        : purchase.status === "refunded"
                        ? "Reembolsado"
                        : purchase.status === "pending"
                        ? "Pendente"
                        : purchase.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Nenhuma compra registrada.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
