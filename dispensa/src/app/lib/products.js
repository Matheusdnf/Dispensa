/**
 * Cliente dos produtos. Conversa com as rotas da API, que derivam o usuário da
 * sessão e checam se a despensa pertence a ele. Argumentos extras (como userId)
 * passados por chamadas antigas são ignorados.
 */

export const fetchProducts = async (pantryId) => {
  const res = await fetch(`/api/pantries/${pantryId}/products`);
  if (!res.ok) return [];
  return res.json();
};

export async function fetchProduct(id) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function createProduct(
  name,
  description,
  imageFile,
  quantity,
  pantryId,
  expiration
) {
  const form = new FormData();
  form.append("name", name ?? "");
  form.append("description", description ?? "");
  if (quantity != null && quantity !== "") form.append("quantity", quantity);
  if (expiration) form.append("expiration", expiration);
  if (imageFile) form.append("image", imageFile);

  const res = await fetch(`/api/pantries/${pantryId}/products`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (!res.ok) return { error: data.error || "Erro ao criar produto." };
  return { data };
}

export async function editProduct(
  id,
  name,
  description,
  quantity,
  imageFile,
  expiration
) {
  const form = new FormData();
  if (name != null) form.append("name", name);
  if (description != null) form.append("description", description);
  if (quantity != null && quantity !== "") form.append("quantity", quantity);
  if (expiration != null) form.append("expiration", expiration);
  if (imageFile) form.append("image", imageFile);

  const res = await fetch(`/api/products/${id}`, { method: "PUT", body: form });
  const data = await res.json();
  if (!res.ok) return { error: data.error || "Erro ao editar produto." };
  return { data };
}

export async function deleteProduct(id) {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.error || "Erro ao excluir produto." };
  }
  return { success: true };
}
