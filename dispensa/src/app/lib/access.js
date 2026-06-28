import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";

/**
 * Autorização das despensas em um único lugar.
 *
 * Uma despensa pode ser acessada pelo dono (`pantries.user_id`) ou por alguém
 * com quem ela foi compartilhada (linha em `pantry_shares`). Algumas ações
 * (renomear/excluir a despensa, gerenciar pessoas) continuam exclusivas do dono.
 *
 * Em caso de sucesso, retornam `{ pantry, role, db }` com `role` "owner" ou
 * "member". Em caso de falha, retornam `{ error, status }` — o mesmo formato já
 * usado pelas rotas, para manter o tratamento de erro idêntico.
 */

// Dono OU convidado: usado para ver a despensa e gerenciar seus produtos.
export async function getPantryAccess(pantryId) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "Não autenticado.", status: 401 };

  const db = getDb();
  const pantry = db.prepare("SELECT * FROM pantries WHERE id = ?").get(pantryId);
  if (!pantry) return { error: "Despensa não encontrada.", status: 404 };

  if (pantry.user_id === userId) {
    return { pantry, role: "owner", db, userId };
  }

  const share = db
    .prepare("SELECT 1 FROM pantry_shares WHERE pantry_id = ? AND user_id = ?")
    .get(pantryId, userId);
  if (share) {
    return { pantry, role: "member", db, userId };
  }

  return { error: "Acesso negado.", status: 403 };
}

// Apenas o dono: usado para editar/excluir a despensa e gerenciar pessoas.
export async function getOwnedPantry(pantryId) {
  const result = await getPantryAccess(pantryId);
  if (result.error) return result;
  if (result.role !== "owner") {
    return { error: "Acesso negado.", status: 403 };
  }
  return result;
}
