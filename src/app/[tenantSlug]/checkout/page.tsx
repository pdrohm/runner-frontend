import { CheckoutForm } from "@/components/checkout/checkout-form";

export default function CheckoutPage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  const { tenantSlug } = params;

  return <CheckoutForm tenantSlug={tenantSlug} />;
}
