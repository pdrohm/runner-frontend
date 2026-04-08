"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";

export default function GeneratingPage() {
  const router = useRouter();
  const { setAthlete } = useAuthStore();
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    pollRef.current = setInterval(async () => {
      try {
        const { data } = await api.get("/api/v1/athlete/me");
        if (data.subscriptionStatus === "active" && data.onboardingCompleted) {
          setAthlete(data);
          if (pollRef.current) clearInterval(pollRef.current);
          router.replace("/app");
        }
      } catch {
        // Keep polling
      }
    }, 3000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [router, setAthlete]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center space-y-8"
      >
        {/* Animated Loader */}
        <div className="relative w-32 h-32 mx-auto">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-3 rounded-full border-2 border-primary/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-6 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "#82ff99",
              borderRightColor: "#35b75b",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-6 rounded-full bg-primary shadow-[0_0_20px_rgba(130,255,153,0.5)]" />
          </motion.div>

          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.33,
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.66,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-extrabold text-text font-display"
          >
            Gerando sua planilha...
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-text-muted text-sm mt-3"
          >
            Nosso algoritmo está criando um plano de treino exclusivo baseado no
            seu nível e objetivo.
          </motion.p>
        </div>

        {/* Progress messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-2"
        >
          {[
            "Analisando seu nível atual...",
            "Calculando zonas de pace...",
            "Estruturando periodização...",
            "Montando sessões de treino...",
          ].map((msg, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 2 }}
              className="text-xs text-text-muted"
            >
              {msg}
            </motion.p>
          ))}
        </motion.div>

        {/* WhatsApp Group */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <Card className="border-primary/10">
            <div className="text-center">
              <MessageCircle className="w-8 h-8 text-text-muted mx-auto mb-3" />
              <h3 className="font-bold text-text text-sm mb-1">
                Enquanto isso, entre no grupo!
              </h3>
              <p className="text-xs text-text-muted mb-4">
                Conecte-se com outros atletas do TEAMBOTO no WhatsApp.
              </p>
              <a
                href="https://chat.whatsapp.com/teamboto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" className="w-full">
                  <MessageCircle className="w-4 h-4" />
                  Entrar no grupo WhatsApp
                </Button>
              </a>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
