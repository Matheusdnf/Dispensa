"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, AlertTriangle, XCircle, Info, X } from "lucide-react";

export function NotificationsBell({ products = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

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

  // Processa os produtos e gera as notificações iniciais
  useEffect(() => {
    const initialList = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    products.forEach((product) => {
      // 1. Notificação de quantidade
      if (
        product.quantity === 1 &&
        product.initial_quantity &&
        product.initial_quantity > 1
      ) {
        initialList.push({
          id: `qty-${product.id}`,
          type: "warning",
          title: "Aviso de Estoque",
          message: `Falta apenas 1 unidade de ${product.name}.`,
        });
      } else if (product.quantity === 0 && product.initial_quantity > 0) {
        initialList.push({
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
          initialList.push({
            id: `exp-${product.id}`,
            type: "danger",
            title: "Produto Vencido",
            message: `O produto ${product.name} está vencido.`,
          });
        } else if (diffDays <= 5) {
          initialList.push({
            id: `exp-${product.id}`,
            type: "warning",
            title: "Vencimento Próximo",
            message: `${product.name} vence em ${diffDays} ${diffDays === 1 ? "dia" : "dias"}.`,
          });
        } else if (diffDays <= 10) {
          initialList.push({
            id: `exp-${product.id}`,
            type: "info",
            title: "Alerta de Validade",
            message: `${product.name} vence em ${diffDays} dias.`,
          });
        }
      }
    });

    setNotifications(initialList);
  }, [products]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.length;

  const typeStyles = {
    danger: "bg-red-50/90 border-red-100 text-red-900",
    warning: "bg-amber-50/90 border-amber-100 text-amber-900",
    info: "bg-blue-50/90 border-blue-100 text-blue-900",
  };

  return (
    <div className="static md:relative inline-block" ref={dropdownRef}>
      {/* Botão do Ícone de Sino */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-200 focus:outline-none"
        aria-label="Notificações"
      >
        <Bell className="h-5 w-5 stroke-[1.5]" />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        )}
      </button>

      {/* Dropdown de Notificações Adaptável */}
      {isOpen && (
        <div className="fixed left-4 right-4 top-16 md:absolute md:left-auto md:right-0 md:top-auto md:mt-3 w-auto md:w-80 origin-top-right rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xl shadow-slate-200/40 focus:outline-none z-50 overflow-hidden transform transition-all">
          {/* Cabeçalho Corrigido */}
          <div className="px-4 py-3 flex items-center justify-between bg-white border-b border-slate-100 gap-4">
            <h3 className="text-xs  tracking-wider !text-blue-600 dark:text-blue-600 flex-1">
              Notificações
            </h3>
            <div className="flex items-center gap-3 shrink-0">
              {unreadCount > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors whitespace-nowrap"
                >
                  Limpar tudo
                </button>
              )}
              {/* Botão para fechar o menu facilmente no mobile */}
              <button
                onClick={() => setIsOpen(false)}
                className="block md:hidden text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Lista de Cards */}
          <div className="max-h-[60vh] md:max-h-[26rem] overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-400">
                  Nenhuma notificação por aqui.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`group relative flex flex-col p-3.5 rounded-2xl border backdrop-blur-sm transition-all duration-200 shadow-sm ${typeStyles[notif.type] || "bg-white border-slate-100 text-slate-900"}`}
                >
                  {/* Sub-cabeçalho do Card */}
                  <div className="flex items-center justify-between mb-1.5 opacity-60">
                    <div className="flex items-center gap-1.5">
                      {notif.type === "danger" && (
                        <XCircle className="h-3.5 w-3.5" />
                      )}
                      {notif.type === "warning" && (
                        <AlertTriangle className="h-3.5 w-3.5" />
                      )}
                      {notif.type === "info" && (
                        <Info className="h-3.5 w-3.5" />
                      )}
                      <span className="text-[11px] font-bold tracking-wide uppercase">
                        {notif.title}
                      </span>
                    </div>

                    {/* Botão de Fechar Individual */}
                    <button
                      onClick={() => removeNotification(notif.id)}
                      className="p-1 rounded-full hover:bg-black/5 text-current transition-colors"
                      aria-label="Remover notificação"
                    >
                      <X className="h-3 w-3 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Conteúdo da Notificação */}
                  <p className="text-[13px] font-medium leading-normal pr-4 opacity-90">
                    {notif.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
