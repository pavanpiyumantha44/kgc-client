import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";

// ---- 1️⃣ Safely parse localStorage ----
type PersistedAuth = {
  user: unknown | null;
  token: string | null;
};

let persistedAuth: PersistedAuth | null = null;

const storedAuth = localStorage.getItem("auth");
if (storedAuth) {
  persistedAuth = JSON.parse(storedAuth) as PersistedAuth;
}

// ---- 2️⃣ Preloaded state (typed correctly) ----
const preloadedState = {
  auth: {
    user: persistedAuth?.user ?? null,
    token: persistedAuth?.token ?? null,
    isAuthenticated: Boolean(persistedAuth),
  },
};

// ---- 3️⃣ Store ----
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

// ---- 4️⃣ Required TS exports ----
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
