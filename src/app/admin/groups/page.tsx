"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, X, MessageCircle, Users } from "lucide-react";
import {
  useAdminGroups,
  useCreateGroup,
  useUpdateGroup,
  type WhatsAppGroup,
  type CreateGroupPayload,
} from "@/services/admin.service";
import { cn } from "@/lib/utils";

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-14 bg-surface-high rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}

interface GroupFormProps {
  group?: WhatsAppGroup | null;
  onClose: () => void;
}

function GroupForm({ group, onClose }: GroupFormProps) {
  const createMutation = useCreateGroup();
  const updateMutation = useUpdateGroup();
  const isEditing = !!group;

  const [name, setName] = useState(group?.name ?? "");
  const [cohort, setCohort] = useState(group?.cohort ?? "");
  const [maxSize, setMaxSize] = useState(group?.maxSize?.toString() ?? "256");
  const [active, setActive] = useState(group?.active ?? true);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateGroupPayload = {
      name,
      cohort,
      maxSize: parseInt(maxSize, 10),
      active,
    };

    if (isEditing && group) {
      await updateMutation.mutateAsync({ id: group.id, ...payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface rounded-2xl border border-border w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-text">
            {isEditing ? "Editar Grupo" : "Novo Grupo"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-high text-text-muted hover:text-text transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
              Nome do Grupo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-high rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="Ex: Turma Janeiro 2026"
            />
          </div>

          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
              Cohort
            </label>
            <input
              type="text"
              required
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-high rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="Ex: 2026-01"
            />
          </div>

          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
              Tamanho Máximo
            </label>
            <input
              type="number"
              required
              min="1"
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-high rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="256"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActive(!active)}
              className={cn(
                "w-10 h-6 rounded-full transition-colors relative",
                active ? "bg-primary" : "bg-surface-high"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-text transition-transform",
                  active ? "left-5" : "left-1"
                )}
              />
            </button>
            <span className="text-sm text-text-muted">
              {active ? "Ativo" : "Inativo"}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-surface-high rounded-xl text-sm font-medium text-text-muted hover:text-text transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-sm font-bold text-bg disabled:opacity-60 transition-all"
            >
              {isSubmitting ? "Salvando..." : isEditing ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function GroupsPage() {
  const { data: groups, isLoading } = useAdminGroups();
  const updateMutation = useUpdateGroup();
  const [formOpen, setFormOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<WhatsAppGroup | null>(null);

  const handleToggleActive = (group: WhatsAppGroup) => {
    updateMutation.mutate({ id: group.id, active: !group.active });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-text font-display">Grupos WhatsApp</h1>
          <p className="text-text-muted text-sm mt-1">
            Gerencie os grupos de comunicação
          </p>
        </div>
        <button
          onClick={() => {
            setEditingGroup(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-sm font-bold text-bg hover:shadow-[0_0_24px_rgba(130,255,153,0.15)] transition-all"
        >
          <Plus size={16} />
          Novo Grupo
        </button>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-text-muted uppercase tracking-wider">
                  <th className="pb-3 pl-4 font-medium">Nome</th>
                  <th className="pb-3 font-medium">Cohort</th>
                  <th className="pb-3 font-medium">Membros</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {(groups ?? []).map((group, i) => (
                  <tr
                    key={group.id}
                    className={cn(
                      "transition-colors",
                      i % 2 === 0 ? "bg-surface" : "bg-surface"
                    )}
                  >
                    <td className="py-3.5 pl-4 rounded-l-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-dim flex items-center justify-center">
                          <MessageCircle size={14} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium text-text">
                          {group.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="text-sm text-text-muted">
                        {group.cohort}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-text-muted" />
                        <span className="text-sm text-text">
                          {group.currentSize}
                        </span>
                        <span className="text-sm text-text-muted">
                          / {group.maxSize}
                        </span>
                      </div>
                      <div className="w-20 h-1.5 bg-surface rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (group.currentSize / group.maxSize) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5">
                      <button
                        onClick={() => handleToggleActive(group)}
                        className={cn(
                          "inline-flex px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                          group.active
                            ? "bg-primary/15 text-primary"
                            : "bg-surface-high text-text-muted"
                        )}
                      >
                        {group.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="py-3.5 pr-4 rounded-r-lg text-right">
                      <button
                        onClick={() => {
                          setEditingGroup(group);
                          setFormOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-surface-high text-text-muted hover:text-text transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {(!groups || groups.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-text-muted text-sm"
                    >
                      Nenhum grupo cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {(groups ?? []).map((group) => (
              <div
                key={group.id}
                className="bg-surface-high rounded-2xl border border-border p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text text-sm">
                    {group.name}
                  </span>
                  <button
                    onClick={() => handleToggleActive(group)}
                    className={cn(
                      "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                      group.active
                        ? "bg-primary/15 text-primary"
                        : "bg-surface text-text-muted"
                    )}
                  >
                    {group.active ? "Ativo" : "Inativo"}
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <span>Cohort: {group.cohort}</span>
                  <span>
                    {group.currentSize}/{group.maxSize} membros
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (group.currentSize / group.maxSize) * 100
                      )}%`,
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    setEditingGroup(group);
                    setFormOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors"
                >
                  <Pencil size={12} />
                  Editar
                </button>
              </div>
            ))}
            {(!groups || groups.length === 0) && (
              <div className="text-center py-12 text-text-muted text-sm">
                Nenhum grupo cadastrado.
              </div>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {formOpen && (
          <GroupForm
            group={editingGroup}
            onClose={() => {
              setFormOpen(false);
              setEditingGroup(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
