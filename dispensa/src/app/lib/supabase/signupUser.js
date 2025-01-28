import { supabase } from "@/app/lib/supabase/SupabaseClient";

export async function signupUser(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Erro ao registrar:", error.message);
    return { error: error.message };
  }

  if (data.user) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ id: data.user.id, email, username, password }]);

    if (insertError) {
      console.error("Erro ao salvar o username:", insertError.message);
      return { error: insertError.message };
    }
  }

  return { data };
}
