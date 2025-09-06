"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "../types";
import { isValidIranMobile, normalizeTo09 } from "@/lib/iranPhone";
import { LS_AUTH, LS_USER } from "../constants";
import { fetchRandomUser } from "../services/user.service";

export function useAuthInternal() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // hydrate از localStorage
  useEffect(() => {
    try {
      const authed = localStorage.getItem(LS_AUTH) === "true";
      const raw = localStorage.getItem(LS_USER);
      setIsAuthenticated(authed);
      setUser(raw ? JSON.parse(raw) : null);
    } catch {}
    setLoading(false);
  }, []);

  const loginWithPhone = useCallback(async (phoneInput: string) => {
    const normalized = normalizeTo09(phoneInput);
    if (!normalized || !isValidIranMobile(phoneInput)) {
      throw new Error("INVALID_PHONE");
    }
    const rnd = await fetchRandomUser();
    const u: User = { ...rnd, phone: normalized };
    localStorage.setItem(LS_USER, JSON.stringify(u));
    localStorage.setItem(LS_AUTH, "true");
    setUser(u);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_AUTH);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return useMemo(
    () => ({ user, isAuthenticated, loading, loginWithPhone, logout }),
    [user, isAuthenticated, loading, loginWithPhone, logout]
  );
}
