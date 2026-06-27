import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";
import { saveUpload } from "@/app/lib/upload";

// Lista as despensas do usuário logado.
export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const db = getDb();
  const pantries = db
    .prepare("SELECT * FROM pantries WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId);

  return NextResponse.json(pantries);
}

// Cria uma nova despensa (multipart com nome, descrição e imagem opcional).
export async function POST(request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");

  if (!name) {
    return NextResponse.json(
      { error: "O nome da despensa é obrigatório." },
      { status: 400 }
    );
  }

  const image = await saveUpload(form.get("image"));
  const id = crypto.randomUUID();

  const db = getDb();
  db.prepare(
    "INSERT INTO pantries (id, name, description, image, user_id) VALUES (?, ?, ?, ?, ?)"
  ).run(id, name, description ?? null, image, userId);

  const pantry = db.prepare("SELECT * FROM pantries WHERE id = ?").get(id);
  return NextResponse.json(pantry, { status: 201 });
}
