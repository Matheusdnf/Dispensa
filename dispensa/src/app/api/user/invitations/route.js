import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";

// Lista as solicitações de compartilhamento pendentes para o usuário logado
export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const db = getDb();
  
  // Queremos pegar os compartilhamentos pendentes e também os detalhes da despensa e quem está convidando (o dono)
  const invitations = db
    .prepare(
      `SELECT s.id as share_id, s.status, p.id as pantry_id, p.name as pantry_name, u.username as owner_name 
       FROM pantry_shares s
       JOIN pantries p ON s.pantry_id = p.id
       JOIN users u ON p.user_id = u.id
       WHERE s.user_id = ? AND s.status = 'pending'
       ORDER BY s.created_at DESC`
    )
    .all(userId);

  return NextResponse.json(invitations);
}
