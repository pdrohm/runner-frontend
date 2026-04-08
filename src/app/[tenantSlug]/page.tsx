import { LandingClient } from "@/components/landing/landing-client";

export default function LandingPage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  const { tenantSlug } = params;

  return <LandingClient tenantSlug={tenantSlug} />;
}
