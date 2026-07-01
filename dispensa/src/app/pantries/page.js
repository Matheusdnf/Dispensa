"use client";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchPantries } from "@/app/lib/pantries";
import { LogoutButton } from "@/app/components/logoutButton";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Plus } from "lucide-react";

export default function PantriesPage() {
  const [pantries, setPantries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPantries()
      .then(setPantries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav_bar_itens
        name_nav_bar="Minhas Despensas"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/pantries/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-indigo-900 shadow-sm transition hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] no-underline"
            >
              <Plus className="h-4 w-4" />
              Criar despensa
            </Link>
            <LogoutButton />
          </div>
        }
      />

      <main id="main-content" className="flex-fill">
        {loading ? (
          <p className="p-4" role="status">
            Carregando…
          </p>
        ) : error ? (
          <p className="p-4 text-danger" role="alert">
            Erro: {error}
          </p>
        ) : (
          <ShowCard itens={pantries} ismodal={false} button_pantries={true} />
        )}
      </main>
    </div>
  );
}
