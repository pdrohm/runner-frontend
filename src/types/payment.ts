export interface PricingPlan {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "month" | "year" | "one-time";
  features: string[];
  highlighted: boolean;
  ctaText: string;
  trialDays: number;
  stripePriceId?: string;
  mercadoPagoPlanId?: string;
  maxAthletes?: number;
  sortOrder: number;
  active: boolean;
}

export interface Product {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  type: "subscription" | "one-time" | "add-on";
  plans: PricingPlan[];
  metadata?: Record<string, string>;
}

export interface CheckoutParams {
  tenantSlug: string;
  planId: string;
  athleteEmail: string;
  athleteName: string;
  quizAnswers?: Record<string, string | string[] | number>;
  couponCode?: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  provider: "stripe" | "mercadopago";
  status: "pending" | "completed" | "expired" | "cancelled";
  expiresAt: string;
}

export interface PaymentResult {
  success: boolean;
  sessionId: string;
  athleteId?: string;
  subscriptionId?: string;
  error?: string;
}
