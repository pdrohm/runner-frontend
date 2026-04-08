"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Dúvidas", href: "#duvidas" },
];

interface NavbarProps {
  tenantSlug: string;
  quizUrl: string;
}

export function Navbar({ tenantSlug, quizUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong bg-bg/60"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16 md:h-20">
          <a
            href={`/${tenantSlug}`}
            className="text-xl md:text-2xl font-extrabold font-display tracking-[-0.04em] text-text"
          >
            TEAM<span className="text-primary">BOTO</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-text-muted/80 hover:text-text transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href={quizUrl}
              className="group inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-bg font-bold text-sm px-5 py-2.5 rounded-lg hover:scale-[1.03] transition-all duration-300"
            >
              COMEÇAR
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text cursor-pointer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl pt-20"
        >
          <div className="flex flex-col items-center gap-6 py-12">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-lg font-semibold text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <Link
              href={quizUrl}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-bg font-bold px-6 py-3 rounded-lg"
            >
              COMEÇAR AGORA
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
