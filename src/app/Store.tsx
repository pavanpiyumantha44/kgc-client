import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import type { AuthState } from "../types/auth";

// ---- Persisted type ----
type PersistedAuth = {
  user: AuthState["user"];
  token: string | null;
};

// ---- Parse localStorage safely ----
const loadAuth = (): PersistedAuth | null => {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    return JSON.parse(raw) as PersistedAuth;
  } catch {
    return null;
  }
};

const persistedAuth = loadAuth();

// ---- Preloaded state ----
const preloadedState: { auth: AuthState } = {
  auth: {
    user: persistedAuth?.user ?? null,
    token: persistedAuth?.token ?? null,
    isAuthenticated: !!persistedAuth?.token,
  },
};

// ---- Store ----
export const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState,
});

// ---- Types ----
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;