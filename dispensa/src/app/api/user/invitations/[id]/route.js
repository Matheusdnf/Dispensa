import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";

export async function PUT(request, { params }) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // The [id] parameter is the share_id
  const { id: shareId } = await params;
  
  const body = await request.json().catch(() => ({}));
  const action = body.action; // "accept" or "reject"

  const db = getDb();
  
  // Verify the share belongs to the current user
  const share = db.prepare("SELECT * FROM pantry_shares WHERE id = ? AND user_id = ? AND status = 'pending'").get(shareId, userId);
  
  if (!share) {
    return NextResponse.json({ error: "Solicitação não encontrada." }, { status: 404 });
  }

  if (action === "accept") {
    db.prepare("UPDATE pantry_shares SET status = 'accepted' WHERE id = ?").run(shareId);
    return NextResponse.json({ success: true, status: "accepted" });
  } else if (action === "reject") {
    db.prepare("DELETE FROM pantry_shares WHERE id = ?").run(shareId);
    return NextResponse.json({ success: true, status: "rejected" });
  }

  return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
}
