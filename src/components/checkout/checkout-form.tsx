"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Shield,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { ElementsCheckout } from "./elements-checkout";

export interface CheckoutPlan {
  id: string;
  name: string;
  interval: "monthly" | "quarterly" | "semiannual" | "annual";
  pricePerMonth: number;
  totalPrice: number;
  sortOrder: number;
}

export interface CheckoutProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  isUpsell: boolean;
  sortOrder: number;
}

interface CheckoutFormProps {
  tenantSlug: string;
  plans: CheckoutPlan[];
  upsells: CheckoutProduct[];
}

const intervalLabel: Record<CheckoutPlan["interval"], string> = {
  monthly: "1 mês",
  quarterly: "3 meses",
  semiannual: "6 meses",
  annual: "12 meses",
};

const intervalMonths: Record<CheckoutPlan["interval"], number> = {
  monthly: 1,
  quarterly: 3,
  semiannual: 6,
  annual: 12,
};

const formatBRL = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export function CheckoutForm({
  tenantSlug,
  plans,
  upsells,
}: CheckoutFormProps) {
  const router = useRouter();

  const defaultPlanId =
    plans.find((p) => p.interval === "quarterly")?.id ?? plans[0]?.id ?? "";

  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlanId);
  const [selectedUpsellIds, setSelectedUpsellIds] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const toggleUpsell = (id: string) =>
    setSelectedUpsellIds((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
    );

  const upsellTotalCents = useMemo(
    () =>
      upsells
        .filter((u) => selectedUpsellIds.includes(u.id))
        .reduce((sum, u) => sum + u.price, 0),
    [upsells, selectedUpsellIds],
  );

  const totalCents = (selectedPlan?.totalPrice ?? 0) + upsellTotalCents;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setError(null);
    setIsSubmitting(true);

    const idempotencyKey =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    try {
      const { data } = await api.post(
        `/api/v1/tenant/${tenantSlug}/checkout`,
        {
          pricingPlanId: selectedPlan.id,
          oneTimeProductIds: selectedUpsellIds,
          name: form.name,
          email: form.email,
          phone: form.whatsapp || undefined,
          uiMode: "elements",
        },
        { headers: { "Idempotency-Key": idempotencyKey } },
      );
      if (!data?.clientSecret) {
        throw new Error("Resposta inválida do servidor");
      }
      setClientSecret(data.clientSecret);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ??
        (err instanceof Error ? err.message : "Erro ao iniciar pagamento");
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (clientSecret) {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const returnUrl = `${origin}/${tenantSlug}/checkout/success`;
    return (
      <div className="min-h-screen bg-bg">
        <div className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 md:px-6 h-16 flex items-center">
            <button
              onClick={() => setClientSecret(null)}
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
        <div className="max-w-xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="mb-6 pb-6 border-b border-border">
            <div className="flex justify-between text-sm text-text-muted mb-1">
              <span>Plano</span>
              <span>{selectedPlan?.name}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-text text-lg">Total</span>
              <span className="text-2xl font-extrabold text-primary font-display">
                {formatBRL(totalCents)}
              </span>
            </div>
          </div>
          <ElementsCheckout
            clientSecret={clientSecret}
            returnUrl={returnUrl}
            email={form.email}
            amountLabel={formatBRL(totalCents)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
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
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-extrabold tracking-tight text-text mb-4">
                Escolha seu plano
              </h2>
              <div className="space-y-3">
                {plans.map((p) => {
                  const months = intervalMonths[p.interval];
                  const showOriginal =
                    months > 1 &&
                    plans.find((x) => x.interval === "monthly")?.pricePerMonth;
                  const monthly =
                    plans.find((x) => x.interval === "monthly")?.pricePerMonth ??
                    0;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlanId(p.id)}
                      type="button"
                      className={cn(
                        "w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer",
                        selectedPlanId === p.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-surface-high border-2 border-transparent hover:bg-surface-high/80",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                          selectedPlanId === p.id
                            ? "border-primary bg-primary"
                            : "border-text-muted",
                        )}
                      >
                        {selectedPlanId === p.id && (
                          <Check size={12} className="text-bg" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-text">{p.name}</span>
                        </div>
                        {months > 1 && (
                          <span className="text-xs text-text-muted">
                            {formatBRL(p.totalPrice)} a cada{" "}
                            {intervalLabel[p.interval]}
                          </span>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-baseline gap-1">
                          {showOriginal && p.pricePerMonth < monthly ? (
                            <span className="text-sm text-text-muted line-through">
                              {formatBRL(monthly)}
                            </span>
                          ) : null}
                          <span className="text-xl font-extrabold text-text font-display">
                            {formatBRL(p.pricePerMonth)}
                          </span>
                        </div>
                        <span className="text-xs text-text-muted">/mês</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {upsells.length > 0 && (
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
                    const isSelected = selectedUpsellIds.includes(upsell.id);
                    return (
                      <button
                        key={upsell.id}
                        onClick={() => toggleUpsell(upsell.id)}
                        type="button"
                        className={cn(
                          "w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer",
                          isSelected
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-surface-high border-2 border-transparent hover:bg-surface-high/80",
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all",
                            isSelected
                              ? "bg-primary"
                              : "border-2 border-text-muted",
                          )}
                        >
                          {isSelected && (
                            <Check size={12} className="text-bg" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-text text-sm block">
                            {upsell.name}
                          </span>
                          {upsell.description ? (
                            <span className="text-xs text-text-muted">
                              {upsell.description}
                            </span>
                          ) : null}
                        </div>
                        <span className="text-sm font-bold text-primary flex-shrink-0">
                          +{formatBRL(upsell.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-surface-high rounded-2xl border border-border p-6 md:p-8 sticky top-24"
            >
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="text-lg font-bold text-text mb-3">Resumo</h3>
                <div className="space-y-2">
                  {selectedPlan && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">
                        Plano {selectedPlan.name}
                      </span>
                      <span className="text-text font-medium">
                        {formatBRL(selectedPlan.totalPrice)}
                      </span>
                    </div>
                  )}
                  {upsells
                    .filter((u) => selectedUpsellIds.includes(u.id))
                    .map((u) => (
                      <div key={u.id} className="flex justify-between text-sm">
                        <span className="text-text-muted">{u.name}</span>
                        <span className="text-text font-medium">
                          {formatBRL(u.price)}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between">
                  <span className="font-bold text-text">Total</span>
                  <span className="text-xl font-extrabold text-primary font-display">
                    {formatBRL(totalCents)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-text mb-1">Seus dados</h3>

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
                    WhatsApp (opcional)
                  </label>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) =>
                      setForm({ ...form, whatsapp: e.target.value })
                    }
                    placeholder="+55 11 99999-9999"
                    className="w-full bg-surface rounded-lg px-4 py-3 text-text text-sm placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6 text-base py-4"
                  disabled={isSubmitting || !selectedPlan}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Lock size={16} />
                      IR PARA PAGAMENTO
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
                    <span className="text-xs">Stripe + SSL</span>
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
