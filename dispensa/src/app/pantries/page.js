"use client";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchPantries } from "@/app/lib/pantries";
import { useState, useEffect } from "react";
import Link from "next/link";

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
          <Link href="/pantries/new" className="btn btn-primary">
            Criar despensa
          </Link>
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
