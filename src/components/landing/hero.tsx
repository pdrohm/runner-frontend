"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Timer, TrendingUp, Flame } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  tenantSlug: string;
  quizUrl: string;
}

export function Hero({ tenantSlug, quizUrl }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/50 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/60" />
        {/* Warm accent glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent-warm/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[160px]" />
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 grain" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left: Main content - takes 7 cols */}
          <div className="lg:col-span-7">
            {/* Micro badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-semibold text-text-muted tracking-wide uppercase">
                +500 corredores ativos
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-extrabold font-display tracking-[-0.05em] leading-[0.9]"
            >
              <span className="text-text">DO ASFALTO</span>
              <br />
              <span className="text-text">AO</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary-dark">
                PÓDIO
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-text-muted/90 max-w-lg leading-relaxed"
            >
              Planilha de corrida personalizada por IA.
              <br className="hidden sm:block" />
              Cada treino pensado para o seu ritmo, objetivo e evolução.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href={quizUrl}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-br from-primary to-primary-dark text-bg font-bold text-lg px-8 py-4 rounded-xl cta-glow hover:scale-[1.02] transition-transform duration-300"
              >
                QUERO MINHA PLANILHA
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <span className="text-sm text-text-muted/60 self-center">
                Leva menos de 2 minutos
              </span>
            </motion.div>
          </div>

          {/* Right: Floating stat cards - takes 5 cols */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative h-[520px]">
              {/* Main pace card */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-8 right-0 w-[280px] glass-strong rounded-3xl p-6 animate-float"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Timer size={16} className="text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Pace Atual
                  </span>
                </div>
                <div className="text-5xl font-extrabold font-display text-text tracking-tight">
                  5:29
                  <span className="text-lg text-text-muted font-medium ml-1">
                    /km
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-text-muted">
                  <span>Meta: 5:00/km</span>
                  <span className="text-primary font-semibold">78%</span>
                </div>
              </motion.div>

              {/* Weekly distance card */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: -1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute top-[200px] left-0 w-[220px] glass-strong rounded-3xl p-5 animate-float-delayed"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={14} className="text-accent-warm" />
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    Esta Semana
                  </span>
                </div>
                <div className="text-3xl font-extrabold font-display text-text">
                  32.4
                  <span className="text-sm text-text-muted font-medium ml-1">
                    km
                  </span>
                </div>
                <div className="mt-3 flex gap-1">
                  {[65, 0, 80, 0, 45, 90, 0].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full h-12 bg-white/5 rounded-sm relative overflow-hidden">
                        <motion.div
                          className="absolute bottom-0 w-full rounded-sm bg-gradient-to-t from-accent-warm/60 to-accent-warm/20"
                          initial={{ height: "0%" }}
                          animate={{ height: `${h}%` }}
                          transition={{
                            duration: 0.8,
                            delay: 1.4 + i * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                      <span className="text-[8px] text-text-muted/50">
                        {["S", "T", "Q", "Q", "S", "S", "D"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Streak card */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 1 }}
                animate={{ opacity: 1, y: 0, rotate: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute bottom-0 right-8 w-[200px] glass-strong rounded-3xl p-5 animate-float-slow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Flame size={14} className="text-accent-warm" />
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    Sequência
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-display text-text">
                    12
                  </span>
                  <span className="text-sm text-text-muted">semanas</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" />
                  <span className="text-xs text-primary font-semibold">
                    +18% evolução
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
