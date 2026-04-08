"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface MobileStickyCTAProps {
  quizUrl: string;
}

export function MobileStickyCTA({ quizUrl }: MobileStickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-bg/90 backdrop-blur-xl"
        >
          <Link
            href={quizUrl}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-primary to-primary-dark text-bg font-bold text-base py-4 rounded-lg shadow-[0_0_30px_rgba(130,255,153,0.2)]"
          >
            QUERO MINHA PLANILHA
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
