import { NextResponse } from "next/server";
import { saveUpload, deleteUpload } from "@/app/lib/upload";
import { getPantryAccess, getOwnedPantry } from "@/app/lib/access";

export async function GET(_request, { params }) {
  const { id } = await params;
  // Dono ou convidado pode ver a despensa.
  const result = await getPantryAccess(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ...result.pantry, role: result.role });
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
