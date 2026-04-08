"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function useAuthGuard() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!token || !isAuthenticated) {
      router.replace("/app/login");
    }
  }, [token, isAuthenticated, router]);

  return { isAuthenticated: !!token && isAuthenticated };
}
