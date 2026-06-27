import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Armazenamento local de imagens (substitui o Supabase Storage).
 * Os arquivos vão para public/uploads e são servidos estaticamente pelo Next
 * a partir de /uploads/<arquivo>. A pasta é ignorada pelo git.
 */

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveUpload(file) {
  // FormData devolve string quando o campo veio vazio; ignoramos esses casos.
  if (!file || typeof file === "string" || file.size === 0) return null;

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || ".bin";
  const filename = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

export async function deleteUpload(publicPath) {
  if (!publicPath || !publicPath.startsWith("/uploads/")) return;
  try {
    await fs.unlink(path.join(process.cwd(), "public", publicPath));
  } catch {
    // arquivo já removido ou inexistente: nada a fazer
  }
}
