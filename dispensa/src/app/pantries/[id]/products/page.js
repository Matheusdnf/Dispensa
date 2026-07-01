"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchProducts } from "@/app/lib/products";
import { fetchPantry } from "@/app/lib/pantries";
import { useAuth } from "@/app/lib/auth";
import { Plus, UserPlus, Menu, X } from "lucide-react";
import { NotificationsBell } from "@/app/components/NotificationsBell";

export default function ProductsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [pantryName, setPantryName] = useState("Despensa");
  const [ownerId, setOwnerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchPantry(id).then((p) => {
      if (p?.name) setPantryName(p.name);
      if (p?.user_id) setOwnerId(p.user_id);
    });
    fetchProducts(id)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const isOwner = user && ownerId && user.id === ownerId;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav_bar_itens
        name_nav_bar={pantryName}
        backHref="/pantries"
        backLabel="Voltar para as despensas"
        actions={
          <div className="flex items-center gap-2">
            <NotificationsBell products={products} />
            
            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href={`/pantries/${id}/products/new`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-indigo-900 shadow-sm transition hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] no-underline"
              >
                <Plus className="h-4 w-4" />
                Adicionar produto
              </Link>
              {isOwner && (
                <Link
                  href={`/pantries/${id}/share`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition hover:scale-[1.02] active:scale-[0.98] no-underline"
                >
                  <UserPlus className="h-4 w-4" />
                  Adicionar pessoa
                </Link>
              )}
            </div>

            {/* Mobile hamburger menu */}
            <div className="md:hidden relative">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu de ações"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {isMobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 flex flex-col gap-3">
                  <Link
                    href={`/pantries/${id}/products/new`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-900 transition hover:bg-indigo-100 no-underline"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar produto
                  </Link>
                  {isOwner && (
                    <Link
                      href={`/pantries/${id}/share`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 no-underline"
                    >
                      <UserPlus className="h-4 w-4" />
                      Adicionar pessoa
                    </Link>
                  )}
                </div>
              )}
            </div>
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
          <ShowCard itens={products} ismodal={true} />
        )}
      </main>
    </div>
  );
}
