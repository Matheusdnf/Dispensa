/**
 * Cliente do compartilhamento de despensas. Conversa com as rotas
 * /api/pantries/[id]/shares, que só respondem para o dono da despensa.
 * Mantém o mesmo estilo tolerante de pantries.js/products.js.
 */

// Retorna { owner, members } ou { error } se o acesso for negado.
export async function fetchShares(pantryId) {
  const res = await fetch(`/api/pantries/${pantryId}/shares`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: data.error || "Não foi possível carregar as pessoas." };
  }
  return data;
}

export async function addShare(pantryId, email) {
  const res = await fetch(`/api/pantries/${pantryId}/shares`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: data.error || "Erro ao adicionar pessoa." };
  return { data };
}

export async function removeShare(pantryId, userId) {
  const res = await fetch(`/api/pantries/${pantryId}/shares/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.error || "Erro ao remover pessoa." };
  }
  return { success: true };
}
