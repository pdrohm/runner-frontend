"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

// ── Types ──────────────────────────────────────────────────────────────────

export interface DashboardMetrics {
  totalLeads: number;
  totalAthletes: number;
  activeSubscriptions: number;
  churnRate: number;
}

export interface AdminAthlete {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "onboarding" | "assessment_pending" | "plan_generating" | "active" | "churned";
  plan?: string;
  createdAt: string;
  subscriptionStatus: string;
  quizAnswers?: Record<string, unknown>;
  assessment?: {
    level: string;
    paceZones?: { zone: string; minPace: string; maxPace: string }[];
    weeklyMileage?: number;
  };
  trainingPlan?: {
    currentWeek: number;
    totalWeeks: number;
    weeklyProgress: number;
    planName: string;
  };
  purchaseHistory?: {
    id: string;
    productName: string;
    amount: number;
    date: string;
    status: string;
  }[];
}

export interface AdminAthletesResponse {
  athletes: AdminAthlete[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminAthletesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  active: boolean;
  description?: string;
  createdAt: string;
}

export interface CreateProductPayload {
  name: string;
  type: string;
  price: number;
  description?: string;
  active?: boolean;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string;
}

export interface WhatsAppGroup {
  id: string;
  name: string;
  cohort: string;
  currentSize: number;
  maxSize: number;
  active: boolean;
  createdAt: string;
}

export interface CreateGroupPayload {
  name: string;
  cohort: string;
  maxSize: number;
  active?: boolean;
}

export interface UpdateGroupPayload extends Partial<CreateGroupPayload> {
  id: string;
}

export interface TenantConfig {
  primaryColor: string;
  logoUrl: string;
  headline: string;
  subheadline: string;
  aiPrompt: string;
}

// ── Hooks ──────────────────────────────────────────────────────────────────

export function useAdminDashboard() {
  return useQuery<DashboardMetrics>({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/admin/dashboard");
      return data;
    },
  });
}

export function useAdminAthletes(params: AdminAthletesParams = {}) {
  return useQuery<AdminAthletesResponse>({
    queryKey: ["admin", "athletes", params],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/admin/athletes", { params });
      return data;
    },
  });
}

export function useAdminAthleteDetail(id: string) {
  return useQuery<AdminAthlete>({
    queryKey: ["admin", "athletes", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/v1/admin/athletes/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useAdminProducts() {
  return useQuery<Product[]>({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/admin/products");
      return data;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const { data } = await api.post("/api/v1/admin/products", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateProductPayload) => {
      const { data } = await api.put(`/api/v1/admin/products/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useAdminGroups() {
  return useQuery<WhatsAppGroup[]>({
    queryKey: ["admin", "groups"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/admin/groups");
      return data;
    },
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateGroupPayload) => {
      const { data } = await api.post("/api/v1/admin/groups", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "groups"] });
    },
  });
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateGroupPayload) => {
      const { data } = await api.put(`/api/v1/admin/groups/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "groups"] });
    },
  });
}

export function useAdminConfig() {
  return useQuery<TenantConfig>({
    queryKey: ["admin", "config"],
    queryFn: async () => {
      const { data } = await api.get("/api/v1/admin/config");
      return data;
    },
  });
}

export function useUpdateConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TenantConfig) => {
      const { data } = await api.put("/api/v1/admin/config", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "config"] });
    },
  });
}
