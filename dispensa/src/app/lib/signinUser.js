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

  // Se o servidor devolver erro 500 (ex.: Node sem suporte a node:sqlite), a
  // resposta pode não ser JSON; evitamos quebrar e mostramos uma mensagem.
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: data.error || "Não foi possível entrar. Tente novamente." };
  }
  return { data };
}
