"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchProducts } from "@/app/lib/products";
import { fetchPantry } from "@/app/lib/pantries";

export default function ProductsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [pantryName, setPantryName] = useState("Despensa");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    fetchPantry(id).then((p) => {
      if (p?.name) setPantryName(p.name);
    });
    fetchProducts(id)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav_bar_itens
        name_nav_bar={pantryName}
        backHref="/pantries"
        backLabel="Voltar para as despensas"
        actions={
          <>
            <Link
              href={`/pantries/${id}/products/new`}
              className="btn btn-primary"
            >
              Adicionar produto
            </Link>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() =>
                setShareMessage(
                  "O compartilhamento de despensas estará disponível em breve."
                )
              }
            >
              Adicionar pessoa
            </button>
          </>
        }
      />

      <main id="main-content" className="flex-fill">
        {shareMessage && (
          <div className="alert alert-info m-3" role="status">
            {shareMessage}
          </div>
        )}
        {loading ? (
          <p className="p-4" role="status">
            Carregando…
          </p>
        ) : error ? (
          <p className="p-4 text-danger" role="alert">
            Erro: {error}
          </p>
        ) : (
          <ShowCard itens={products} ismodal={true} />
        )}
      </main>
    </div>
  );
}
