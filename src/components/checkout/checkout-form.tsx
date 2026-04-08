"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Shield,
  Lock,
  ArrowLeft,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CheckoutFormProps {
  tenantSlug: string;
}

const plans = [
  {
    id: "monthly",
    name: "Mensal",
    price: 80,
    originalPrice: null,
    interval: "mês",
    highlighted: false,
  },
  {
    id: "quarterly",
    name: "Trimestral",
    price: 70,
    originalPrice: 80,
    interval: "mês",
    highlighted: true,
    badge: "POPULAR",
    total: 210,
    period: "3 meses",
  },
  {
    id: "biannual",
    name: "Semestral",
    price: 60,
    originalPrice: 80,
    interval: "mês",
    highlighted: false,
    total: 360,
    period: "6 meses",
  },
];

const upsells = [
  {
    id: "nutrition",
    name: "Guia Nutricional para Corredores",
    description: "Plano alimentar complementar aos treinos",
    price: 29,
    selected: false,
  },
  {
    id: "strength",
    name: "Treinos de Fortalecimento",
    description: "Exercícios complementares para prevenir lesões",
    price: 19,
    selected: false,
  },
];

export function CheckoutForm({ tenantSlug }: CheckoutFormProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleUpsell = (id: string) => {
    setSelectedUpsells((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const upsellTotal = upsells
    .filter((u) => selectedUpsells.includes(u.id))
    .reduce((sum, u) => sum + u.price, 0);
  const total = plan.price + upsellTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, this would call the API to create a checkout session
    setIsSubmitting(false);
    alert("Checkout em desenvolvimento. Em breve você será redirecionado para o pagamento.");
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-muted hover:text-text transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Voltar</span>
          </button>
          <span className="ml-auto text-lg font-extrabold tracking-[-0.04em] font-display">
            TEAM<span className="text-primary">BOTO</span>
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left column - Plan + Upsells */}
          <div className="lg:col-span-3 space-y-8">
            {/* Plan selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-extrabold tracking-tight text-text mb-4">
                Escolha seu plano
              </h2>
              <div className="space-y-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer",
                      selectedPlan === p.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-surface-high border-2 border-transparent hover:bg-surface-high/80"
                    )}
                  >
                    {/* Radio */}
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        selectedPlan === p.id
                          ? "border-primary bg-primary"
                          : "border-text-muted"
                      )}
                    >
                      {selectedPlan === p.id && (
                        <Check size={12} className="text-bg" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text">{p.name}</span>
                        {p.badge && (
                          <span className="text-[10px] font-bold bg-gradient-to-r from-primary to-primary-dark text-bg px-2 py-0.5 rounded-full">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      {p.total && (
                        <span className="text-xs text-text-muted">
                          R${p.total} a cada {p.period}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-baseline gap-1">
                        {p.originalPrice && (
                          <span className="text-sm text-text-muted line-through">
                            R${p.originalPrice}
                          </span>
                        )}
                        <span className="text-xl font-extrabold text-text font-display">
                          R${p.price}
                        </span>
                      </div>
                      <span className="text-xs text-text-muted">/{p.interval}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Upsells */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xl font-extrabold tracking-tight text-text mb-4">
                Complemente seu plano
              </h2>
              <div className="space-y-3">
                {upsells.map((upsell) => {
                  const isSelected = selectedUpsells.includes(upsell.id);
                  return (
                    <button
                      key={upsell.id}
                      onClick={() => toggleUpsell(upsell.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer",
                        isSelected
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-surface-high border-2 border-transparent hover:bg-surface-high/80"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all",
                          isSelected
                            ? "bg-primary"
                            : "border-2 border-text-muted"
                        )}
                      >
                        {isSelected && <Check size={12} className="text-bg" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-text text-sm block">
                          {upsell.name}
                        </span>
                        <span className="text-xs text-text-muted">
                          {upsell.description}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary flex-shrink-0">
                        +R${upsell.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right column - Form + Payment */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-surface-high rounded-2xl border border-border p-6 md:p-8 sticky top-24"
            >
              {/* Summary */}
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="text-lg font-bold text-text mb-3">Resumo</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">
                      Plano {plan.name}
                    </span>
                    <span className="text-text font-medium">
                      R${plan.price}/mês
                    </span>
                  </div>
                  {upsells
                    .filter((u) => selectedUpsells.includes(u.id))
                    .map((u) => (
                      <div key={u.id} className="flex justify-between text-sm">
                        <span className="text-text-muted">{u.name}</span>
                        <span className="text-text font-medium">
                          R${u.price}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between">
                  <span className="font-bold text-text">Total</span>
                  <span className="text-xl font-extrabold text-primary font-display">
                    R${total}
                    <span className="text-sm font-normal text-text-muted">
                      /mês
                    </span>
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-text mb-1">
                  Seus dados
                </h3>

                <div>
                  <label className="text-sm text-text-muted block mb-1.5">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Seu nome"
                    className="w-full bg-surface rounded-lg px-4 py-3 text-text text-sm placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm text-text-muted block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="seu@email.com"
                    className="w-full bg-surface rounded-lg px-4 py-3 text-text text-sm placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm text-text-muted block mb-1.5">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={(e) =>
                      setForm({ ...form, whatsapp: e.target.value })
                    }
                    placeholder="(11) 99999-9999"
                    className="w-full bg-surface rounded-lg px-4 py-3 text-text text-sm placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6 text-base py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Lock size={16} />
                      FINALIZAR INSCRICAO
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Shield size={14} />
                    <span className="text-xs">Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Lock size={14} />
                    <span className="text-xs">Dados protegidos</span>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
