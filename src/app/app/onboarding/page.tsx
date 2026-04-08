"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Timer, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg space-y-6"
      >
        {/* Welcome */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-text font-display"
          >
            Bem-vindo ao{" "}
            <span className="text-primary">TEAMBOTO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-text-muted mt-3 text-base"
          >
            Vamos criar sua planilha de treino personalizada. Primeiro,
            precisamos conhecer seu nível atual.
          </motion.p>
        </div>

        {/* Test Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary-dim flex items-center justify-center flex-shrink-0">
                <Timer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-text text-lg font-display">Teste de 3km</h2>
                <p className="text-text-muted text-sm mt-1">
                  Este teste nos ajuda a calcular suas zonas de pace e
                  personalizar seu plano de treino.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-5">Como fazer o teste</h3>
            <div className="space-y-5">
              {[
                {
                  title: "Escolha um local plano",
                  desc: "Pista de atletismo, parque ou rua plana com distância marcada.",
                },
                {
                  title: "Aqueça por 10 minutos",
                  desc: "Trote leve seguido de alongamentos dinâmicos.",
                },
                {
                  title: "Corra 3km no seu melhor ritmo",
                  desc: "Dê o seu melhor, mas mantenha um esforço que consiga sustentar durante toda a distância.",
                },
                {
                  title: "Anote seu tempo",
                  desc: "Use um relógio ou app de corrida para registrar o tempo total.",
                },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-primary-dim text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-display">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text">
                      {step.title}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-yellow-500/15 bg-yellow-500/[0.03]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text">Dicas importantes</p>
                <ul className="text-xs text-text-muted mt-1.5 space-y-1">
                  <li>- Faça o teste descansado (sem treino forte no dia anterior)</li>
                  <li>- Evite horários muito quentes</li>
                  <li>- Hidrate-se bem antes</li>
                  <li>
                    - Se nunca correu 3km seguidos, corra o mais rápido que
                    conseguir e anote a distância e tempo
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/app/assessment">
            <Button className="w-full" size="lg">
              Registrar meu teste
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
