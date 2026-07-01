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
    .prepare(`
      SELECT p.*, COALESCE(u.username, owner.username) as added_by_username 
      FROM products p 
      LEFT JOIN users u ON p.added_by = u.id 
      JOIN pantries pan ON p.pantry_id = pan.id
      JOIN users owner ON pan.user_id = owner.id
      WHERE p.pantry_id = ? 
      ORDER BY p.created_at DESC
    `)
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
  if (check.role === "leitor") {
    return NextResponse.json({ error: "Apenas administradores e colaboradores podem adicionar produtos." }, { status: 403 });
  }
  const { db, userId } = check;

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
    `INSERT INTO products (id, name, description, quantity, initial_quantity, pantry_id, expiration, image, added_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    productId,
    name,
    description ?? null,
    quantity ? Number(quantity) : null,
    quantity ? Number(quantity) : null,
    id,
    expiration || null,
    image,
    userId
  );

  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(productId);
  return NextResponse.json(product, { status: 201 });
}
