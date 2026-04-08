"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, X, Package } from "lucide-react";
import {
  useAdminProducts,
  useCreateProduct,
  useUpdateProduct,
  type Product,
  type CreateProductPayload,
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

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

function ProductForm({ product, onClose }: ProductFormProps) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const isEditing = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [type, setType] = useState(product?.type ?? "subscription");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [active, setActive] = useState(product?.active ?? true);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateProductPayload = {
      name,
      type,
      price: parseFloat(price),
      description: description || undefined,
      active,
    };

    if (isEditing && product) {
      await updateMutation.mutateAsync({ id: product.id, ...payload });
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
            {isEditing ? "Editar Produto" : "Novo Produto"}
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
              Nome
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-high rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="Nome do produto"
            />
          </div>

          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
              Tipo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-high rounded-xl text-sm text-text outline-none focus:ring-1 focus:ring-primary/20 transition-all"
            >
              <option value="subscription">Assinatura</option>
              <option value="one_time">Compra Única</option>
              <option value="add_on">Complemento</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
              Preço (R$)
            </label>
            <input
              type="number"
              required
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-high rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-surface-high rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none"
              placeholder="Descrição opcional"
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

export default function ProductsPage() {
  const { data: products, isLoading } = useAdminProducts();
  const updateMutation = useUpdateProduct();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const typeLabels: Record<string, string> = {
    subscription: "Assinatura",
    one_time: "Compra Única",
    add_on: "Complemento",
  };

  const handleToggleActive = (product: Product) => {
    updateMutation.mutate({ id: product.id, active: !product.active });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-text font-display">Produtos</h1>
          <p className="text-text-muted text-sm mt-1">
            Gerencie seus produtos e planos
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-primary to-primary-dark rounded-xl text-sm font-bold text-bg hover:shadow-[0_0_24px_rgba(130,255,153,0.15)] transition-all"
        >
          <Plus size={16} />
          Novo Produto
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
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Preço</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {(products ?? []).map((product, i) => (
                  <tr
                    key={product.id}
                    className={cn(
                      "transition-colors",
                      i % 2 === 0 ? "bg-surface" : "bg-surface"
                    )}
                  >
                    <td className="py-3.5 pl-4 rounded-l-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-dim flex items-center justify-center">
                          <Package size={14} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium text-text">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="text-sm text-text-muted">
                        {typeLabels[product.type] || product.type}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="text-sm text-text font-mono">
                        R${" "}
                        {product.price.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <button
                        onClick={() => handleToggleActive(product)}
                        className={cn(
                          "inline-flex px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                          product.active
                            ? "bg-primary/15 text-primary"
                            : "bg-surface-high text-text-muted"
                        )}
                      >
                        {product.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="py-3.5 pr-4 rounded-r-lg text-right">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setFormOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-surface-high text-text-muted hover:text-text transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {(!products || products.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-text-muted text-sm"
                    >
                      Nenhum produto cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {(products ?? []).map((product) => (
              <div
                key={product.id}
                className="bg-surface-high rounded-2xl border border-border p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text text-sm">
                    {product.name}
                  </span>
                  <button
                    onClick={() => handleToggleActive(product)}
                    className={cn(
                      "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                      product.active
                        ? "bg-primary/15 text-primary"
                        : "bg-surface text-text-muted"
                    )}
                  >
                    {product.active ? "Ativo" : "Inativo"}
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{typeLabels[product.type] || product.type}</span>
                  <span className="font-mono">
                    R${" "}
                    {product.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setFormOpen(true);
                  }}
                  className="mt-3 flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors"
                >
                  <Pencil size={12} />
                  Editar
                </button>
              </div>
            ))}
            {(!products || products.length === 0) && (
              <div className="text-center py-12 text-text-muted text-sm">
                Nenhum produto cadastrado.
              </div>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {formOpen && (
          <ProductForm
            product={editingProduct}
            onClose={() => {
              setFormOpen(false);
              setEditingProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
