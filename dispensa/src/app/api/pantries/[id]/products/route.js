import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getDb } from "@/app/lib/db";
import { getSessionUserId } from "@/app/lib/session";
import { saveUpload } from "@/app/lib/upload";

// Confere se a despensa existe e pertence ao usuário logado.
async function ownsPantry(db, pantryId) {
  const userId = await getSessionUserId();
  if (!userId) return { error: "Não autenticado.", status: 401 };
  const pantry = db.prepare("SELECT * FROM pantries WHERE id = ?").get(pantryId);
  if (!pantry) return { error: "Despensa não encontrada.", status: 404 };
  if (pantry.user_id !== userId) return { error: "Acesso negado.", status: 403 };
  return { pantry };
}

// Lista os produtos de uma despensa.
export async function GET(_request, { params }) {
  const { id } = await params;
  const db = getDb();
  const check = await ownsPantry(db, id);
  if (check.error) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const products = db
    .prepare("SELECT * FROM products WHERE pantry_id = ? ORDER BY created_at DESC")
    .all(id);
  return NextResponse.json(products);
}

// Cria um produto dentro da despensa.
export async function POST(request, { params }) {
  const { id } = await params;
  const db = getDb();
  const check = await ownsPantry(db, id);
  if (check.error) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

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
