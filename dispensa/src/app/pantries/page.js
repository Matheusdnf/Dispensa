"use client";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchPantries } from "@/app/lib/pantries";
import { LogoutButton } from "@/app/components/logoutButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Menu, X } from "lucide-react";
import { GlobalNotificationsBell } from "@/app/components/GlobalNotificationsBell";
import { InvitationsButton } from "@/app/components/InvitationsButton";

export default function PantriesPage() {
  const [pantries, setPantries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <InvitationsButton />
            <GlobalNotificationsBell pantries={pantries} />
            
            {/* Desktop Actions */}
            <div className="d-none d-md-flex items-center gap-2">
              <Link
                href="/pantries/new"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-indigo-900 shadow-sm transition hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] no-underline"
              >
                <Plus className="h-4 w-4" />
                Criar despensa
              </Link>
              <LogoutButton />
            </div>

            {/* Mobile Actions Menu */}
            <div className="d-md-none relative">
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
                    href="/pantries/new"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-900 transition hover:bg-indigo-100 no-underline"
                  >
                    <Plus className="h-4 w-4" />
                    Criar despensa
                  </Link>
                  <LogoutButton className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 no-underline" />
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
          <ShowCard itens={pantries} ismodal={false} button_pantries={true} />
        )}
      </main>
    </div>
  );
}
