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

  // Se o servidor devolver erro 500 (ex.: Node sem suporte a node:sqlite), a
  // resposta pode não ser JSON; evitamos quebrar e mostramos uma mensagem.
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      error: data.error || "Não foi possível registrar. Tente novamente.",
    };
  }
  return { data };
}
