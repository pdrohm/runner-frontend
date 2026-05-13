import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage({
  params,
}: {
  params: { tenantSlug: string };
}) {
  return (
    <main className="min-h-screen bg-bg text-text flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface border border-border">
          <XCircle className="w-10 h-10 text-text-muted" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            Pagamento cancelado
          </h1>
          <p className="text-text-muted">
            Nenhuma cobrança foi feita. Você pode tentar novamente quando
            quiser.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href={`/${params.tenantSlug}/checkout`}>
            <Button variant="primary" size="md">
              Tentar novamente
            </Button>
          </Link>
          <Link href={`/${params.tenantSlug}`}>
            <Button variant="secondary" size="md">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
