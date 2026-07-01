"use client";

import { useState, useRef, useEffect } from "react";
import { UserPlus, Check, X, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";

export function InvitationsButton({ onActionComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/invitations");
      if (res.ok) {
        const data = await res.json();
        setInvitations(data);
      }
    } catch (error) {
      console.error("Erro ao buscar convites", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleAction = async (shareId, action) => {
    try {
      const res = await fetch(`/api/user/invitations/${shareId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setInvitations((prev) =>
          prev.filter((inv) => inv.share_id !== shareId),
        );
        if (action === "accept") {
          if (onActionComplete) {
            onActionComplete();
          } else {
            router.refresh();
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.error("Erro ao responder convite", error);
    }
  };

  const unreadCount = invitations.length;

  return (
    <div className="static md:relative inline-block" ref={dropdownRef}>
      {/* Botão de Ativação do Menu */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchInvitations();
        }}
        className="relative p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200 focus:outline-none"
        aria-label="Convites de Despensas"
      >
        <Inbox className="h-5 w-5 stroke-[1.5]" />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        )}
      </button>

      {/* Painel de Convites - Forçado a ser largo (md:w-96) */}
      {isOpen && (
        <div className="fixed left-4 right-4 top-16 md:absolute md:left-auto md:right-0 md:top-auto md:mt-3 w-auto md:w-96 min-w-[24rem] origin-top-right rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xl shadow-slate-200/40 focus:outline-none z-50 overflow-hidden transform transition-all flex flex-col">
          {/* Cabeçalho Proporcional e Espaçado */}
          <div className="px-5 py-4 flex items-center justify-between bg-white border-b border-slate-100 gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider !text-emerald-600 dark:text-emerald-600 flex-1 whitespace-nowrap">
              Convites ({unreadCount})
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="block md:hidden text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Área de Conteúdo/Lista */}
          <div className="max-h-[60vh] md:max-h-[28rem] overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {loading ? (
              <div className="py-12 text-center text-sm font-medium text-slate-400">
                Carregando...
              </div>
            ) : unreadCount === 0 ? (
              <div className="py-12 text-center text-sm font-medium text-slate-400">
                Você não tem novos convites.
              </div>
            ) : (
              invitations.map((inv) => (
                <div
                  key={inv.share_id}
                  className="group relative flex flex-col p-5 rounded-2xl border bg-white border-slate-100 shadow-sm hover:shadow-md/50 transition-all duration-200"
                >
                  {/* Sub-cabeçalho estilo Push */}
                  <div className="flex items-center gap-2 mb-2 opacity-70">
                    <UserPlus className="h-4 w-4 text-emerald-500 stroke-[1.8]" />
                    <span className="text-[11px] font-bold tracking-wide uppercase text-slate-500">
                      Novo Convite
                    </span>
                  </div>

                  {/* Título da Despensa */}
                  <h4 className="text-base font-bold text-slate-800 leading-tight mb-1.5">
                    {inv.pantry_name}
                  </h4>

                  {/* Mensagem descritiva */}
                  <p className="text-sm text-slate-600 leading-normal mb-4 opacity-90">
                    <strong className="font-semibold text-slate-900">
                      {inv.owner_name}
                    </strong>{" "}
                    convidou você para participar desta despensa.
                  </p>

                  {/* Ações Inferiores */}
                  <div className="flex items-center gap-2.5 mt-auto">
                    <button
                      type="button"
                      onClick={() => handleAction(inv.share_id, "reject")}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-50 hover:bg-rose-100/70 text-rose-600 rounded-xl text-xs font-bold active:scale-[0.99] transition-all duration-150 focus:outline-none"
                    >
                      <X className="h-4 w-4 stroke-[2]" />
                      Recusar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAction(inv.share_id, "accept")}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-100 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 focus:outline-none"
                    >
                      <Check className="h-4 w-4 stroke-[2.5]" />
                      Aceitar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
