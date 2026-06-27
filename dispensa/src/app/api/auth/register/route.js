import { NextResponse } from "next/server";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { getDb } from "@/app/lib/db";
import { createSession } from "@/app/lib/session";

export async function POST(request) {
  const { email, password, username } = await request.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { error: "E-mail, senha e nome de usuário são obrigatórios." },
      { status: 400 }
    );
  }

  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return NextResponse.json(
      { error: "Este e-mail já está cadastrado." },
      { status: 409 }
    );
  }

  const id = crypto.randomUUID();
  const passwordHash = bcrypt.hashSync(password, 10);
  db.prepare(
    "INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)"
  ).run(id, email, username, passwordHash);

  await createSession(id);
  return NextResponse.json({ user: { id, email, username } }, { status: 201 });
}
