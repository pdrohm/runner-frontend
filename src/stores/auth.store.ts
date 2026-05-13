"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Athlete } from "@/types/athlete";
import { api } from "@/lib/api";

interface AuthState {
  athlete: Athlete | null;
  isAuthenticated: boolean;

  login: (athlete: Athlete) => void;
  logout: () => Promise<void>;
  setAthlete: (athlete: Athlete) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      athlete: null,
      isAuthenticated: false,

      login: (athlete) =>
        set({
          athlete,
          isAuthenticated: true,
        }),

      logout: async () => {
        try {
          await api.post("/api/v1/auth/logout");
        } catch {
          // best-effort; clear local state regardless
        }
        set({
          athlete: null,
          isAuthenticated: false,
        });
      },

      setAthlete: (athlete) => set({ athlete }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
    },
  ),
);
