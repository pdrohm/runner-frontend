import axios, { type InternalAxiosRequestConfig } from "axios";

type RetryableConfig = InternalAxiosRequestConfig & {
  _skipAuthRetry?: boolean;
  _retried?: boolean;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let refreshInFlight: Promise<void> | null = null;

async function refreshSession(): Promise<void> {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = api
    .post(
      "/api/v1/auth/refresh",
      {},
      { _skipAuthRetry: true } as RetryableConfig,
    )
    .then(() => undefined)
    .finally(() => {
      refreshInFlight = null;
    });
  return refreshInFlight;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as RetryableConfig | undefined;
    if (
      error.response?.status === 401 &&
      original &&
      !original._skipAuthRetry &&
      !original._retried
    ) {
      original._retried = true;
      try {
        await refreshSession();
        return api(original);
      } catch {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:expired"));
        }
      }
    }
    return Promise.reject(error);
  },
);
