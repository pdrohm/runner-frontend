import { notFound } from "next/navigation";
import {
  CheckoutForm,
  type CheckoutPlan,
  type CheckoutProduct,
} from "@/components/checkout/checkout-form";

interface TenantConfigResponse {
  pricingPlans: CheckoutPlan[];
  products: (CheckoutProduct & { isUpsell: boolean })[];
}

async function fetchTenantConfig(
  slug: string,
): Promise<TenantConfigResponse | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";
  const res = await fetch(`${apiUrl}/api/v1/tenant/${slug}/config`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function CheckoutPage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  const { tenantSlug } = params;
  const config = await fetchTenantConfig(tenantSlug);
  if (!config) notFound();

  const plans = (config.pricingPlans ?? []).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
  const upsells = (config.products ?? [])
    .filter((p) => p.isUpsell)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <CheckoutForm
      tenantSlug={tenantSlug}
      plans={plans}
      upsells={upsells}
    />
  );
}
