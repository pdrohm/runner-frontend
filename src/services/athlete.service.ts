"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Athlete } from "@/types/athlete";

export function useAthleteProfile() {
  return useQuery<Athlete>({
    queryKey: ["athlete", "me"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/athlete/me");
      return data;
    },
  });
}

export function useSubmitAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { timeSeconds: number }) => {
      const { data } = await api.post("/api/v1/athlete/assessment", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athlete", "me"] });
    },
  });
}

export function useSubmitGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      distance: string;
      targetTime?: string;
    }) => {
      const { data } = await api.post("/api/v1/athlete/goal", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athlete", "me"] });
    },
  });
}
