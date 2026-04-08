"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Palette, Globe, Bot, Loader2 } from "lucide-react";
import { useAdminConfig, useUpdateConfig } from "@/services/admin.service";
import { cn } from "@/lib/utils";

function SectionSkeleton() {
  return (
    <div className="bg-surface-high rounded-2xl border border-border p-6 animate-pulse">
      <div className="w-32 h-5 bg-surface rounded mb-6" />
      <div className="space-y-4">
        <div className="w-full h-10 bg-surface rounded-xl" />
        <div className="w-full h-10 bg-surface rounded-xl" />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { data: config, isLoading } = useAdminConfig();
  const updateMutation = useUpdateConfig();

  const [primaryColor, setPrimaryColor] = useState("#82ff99");
  const [logoUrl, setLogoUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (config) {
      setPrimaryColor(config.primaryColor || "#82ff99");
      setLogoUrl(config.logoUrl || "");
      setHeadline(config.headline || "");
      setSubheadline(config.subheadline || "");
      setAiPrompt(config.aiPrompt || "");
    }
  }, [config]);

  const handleSave = async () => {
    await updateMutation.mutateAsync({
      primaryColor,
      logoUrl,
      headline,
      subheadline,
      aiPrompt,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-text font-display">Configurações</h1>
          <p className="text-text-muted text-sm mt-1">
            Personalize a plataforma do seu tenant
          </p>
        </div>
        <div className="space-y-4 max-w-2xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <SectionSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-text font-display">Configurações</h1>
          <p className="text-text-muted text-sm mt-1">
            Personalize a plataforma do seu tenant
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
            saved
              ? "bg-primary/15 text-primary"
              : "bg-gradient-to-br from-primary to-primary-dark text-bg hover:shadow-[0_0_24px_rgba(130,255,153,0.15)]",
            updateMutation.isPending && "opacity-60"
          )}
        >
          {updateMutation.isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {saved ? "Salvo!" : "Salvar Alterações"}
        </button>
      </div>

      <div className="space-y-4 max-w-2xl">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-high rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Palette size={16} className="text-text-muted" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Branding
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
                Cor Primária
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 rounded-lg cursor-pointer border-0 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
                  />
                </div>
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-surface rounded-xl text-sm text-text font-mono placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="#82ff99"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
                URL do Logo
              </label>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="https://exemplo.com/logo.png"
              />
              {logoUrl && (
                <div className="mt-3 p-3 bg-surface rounded-xl inline-block">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Landing Page */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-surface-high rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe size={16} className="text-text-muted" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Landing Page
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
                Título Principal
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="Transforme sua corrida com IA"
              />
            </div>

            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
                Subtítulo
              </label>
              <input
                type="text"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="Planos personalizados para cada nível"
              />
            </div>
          </div>
        </motion.div>

        {/* AI Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-high rounded-2xl border border-border p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Bot size={16} className="text-text-muted" />
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Prompt de IA
            </h2>
          </div>

          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">
              Prompt do Sistema
            </label>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 bg-surface rounded-xl text-sm text-text placeholder:text-text-tertiary outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none font-mono leading-relaxed"
              placeholder="Você é um assistente de corrida especializado..."
            />
            <p className="text-xs text-text-muted mt-2">
              Este prompt será usado como instrução base para a IA gerar planos
              de treino e interagir com os atletas.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
