/**
 * Cria uma nova conta chamando a API local (/api/auth/register), que grava o
 * usuário no SQLite (com senha em hash) e já cria a sessão.
 */
export async function signupUser(email, password, username) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { error: data.error || "Não foi possível registrar." };
  }
  return { data };
}
