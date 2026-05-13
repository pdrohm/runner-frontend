"use client";

import { useMemo } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";

interface EmbeddedStripeCheckoutProps {
  clientSecret: string;
}

export function EmbeddedStripeCheckout({
  clientSecret,
}: EmbeddedStripeCheckoutProps) {
  const stripePromise = useMemo(() => getStripe(), []);
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  return (
    <div id="stripe-embedded-checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
