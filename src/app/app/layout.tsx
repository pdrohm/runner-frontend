"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Calendar,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/app/plan", label: "Treinos", icon: Calendar },
  { href: "/app/progress", label: "Progresso", icon: BarChart3 },
  { href: "/app/profile", label: "Perfil", icon: User },
];

const standaloneRoutes = [
  "/app/login",
  "/app/auth",
  "/app/onboarding",
  "/app/assessment",
  "/app/goal",
  "/app/generating",
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const { isAuthenticated } = useAuthGuard();

  const isStandalone = standaloneRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isStandalone) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-surface border-r border-border fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-black tracking-tight font-display">
            TEAM<span className="text-primary">BOTO</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/8 text-primary"
                    : "text-text-muted hover:text-text hover:bg-surface-high"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              logout();
              window.location.href = "/app/login";
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-muted hover:text-red-400 hover:bg-surface-high transition-all duration-200 w-full cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 pb-24 lg:pb-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-bg/80 backdrop-blur-2xl border-b border-border px-5 py-3.5 flex items-center justify-between">
          <h1 className="text-lg font-black tracking-tight font-display">
            TEAM<span className="text-primary">BOTO</span>
          </h1>
          <button
            onClick={() => {
              logout();
              window.location.href = "/app/login";
            }}
            className="text-text-muted hover:text-red-400 transition-colors p-2 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-5 py-6 lg:px-8 lg:py-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg/90 backdrop-blur-2xl border-t border-border pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2 px-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/app"
                ? pathname === "/app"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200",
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-text-muted"
                )}
              >
                <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5]")} />
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
