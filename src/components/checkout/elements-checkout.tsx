"use client";

import { useMemo, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type {
  Appearance,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Lock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { getStripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";

interface ElementsCheckoutProps {
  clientSecret: string;
  returnUrl: string;
  email: string;
  amountLabel: string;
}

const appearance: Appearance = {
  theme: "night",
  variables: {
    colorPrimary: "#7ed4ef",
    colorBackground: "#111111",
    colorText: "#f5f5f5",
    colorTextSecondary: "#a3a3a3",
    colorTextPlaceholder: "#525252",
    colorDanger: "#ff6b6b",
    colorIcon: "#7ed4ef",
    fontFamily:
      "var(--font-dm-sans), DM Sans, ui-sans-serif, system-ui, sans-serif",
    fontSizeBase: "15px",
    borderRadius: "12px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      backgroundColor: "#0a0a0a",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "#f5f5f5",
      padding: "12px 14px",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
    },
    ".Input:focus": {
      border: "1px solid rgba(126,212,239,0.4)",
      boxShadow: "0 0 0 3px rgba(126,212,239,0.15)",
    },
    ".Input--invalid": {
      border: "1px solid rgba(255,107,107,0.5)",
    },
    ".Label": {
      color: "#a3a3a3",
      fontSize: "13px",
      fontWeight: "500",
      marginBottom: "6px",
    },
    ".Tab": {
      backgroundColor: "#1a1a1a",
      border: "1px solid rgba(255,255,255,0.06)",
      color: "#a3a3a3",
    },
    ".Tab--selected": {
      backgroundColor: "rgba(126,212,239,0.08)",
      border: "1px solid #7ed4ef",
      color: "#7ed4ef",
    },
    ".Tab:hover": {
      backgroundColor: "#222222",
      color: "#f5f5f5",
    },
    ".TabIcon--selected": {
      fill: "#7ed4ef",
    },
    ".Block": {
      backgroundColor: "#0a0a0a",
      border: "1px solid rgba(255,255,255,0.06)",
    },
  },
};

function PayForm({
  returnUrl,
  email,
  amountLabel,
}: {
  returnUrl: string;
  email: string;
  amountLabel: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        receipt_email: email,
      },
    });

    if (confirmError) {
      setError(confirmError.message ?? "Não foi possível processar o pagamento.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement options={{ layout: "tabs" }} />

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full text-base py-4"
        disabled={!stripe || !elements || submitting}
      >
        {submitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Lock size={16} />
            PAGAR {amountLabel}
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-4 pt-1">
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
  );
}

export function ElementsCheckout({
  clientSecret,
  returnUrl,
  email,
  amountLabel,
}: ElementsCheckoutProps) {
  const stripePromise = useMemo(() => getStripe(), []);
  const options = useMemo<StripeElementsOptions>(
    () => ({ clientSecret, appearance }),
    [clientSecret],
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <PayForm
        returnUrl={returnUrl}
        email={email}
        amountLabel={amountLabel}
      />
    </Elements>
  );
}
