"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Athlete } from "@/types/athlete";

interface AuthState {
  token: string | null;
  athlete: Athlete | null;
  isAuthenticated: boolean;

  login: (token: string, athlete: Athlete) => void;
  logout: () => void;
  setAthlete: (athlete: Athlete) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      athlete: null,
      isAuthenticated: false,

      login: (token, athlete) =>
        set({
          token,
          athlete,
          isAuthenticated: true,
        }),

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
        }
        set({
          token: null,
          athlete: null,
          isAuthenticated: false,
        });
      },

      setAthlete: (athlete) => set({ athlete }),

      setToken: (token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("auth-token", token);
        }
        set({ token });
      },
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
            }
      ),
    }
  )
);
