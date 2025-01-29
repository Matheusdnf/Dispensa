"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/SupabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há uma sessão ativa
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    getUser();

    // Listener para mudanças de autenticação
    // event: pode ser signed_in, token_refreshed ou signed_out
    // session: contém os dados de sessão do usuário logado
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setUser(session?.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export async function signOut() {
  console.log("Passou por aqui");
  await supabase.auth.signOut();
}
