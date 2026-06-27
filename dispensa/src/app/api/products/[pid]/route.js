import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";
import { saveUpload, deleteUpload } from "@/app/lib/upload";

// Carrega o produto e confere se ele pertence (via despensa) ao usuário logado.
async function getOwnedProduct(pid) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "Não autenticado.", status: 401 };

  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(pid);
  if (!product) return { error: "Produto não encontrado.", status: 404 };

  const pantry = db
    .prepare("SELECT user_id FROM pantries WHERE id = ?")
    .get(product.pantry_id);
  if (!pantry || pantry.user_id !== userId) {
    return { error: "Acesso negado.", status: 403 };
  }
  return { product, db };
}

export async function GET(_request, { params }) {
  const { pid } = await params;
  const result = await getOwnedProduct(pid);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.product);
}

export async function PUT(request, { params }) {
  const { pid } = await params;
  const result = await getOwnedProduct(pid);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { product, db } = result;

  const form = await request.formData();
  // Atualiza apenas os campos enviados, preservando os demais.
  const name = form.get("name") ?? product.name;
  const description = form.has("description")
    ? form.get("description")
    : product.description;
  const quantity = form.has("quantity")
    ? Number(form.get("quantity"))
    : product.quantity;
  const expiration = form.has("expiration")
    ? form.get("expiration") || null
    : product.expiration;

  let image = product.image;
  const newImage = await saveUpload(form.get("image"));
  if (newImage) {
    await deleteUpload(product.image);
    image = newImage;
  }

  db.prepare(
    `UPDATE products SET name = ?, description = ?, quantity = ?, expiration = ?, image = ?
     WHERE id = ?`
  ).run(name, description, quantity, expiration, image, pid);

  const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(pid);
  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { pid } = await params;
  const result = await getOwnedProduct(pid);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { product, db } = result;

  await deleteUpload(product.image);
  db.prepare("DELETE FROM products WHERE id = ?").run(pid);
  return NextResponse.json({ success: true });
}
