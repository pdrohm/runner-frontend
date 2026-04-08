"use client";

import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  LogOut,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAthleteProfile } from "@/services/athlete.service";
import { useFullPlan } from "@/services/training.service";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/lib/utils";

const levelLabels: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
  elite: "Elite",
};

export default function ProfilePage() {
  const { data: athlete, isLoading, error } = useAthleteProfile();
  const { data: plan } = useFullPlan();
  const { logout } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-10 h-10 text-text-muted" />
        <p className="text-text-muted">
          Não foi possível carregar seu perfil.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="secondary"
          size="sm"
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  const paceZones = plan?.paceZones;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-extrabold text-text font-display">Perfil</h1>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        <Card>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-primary-dim flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text font-display">
                {athlete.profile.firstName} {athlete.profile.lastName}
              </h2>
              <p className="text-sm text-text-muted">
                {levelLabels[athlete.assessment?.experienceLevel] || "Atleta"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-text-muted" />
              <span className="text-text-muted">{athlete.profile.email}</span>
            </div>
            {athlete.profile.location && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-text-muted" />
                <span className="text-text-muted">
                  {athlete.profile.location}
                </span>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Assessment Data */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
            Avaliação
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Nível</span>
              <span className="text-sm font-semibold text-text">
                {levelLabels[athlete.assessment?.experienceLevel] || "-"}
              </span>
            </div>
            <div className="border-b border-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Km/semana</span>
              <span className="text-sm font-semibold text-text">
                {athlete.assessment?.weeklyMileage || "-"}{" "}
                {athlete.assessment?.mileageUnit || "km"}
              </span>
            </div>
            {athlete.assessment?.recentRaceTimes?.[0] && (
              <>
                <div className="border-b border-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Teste 3km</span>
                  <span className="text-sm font-semibold text-text">
                    {athlete.assessment.recentRaceTimes[0].time}
                  </span>
                </div>
                <div className="border-b border-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">VDOT</span>
                  <span className="text-sm font-bold text-primary font-display">
                    {paceZones?.vdot || "-"}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Pace Zones */}
      {paceZones && paceZones.zones.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
              Zonas de pace
            </h2>
            <div className="space-y-2">
              {paceZones.zones.map((zone) => (
                <div
                  key={zone.zone}
                  className="flex items-center justify-between py-3 px-3 rounded-xl bg-surface"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold bg-primary-dim text-primary w-7 h-7 rounded-lg flex items-center justify-center font-display">
                      Z{zone.zone}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text">
                        {zone.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {zone.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text font-display tabular-nums">
                      {zone.minPace} - {zone.maxPace}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {paceZones.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Goal */}
      {athlete.goals?.[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
              Objetivo
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Distância</span>
                <span className="text-sm font-semibold text-text">
                  {athlete.goals[0].distance}
                </span>
              </div>
              {athlete.goals[0].targetTime && (
                <>
                  <div className="border-b border-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Tempo alvo</span>
                    <span className="text-sm font-bold text-primary font-display">
                      {athlete.goals[0].targetTime}
                    </span>
                  </div>
                </>
              )}
              {athlete.goals[0].raceName && (
                <>
                  <div className="border-b border-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Prova</span>
                    <span className="text-sm font-semibold text-text">
                      {athlete.goals[0].raceName}
                    </span>
                  </div>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* WhatsApp Group */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <a
          href="https://chat.whatsapp.com/teamboto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="w-full">
            <MessageCircle className="w-5 h-5" />
            Grupo WhatsApp
          </Button>
        </a>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={() => {
            logout();
            window.location.href = "/app/login";
          }}
          className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-text-muted hover:text-red-400 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sair da conta
        </button>
      </motion.div>
    </div>
  );
}
