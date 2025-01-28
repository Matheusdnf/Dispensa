import { supabase } from "@/app/lib/supabase/SupabaseClient";

export async function signinUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Erro ao realizar login:", error.message);
    return { error: error.message };
  }

  if (data.user) {
    console.log("Login realizado com sucesso:", data.user);
  }

  return { data };
}
