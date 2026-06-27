import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ user: null });
  }

  const db = getDb();
  const user = db
    .prepare("SELECT id, email, username FROM users WHERE id = ?")
    .get(userId);

  return NextResponse.json({ user: user ?? null });
}
