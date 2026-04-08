"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminAthletes } from "@/services/admin.service";
import { cn } from "@/lib/utils";

const statuses = [
  { value: "", label: "Todos" },
  { value: "onboarding", label: "Onboarding" },
  { value: "assessment_pending", label: "Avaliação" },
  { value: "plan_generating", label: "Gerando" },
  { value: "active", label: "Ativo" },
  { value: "churned", label: "Churned" },
];

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

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-14 bg-surface-high rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}

export default function AthletesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isLoading } = useAdminAthletes({
    page,
    limit,
    search: search || undefined,
    status: status || undefined,
  });

  const athletes = data?.athletes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-text font-display">Atletas</h1>
        <p className="text-text-muted text-sm mt-1">
          Gerencie todos os atletas da plataforma
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-high border border-border rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => {
                setStatus(s.value);
                setPage(1);
              }}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border",
                status === s.value
                  ? "bg-primary-dim text-primary border-primary/15"
                  : "bg-surface-high text-text-muted border-border hover:text-text"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] text-text-muted uppercase tracking-widest font-semibold">
                  <th className="pb-3 pl-4">Nome</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Plano</th>
                  <th className="pb-3 pr-4">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {athletes.map((athlete, i) => (
                  <tr
                    key={athlete.id}
                    onClick={() => router.push(`/admin/athletes/${athlete.id}`)}
                    className="cursor-pointer transition-colors hover:bg-surface-high/60 border-b border-border"
                  >
                    <td className="py-3.5 pl-4">
                      <span className="text-sm font-medium text-text">
                        {athlete.name}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="text-sm text-text-muted">
                        {athlete.email}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={cn(
                          "inline-flex px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                          statusColors[athlete.status] || "bg-surface text-text-muted"
                        )}
                      >
                        {statusLabels[athlete.status] || athlete.status}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="text-sm text-text-muted">
                        {athlete.plan || "—"}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-sm text-text-muted tabular-nums">
                        {new Date(athlete.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </td>
                  </tr>
                ))}
                {athletes.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-text-muted text-sm"
                    >
                      Nenhum atleta encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {athletes.map((athlete) => (
              <div
                key={athlete.id}
                onClick={() => router.push(`/admin/athletes/${athlete.id}`)}
                className="bg-surface-high rounded-2xl p-4 border border-border cursor-pointer hover:border-primary/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text text-sm">
                    {athlete.name}
                  </span>
                  <span
                    className={cn(
                      "inline-flex px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                      statusColors[athlete.status] || "bg-surface text-text-muted"
                    )}
                  >
                    {statusLabels[athlete.status] || athlete.status}
                  </span>
                </div>
                <p className="text-xs text-text-muted">{athlete.email}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
                  <span>{athlete.plan || "Sem plano"}</span>
                  <span className="tabular-nums">
                    {new Date(athlete.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
            {athletes.length === 0 && (
              <div className="text-center py-12 text-text-muted text-sm">
                Nenhum atleta encontrado.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-text-muted">
                Página {page} de {totalPages} ({data?.total ?? 0} resultados)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-xl bg-surface-high border border-border text-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-xl bg-surface-high border border-border text-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
