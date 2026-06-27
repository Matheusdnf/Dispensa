"use client";
import { useEffect, useState } from "react";

/**
 * Hook de autenticação no cliente. Consulta a sessão atual via /api/auth/me
 * (cookie httpOnly) e expõe o usuário logado. Substitui o supabase.auth.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (active) setUser(data.user ?? null);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { user, loading };
}

export async function signOut() {
  await fetch("/api/auth/logout", { method: "POST" });
}
