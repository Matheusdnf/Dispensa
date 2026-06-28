import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { saveUpload } from "@/app/lib/upload";
import { getPantryAccess } from "@/app/lib/access";

// Lista os produtos de uma despensa (dono ou convidado).
export async function GET(_request, { params }) {
  const { id } = await params;
  const check = await getPantryAccess(id);
  if (check.error) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }
  const { db } = check;

  const products = db
    .prepare("SELECT * FROM products WHERE pantry_id = ? ORDER BY created_at DESC")
    .all(id);
  return NextResponse.json(products);
}

// Cria um produto dentro da despensa (dono ou convidado).
export async function POST(request, { params }) {
  const { id } = await params;
  const check = await getPantryAccess(id);
  if (check.error) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }
  const { db } = check;

  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const quantity = form.get("quantity");
  const expiration = form.get("expiration");

  if (!name) {
    return NextResponse.json(
      { error: "O nome do produto é obrigatório." },
      { status: 400 }
    );
  }

  const image = await saveUpload(form.get("image"));
  const productId = crypto.randomUUID();

  db.prepare(
    `INSERT INTO products (id, name, description, quantity, pantry_id, expiration, image)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    productId,
    name,
    description ?? null,
    quantity ? Number(quantity) : null,
    id,
    expiration || null,
    image
  );

  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(productId);
  return NextResponse.json(product, { status: 201 });
}
