"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await api.post("/api/v1/auth/request", {
        email,
        method: "magic_link",
      });
      setIsSent(true);
    } catch {
      setError("Não foi possível enviar o link. Verifique seu email e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-text tracking-tight font-display">
            TEAM<span className="text-primary">BOTO</span>
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Acesse sua conta de atleta
          </p>
        </div>

        <Card className="p-7">
          <AnimatePresence mode="wait">
            {isSent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-dim flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-text font-display mb-2">
                  Link enviado!
                </h2>
                <p className="text-text-muted text-sm">
                  Enviamos um link para{" "}
                  <span className="text-primary font-medium">{email}</span>.
                  Verifique sua caixa de entrada.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setEmail("");
                  }}
                  className="mt-6 text-sm text-text-muted hover:text-primary transition-colors cursor-pointer"
                >
                  Usar outro email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="w-full bg-surface-high border border-border rounded-xl pl-11 pr-4 py-3.5 text-text placeholder:text-text-tertiary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Enviar link de acesso
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
