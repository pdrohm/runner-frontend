"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Token inválido ou ausente.");
      return;
    }

    async function verify() {
      try {
        const { data } = await api.get(`/api/v1/auth/verify?token=${token}`);
        login(data.token, data.athlete);
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", data.token);
        }
        router.replace("/app");
      } catch {
        setError("Link expirado ou inválido. Solicite um novo link de acesso.");
      }
    }

    verify();
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center">
          {error ? (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-text mb-2">
                Erro na verificação
              </h2>
              <p className="text-text-muted text-sm mb-6">{error}</p>
              <Link href="/app/login">
                <Button className="w-full">Voltar para login</Button>
              </Link>
            </>
          ) : (
            <>
              <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold text-text mb-2">
                Verificando...
              </h2>
              <p className="text-text-muted text-sm">
                Aguarde enquanto validamos seu acesso.
              </p>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
