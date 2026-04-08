"use client";

import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { EmotionalStatement } from "./emotional-statement";
import { RunningMarquee } from "./running-marquee";
import { HowItWorks } from "./how-it-works";
import { Features } from "./features";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { FAQ } from "./faq";
import { FinalCTA } from "./final-cta";
import { MobileStickyCTA } from "./mobile-sticky-cta";

interface LandingClientProps {
  tenantSlug: string;
}

export function LandingClient({ tenantSlug }: LandingClientProps) {
  const quizUrl = `/${tenantSlug}/quiz`;

  return (
    <>
      <Navbar tenantSlug={tenantSlug} quizUrl={quizUrl} />
      <main>
        <div id="hero">
          <Hero tenantSlug={tenantSlug} quizUrl={quizUrl} />
        </div>
        <EmotionalStatement />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing quizUrl={quizUrl} />
        <FAQ />
        <FinalCTA quizUrl={quizUrl} />
        <RunningMarquee />
      </main>
      <MobileStickyCTA quizUrl={quizUrl} />

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-extrabold font-display tracking-[-0.04em]">
            TEAM<span className="text-primary">BOTO</span>
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-text-muted/60 hover:text-text transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-text-muted/60 hover:text-text transition-colors">Termos de Uso</a>
            <a href="#" className="text-xs text-text-muted/60 hover:text-text transition-colors">Contato</a>
          </div>
          <p className="text-xs text-text-muted/40">
            &copy; {new Date().getFullYear()} TEAMBOTO Running Club
          </p>
        </div>
      </footer>
    </>
  );
}
