"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rafael Santos",
    result: "-8 min na meia maratona",
    quote:
      "Em 3 meses, saí de 2h10 para 2h02. Cada treino fazia sentido. A comunidade ajudou demais nos dias difíceis.",
    avatar: "RS",
  },
  {
    name: "Camila Oliveira",
    result: "Primeira maratona sub-4h",
    quote:
      "Nunca imaginei que conseguiria. A planilha respeitou meu ritmo e me preparou sem lesões.",
    avatar: "CO",
  },
  {
    name: "Bruno Martins",
    result: "De 6:30 para 5:15/km",
    quote:
      "As zonas de pace mudaram tudo. Antes treinava no feeling e vivia lesionado. Agora tenho clareza total.",
    avatar: "BM",
  },
  {
    name: "Juliana Ferreira",
    result: "Voltou após lesão",
    quote:
      "Após lesão no joelho, tinha medo. A planilha foi progressiva e segura. Hoje corro mais que antes.",
    avatar: "JF",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-36 px-4 md:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent-warm/3 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
            RESULTADOS
          </span>
          <h2 className="text-3xl md:text-[48px] font-extrabold font-display tracking-[-0.04em] leading-[1.05] text-text">
            Quem corre,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              comprova
            </span>
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} testimonial={t} index={index} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, index) => (
            <div key={t.name} className="min-w-[85vw] snap-center">
              <TestimonialCard testimonial={t} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass rounded-3xl p-6 md:p-8 h-full flex flex-col hover:bg-white/[0.04] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <Quote size={28} className="text-primary/20" />
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="text-accent-warm fill-accent-warm" />
          ))}
        </div>
      </div>

      <p className="text-text/90 text-sm md:text-base leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 pt-6 border-t border-white/[0.04] flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-bg text-sm font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="text-sm font-bold text-text">{testimonial.name}</div>
          <div className="text-xs text-primary font-semibold">
            {testimonial.result}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
