import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { saveUpload, deleteUpload } from "@/app/lib/upload";
import { getPantryAccess } from "@/app/lib/access";

// Carrega o produto e confere o acesso (dono ou convidado) via despensa.
async function getOwnedProduct(pid) {
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(pid);
  if (!product) return { error: "Produto não encontrado.", status: 404 };

  const access = await getPantryAccess(product.pantry_id);
  if (access.error) return access;

  return { product, db, role: access.role };
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
  if (result.role !== "admin") {
    return NextResponse.json({ error: "Apenas administradores podem editar produtos." }, { status: 403 });
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

  const newInitialQty = quantity > (product.initial_quantity || 0) ? quantity : product.initial_quantity;

  db.prepare(
    `UPDATE products SET name = ?, description = ?, quantity = ?, initial_quantity = ?, expiration = ?, image = ?
     WHERE id = ?`
  ).run(name, description, quantity, newInitialQty, expiration, image, pid);

  const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(pid);
  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { pid } = await params;
  const result = await getOwnedProduct(pid);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  if (result.role !== "admin") {
    return NextResponse.json({ error: "Apenas administradores podem excluir produtos." }, { status: 403 });
  }
  const { product, db } = result;

  await deleteUpload(product.image);
  db.prepare("DELETE FROM products WHERE id = ?").run(pid);
  return NextResponse.json({ success: true });
}
