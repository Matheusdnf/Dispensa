import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/app/lib/db";
import { createSession } from "@/app/lib/session";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "E-mail e senha são obrigatórios." },
      { status: 400 }
    );
  }

  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json(
      { error: "E-mail ou senha inválidos." },
      { status: 401 }
    );
  }

  await createSession(user.id);
  return NextResponse.json({
    user: { id: user.id, email: user.email, username: user.username },
  });
}
