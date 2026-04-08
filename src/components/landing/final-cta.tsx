"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FinalCTAProps {
  quizUrl: string;
}

export function FinalCTA({ quizUrl }: FinalCTAProps) {
  return (
    <section className="relative py-32 md:py-44 px-4 md:px-6 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/60 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent-warm/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-[56px] font-extrabold font-display tracking-[-0.04em] leading-[1.05] text-text">
            PRONTO PARA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              CORRER MAIS
            </span>
            ?
          </h2>

          <p className="mt-6 text-base md:text-lg text-text-muted max-w-xl mx-auto">
            Junte-se a mais de 500 corredores que transformaram seus treinos.
            Sua próxima PR começa aqui.
          </p>

          <div className="mt-10">
            <Link
              href={quizUrl}
              className="group inline-flex items-center gap-3 bg-gradient-to-br from-primary to-primary-dark text-bg font-bold text-lg px-10 py-5 rounded-xl cta-glow hover:scale-[1.02] transition-transform duration-300"
            >
              QUERO MINHA PLANILHA
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield, text: "Cancele quando quiser" },
              { icon: Zap, text: "Planilha em minutos" },
              { icon: Clock, text: "Suporte contínuo" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-text-muted/90"
              >
                <Icon size={16} className="text-primary/40" />
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
