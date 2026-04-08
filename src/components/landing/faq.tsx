"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como funciona a planilha personalizada?",
    answer:
      "Após responder nosso quiz de avaliação (menos de 2 minutos), nossa inteligência artificial analisa seu nível, objetivo, rotina e histórico para criar uma planilha de treino 100% personalizada. O plano inclui zonas de pace calculadas, periodização completa e detalhamento de cada sessão.",
  },
  {
    question: "Preciso ter experiência em corrida?",
    answer:
      "Não! A planilha é adaptada para todos os níveis — do iniciante que nunca correu até o corredor avançado buscando recorde. A IA ajusta volume, intensidade e progressão de acordo com seu nível atual.",
  },
  {
    question: "O que está incluído na assinatura?",
    answer:
      "Sua assinatura inclui: planilha de treino personalizada por IA, cálculo de zonas de pace, plano semanal detalhado, acesso à comunidade exclusiva no WhatsApp, suporte por mensagem e ajustes periódicos na planilha conforme seu plano escolhido.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim, você pode cancelar sua assinatura a qualquer momento sem multa ou burocracia. Basta enviar uma mensagem pelo WhatsApp ou email. Sua planilha continua ativa até o final do período pago.",
  },
  {
    question: "Como funciona a comunidade no WhatsApp?",
    answer:
      "Ao assinar, você recebe acesso ao grupo exclusivo no WhatsApp com outros corredores da TEAMBOTO. Lá você pode tirar dúvidas sobre treinos, compartilhar resultados, participar de desafios e receber motivação da comunidade e da equipe.",
  },
  {
    question: "A planilha é ajustada ao longo do tempo?",
    answer:
      "Sim! Dependendo do seu plano, a planilha recebe ajustes mensais ou quinzenais baseados no seu progresso, feedback e resultados. A IA recalcula volume e intensidade para garantir evolução contínua e segura.",
  },
];

export function FAQ() {
  return (
    <section id="duvidas" className="py-24 md:py-36 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-4">
            DÚVIDAS
          </span>
          <h2 className="text-3xl md:text-[48px] font-extrabold font-display tracking-[-0.04em] leading-[1.05] text-text">
            Perguntas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-muted to-text">
              frequentes
            </span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
