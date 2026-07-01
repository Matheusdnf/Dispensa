import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getOwnedPantry } from "@/app/lib/access";

// Lista quem tem acesso à despensa: o dono e as pessoas convidadas.
// Só o dono pode ver/gerenciar a lista.
export async function GET(_request, { params }) {
  const { id } = await params;
  const result = await getOwnedPantry(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { pantry, db } = result;

  const owner = db
    .prepare("SELECT id, email, username FROM users WHERE id = ?")
    .get(pantry.user_id);

  const members = db
    .prepare(
      `SELECT u.id, u.email, u.username, s.role, s.status
         FROM pantry_shares s
         JOIN users u ON u.id = s.user_id
        WHERE s.pantry_id = ?
        ORDER BY s.created_at ASC`
    )
    .all(id);

  return NextResponse.json({ owner, members });
}

// Compartilha a despensa com outra pessoa, identificada pelo e-mail.
export async function POST(request, { params }) {
  const { id } = await params;
  const result = await getOwnedPantry(id);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { pantry, db } = result;

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const role = ["colaborador", "leitor"].includes(body.role) ? body.role : "colaborador";
  
  if (!email) {
    return NextResponse.json(
      { error: "Informe o e-mail da pessoa." },
      { status: 400 }
    );
  }

  const user = db
    .prepare("SELECT id, email, username FROM users WHERE email = ?")
    .get(email);
  if (!user) {
    return NextResponse.json(
      { error: "Nenhum usuário com esse e-mail." },
      { status: 404 }
    );
  }
  if (user.id === pantry.user_id) {
    return NextResponse.json(
      { error: "Você já é o dono desta despensa." },
      { status: 400 }
    );
  }

  const existing = db
    .prepare("SELECT 1 FROM pantry_shares WHERE pantry_id = ? AND user_id = ?")
    .get(id, user.id);
  if (existing) {
    return NextResponse.json(
      { error: "Esta pessoa já tem acesso." },
      { status: 409 }
    );
  }

  db.prepare(
    "INSERT INTO pantry_shares (id, pantry_id, user_id, status, role) VALUES (?, ?, ?, 'pending', ?)"
  ).run(crypto.randomUUID(), id, user.id, role);

  return NextResponse.json({ member: { ...user, role } }, { status: 201 });
}
