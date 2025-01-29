"use client"
import { useAuth } from "@/app/lib/auth";

export function AuthStatus() {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      {user ? <p>Bem-vindo, {user.email}!</p> : <p>Você não está logado.</p>}
    </div>
  );
}
