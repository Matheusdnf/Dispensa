"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, AlertTriangle, XCircle, Info, X, ChevronRight, ArrowLeft } from "lucide-react";
import { fetchProducts } from "@/app/lib/products";

export function GlobalNotificationsBell({ pantries = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsByPantry, setNotificationsByPantry] = useState({});
  const [selectedPantryId, setSelectedPantryId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedPantryId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!pantries || pantries.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const loadAllNotifications = async () => {
      const results = {};
      
      for (const pantry of pantries) {
        try {
          const products = await fetchProducts(pantry.id);
          const pantryNotifs = [];

          products.forEach((product) => {
            // 1. Notificação de quantidade
            if (
              product.quantity === 1 &&
              product.initial_quantity &&
              product.initial_quantity > 1
            ) {
              pantryNotifs.push({
                id: `qty-${product.id}`,
                type: "warning",
                title: "Aviso de Estoque",
                message: `Falta apenas 1 unidade de ${product.name}.`,
              });
            } else if (product.quantity === 0 && product.initial_quantity > 0) {
              pantryNotifs.push({
                id: `qty-${product.id}`,
                type: "danger",
                title: "Estoque Esgotado",
                message: `${product.name} acabou no estoque.`,
              });
            }

            // 2. Notificação de vencimento
            if (product.expiration) {
              const expStr = product.expiration.includes("T")
                ? product.expiration
                : `${product.expiration}T00:00:00`;

              const expDate = new Date(expStr);
              expDate.setHours(0, 0, 0, 0);

              const diffTime = expDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays <= 0) {
                pantryNotifs.push({
                  id: `exp-${product.id}`,
                  type: "danger",
                  title: "Produto Vencido",
                  message: `O produto ${product.name} está vencido.`,
                });
              } else if (diffDays <= 5) {
                pantryNotifs.push({
                  id: `exp-${product.id}`,
                  type: "warning",
                  title: "Vencimento Próximo",
                  message: `${product.name} vence em ${diffDays} ${diffDays === 1 ? "dia" : "dias"}.`,
                });
              } else if (diffDays <= 10) {
                pantryNotifs.push({
                  id: `exp-${product.id}`,
                  type: "info",
                  title: "Alerta de Validade",
                  message: `${product.name} vence em ${diffDays} dias.`,
                });
              }
            }
          });

          if (pantryNotifs.length > 0) {
            results[pantry.id] = pantryNotifs;
          }
        } catch (error) {
          console.error("Failed to fetch products for pantry", pantry.id);
        }
      }
      setNotificationsByPantry(results);
    };

    loadAllNotifications();
  }, [pantries]);

  const removeNotification = (pantryId, notifId) => {
    setNotificationsByPantry((prev) => {
      const updatedPantryNotifs = prev[pantryId].filter((n) => n.id !== notifId);
      const newObj = { ...prev };
      if (updatedPantryNotifs.length === 0) {
        delete newObj[pantryId];
        if (selectedPantryId === pantryId) {
           setSelectedPantryId(null);
        }
      } else {
        newObj[pantryId] = updatedPantryNotifs;
      }
      return newObj;
    });
  };

  const clearAllNotifications = () => {
    if (selectedPantryId) {
      setNotificationsByPantry((prev) => {
        const newObj = { ...prev };
        delete newObj[selectedPantryId];
        return newObj;
      });
      setSelectedPantryId(null);
    } else {
      setNotificationsByPantry({});
    }
  };

  const totalUnread = Object.values(notificationsByPantry).reduce((sum, notifs) => sum + notifs.length, 0);

  const typeStyles = {
    danger: "bg-red-50/90 border-red-100 text-red-900",
    warning: "bg-amber-50/90 border-amber-100 text-amber-900",
    info: "bg-blue-50/90 border-blue-100 text-blue-900",
  };

  return (
    <div className="static md:relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSelectedPantryId(null); // Reset view when opening/closing
        }}
        className="relative p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200 focus:outline-none"
        aria-label="Notificações Globais"
      >
        <Bell className="h-5 w-5 stroke-[1.5]" />
        {totalUnread > 0 && (
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="fixed left-4 right-4 top-16 md:absolute md:left-auto md:right-0 md:top-auto md:mt-3 w-auto md:w-80 origin-top-right rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xl shadow-slate-200/40 focus:outline-none z-50 overflow-hidden transform transition-all flex flex-col">
          
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between bg-white border-b border-slate-100 gap-4">
            <div className="flex items-center gap-2 flex-1">
              {selectedPantryId && (
                <button
                  onClick={() => setSelectedPantryId(null)}
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                  aria-label="Voltar para lista de despensas"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <h3 className="text-xs tracking-wider !text-blue-600 font-bold flex-1">
                {selectedPantryId 
                  ? pantries.find(p => p.id === selectedPantryId)?.name 
                  : "Notificações"}
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {((!selectedPantryId && totalUnread > 0) || (selectedPantryId && notificationsByPantry[selectedPantryId]?.length > 0)) && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors whitespace-nowrap"
                >
                  Limpar tudo
                </button>
              )}
               <button
                onClick={() => setIsOpen(false)}
                className="block md:hidden text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[60vh] md:max-h-[26rem] overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
            {totalUnread === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-400">
                  Todas as despensas estão em ordem.
                </p>
              </div>
            ) : selectedPantryId ? (
               /* View de notificações de uma despensa específica */
               notificationsByPantry[selectedPantryId]?.map((notif) => (
                <div
                  key={notif.id}
                  className={`group relative flex flex-col p-3.5 rounded-2xl border backdrop-blur-sm transition-all duration-200 shadow-sm ${typeStyles[notif.type] || "bg-white border-slate-100 text-slate-900"}`}
                >
                  <div className="flex items-center justify-between mb-1.5 opacity-60">
                    <div className="flex items-center gap-1.5">
                      {notif.type === "danger" && <XCircle className="h-3.5 w-3.5" />}
                      {notif.type === "warning" && <AlertTriangle className="h-3.5 w-3.5" />}
                      {notif.type === "info" && <Info className="h-3.5 w-3.5" />}
                      <span className="text-[11px] font-bold tracking-wide uppercase">
                        {notif.title}
                      </span>
                    </div>
                    <button
                      onClick={() => removeNotification(selectedPantryId, notif.id)}
                      className="p-1 rounded-full hover:bg-black/5 text-current transition-colors"
                      aria-label="Remover notificação"
                    >
                      <X className="h-3 w-3 stroke-[2.5]" />
                    </button>
                  </div>
                  <p className="text-[13px] font-medium leading-normal pr-4 opacity-90">
                    {notif.message}
                  </p>
                </div>
              ))
            ) : (
               /* Lista de despensas com problemas */
               Object.entries(notificationsByPantry).map(([pId, notifs]) => {
                  const pName = pantries.find(p => p.id === pId)?.name || "Despensa";
                  return (
                    <button
                      key={pId}
                      onClick={() => setSelectedPantryId(pId)}
                      className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-100 transition-all shadow-sm group"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-900">
                          {pName}
                        </span>
                        <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600/70">
                          {notifs.length} {notifs.length === 1 ? "problema" : "problemas"} encontrado{notifs.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </button>
                  );
               })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
