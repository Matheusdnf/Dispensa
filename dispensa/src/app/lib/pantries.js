/**
 * Cliente das despensas. Conversa com as rotas /api/pantries, que derivam o
 * usuário logado da sessão (cookie). Por isso nenhuma função precisa receber o
 * userId — argumentos extras passados por chamadas antigas são ignorados.
 */

export const fetchPantries = async () => {
  const res = await fetch("/api/pantries");
  if (!res.ok) return [];
  return res.json();
};

export async function fetchPantry(id) {
  const res = await fetch(`/api/pantries/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function createPantry(name, description, imageFile) {
  const form = new FormData();
  form.append("name", name ?? "");
  form.append("description", description ?? "");
  if (imageFile) form.append("image", imageFile);

  const res = await fetch("/api/pantries", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: data.error || "Erro ao criar despensa." };
  return { data };
}

export async function editPantry(id, name, description, imageFile) {
  const form = new FormData();
  form.append("name", name ?? "");
  form.append("description", description ?? "");
  if (imageFile) form.append("image", imageFile);

  const res = await fetch(`/api/pantries/${id}`, { method: "PUT", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: data.error || "Erro ao editar despensa." };
  return { data };
}

export async function deletePantry(id) {
  const res = await fetch(`/api/pantries/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { error: data.error || "Erro ao excluir despensa." };
  }
  return { success: true };
}
