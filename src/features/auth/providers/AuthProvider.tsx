"use client";
import { createContext, useContext } from "react";
import { useAuthInternal } from "../hooks/useAuth";

type AuthShape = ReturnType<typeof useAuthInternal>;
const AuthContext = createContext<AuthShape | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useAuthInternal();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
