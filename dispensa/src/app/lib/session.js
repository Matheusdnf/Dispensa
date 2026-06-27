import crypto from "node:crypto";
import { cookies } from "next/headers";

/**
 * Sessão local baseada em cookie httpOnly assinado (HMAC-SHA256).
 * Substitui o gerenciamento de sessão do Supabase Auth.
 *
 * O cookie guarda apenas o id do usuário, assinado com SESSION_SECRET para
 * impedir adulteração. Em produção, defina SESSION_SECRET no ambiente.
 */

const SECRET =
  process.env.SESSION_SECRET || "dispensa-dev-secret-troque-em-producao";
const COOKIE_NAME = "dispensa_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

function sign(value) {
  const mac = crypto
    .createHmac("sha256", SECRET)
    .update(value)
    .digest("base64url");
  return `${value}.${mac}`;
}

function unsign(signed) {
  if (!signed) return null;
  const dot = signed.lastIndexOf(".");
  if (dot < 0) return null;
  const value = signed.slice(0, dot);
  const expected = sign(value);
  const a = Buffer.from(signed);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return value;
}

export async function createSession(userId) {
  const store = await cookies();
  store.set(COOKIE_NAME, sign(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSessionUserId() {
  const store = await cookies();
  return unsign(store.get(COOKIE_NAME)?.value);
}
