/**
 * Realiza o login chamando a API local (/api/auth/login), que valida as
 * credenciais no SQLite e cria a sessão por cookie.
 */
export async function signinUser(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { error: data.error || "Não foi possível entrar." };
  }
  return { data };
}
