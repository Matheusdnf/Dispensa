import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

/**
 * Camada de acesso ao SQLite local (substitui o Supabase).
 *
 * Usa o SQLite nativo do Node (`node:sqlite`, disponível no Node 22+),
 * então não há dependência nativa para compilar. O arquivo do banco fica
 * em `data/dispensa.sqlite` na raiz do projeto e é ignorado pelo git.
 *
 * Em desenvolvimento o Next recarrega os módulos a cada alteração, então
 * guardamos a conexão em `globalThis` para não abrir o banco várias vezes.
 */

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "dispensa.sqlite");

const SCHEMA = `
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id         TEXT PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    username   TEXT NOT NULL,
    password   TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS pantries (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT,
    image       TEXT,
    user_id     TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS products (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT,
    quantity    INTEGER,
    pantry_id   TEXT NOT NULL,
    expiration  TEXT,
    image       TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (pantry_id) REFERENCES pantries(id) ON DELETE CASCADE
  );
`;

function createConnection() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  const db = new DatabaseSync(DB_PATH);
  db.exec(SCHEMA);
  return db;
}

/** @returns {import('node:sqlite').DatabaseSync} */
export function getDb() {
  if (!globalThis.__dispensaDb) {
    globalThis.__dispensaDb = createConnection();
  }
  return globalThis.__dispensaDb;
}
