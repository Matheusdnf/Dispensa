import { NextResponse } from "next/server";
import { getOwnedPantry } from "@/app/lib/access";

// Remove o acesso de uma pessoa à despensa. Só o dono pode fazer isso.
export async function DELETE(_request, { params }) {
  const { id, userId } = await params;
  const result = await getOwnedPantry(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { db } = result;

  db.prepare(
    "DELETE FROM pantry_shares WHERE pantry_id = ? AND user_id = ?"
  ).run(id, userId);

  return NextResponse.json({ success: true });
}
