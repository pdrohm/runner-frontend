"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { TrainingWeek, TrainingPlan } from "@/types/training";

export function useCurrentWeek() {
  return useQuery<TrainingWeek>({
    queryKey: ["training", "current"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/training/current");
      return data;
    },
  });
}

export function useFullPlan() {
  return useQuery<TrainingPlan>({
    queryKey: ["training", "plan"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/training/plan");
      return data;
    },
  });
}

export function useMarkSessionComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      weekNumber: number;
      sessionIndex: number;
      notes?: string;
    }) => {
      const { data } = await api.patch(
        `/api/v1/training/session/${payload.weekNumber}/${payload.sessionIndex}`,
        { completed: true, notes: payload.notes }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["training"] });
    },
  });
}
