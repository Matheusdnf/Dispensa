import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";
import { saveUpload, deleteUpload } from "@/app/lib/upload";

// Garante que a despensa existe e pertence ao usuário logado.
async function getOwnedPantry(id) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "Não autenticado.", status: 401 };

  const db = getDb();
  const pantry = db.prepare("SELECT * FROM pantries WHERE id = ?").get(id);
  if (!pantry) return { error: "Despensa não encontrada.", status: 404 };
  if (pantry.user_id !== userId) {
    return { error: "Acesso negado.", status: 403 };
  }
  return { pantry, db };
}

export async function GET(_request, { params }) {
  const { id } = await params;
  const result = await getOwnedPantry(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.pantry);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const result = await getOwnedPantry(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { pantry, db } = result;

  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");

  if (!name) {
    return NextResponse.json(
      { error: "O nome da despensa é obrigatório." },
      { status: 400 }
    );
  }

  let image = pantry.image;
  const newImage = await saveUpload(form.get("image"));
  if (newImage) {
    await deleteUpload(pantry.image);
    image = newImage;
  }

  db.prepare(
    "UPDATE pantries SET name = ?, description = ?, image = ? WHERE id = ?"
  ).run(name, description ?? null, image, id);

  const updated = db.prepare("SELECT * FROM pantries WHERE id = ?").get(id);
  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const result = await getOwnedPantry(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { pantry, db } = result;

  await deleteUpload(pantry.image);
  // ON DELETE CASCADE remove os produtos da despensa automaticamente.
  db.prepare("DELETE FROM pantries WHERE id = ?").run(id);

  return NextResponse.json({ success: true });
}
