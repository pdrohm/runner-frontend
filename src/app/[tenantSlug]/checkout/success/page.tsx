import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: { tenantSlug: string };
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id ?? null;

  return (
    <main className="min-h-screen bg-bg text-text flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            Pagamento confirmado!
          </h1>
          <p className="text-text-muted">
            Estamos preparando seu acesso. Em alguns segundos você receberá um
            link de acesso por e-mail.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 flex items-start gap-4 text-left">
          <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Verifique sua caixa de entrada</p>
            <p className="text-sm text-text-muted">
              Enviamos um link mágico para você criar seu acesso ao app de
              treinos. Pode demorar até 2 minutos — verifique também o spam.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href={`/${params.tenantSlug}`}>
            <Button variant="secondary" size="md">
              Voltar para o início
            </Button>
          </Link>
        </div>

        {sessionId ? (
          <p className="text-xs text-text-muted/60 break-all">
            Ref: {sessionId}
          </p>
        ) : null}
      </div>
    </main>
  );
}
