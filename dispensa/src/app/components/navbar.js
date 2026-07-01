import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Cabeçalho de marca. Mostra o logo + título à esquerda e um slot opcional de
 * ações à direita (botões), como no wireframe da homepage.
 */
export function Navbar({
  text = "Despensa Virtual",
  route = "/",
  actions = null,
}) {
  return (
    <nav
      className="bg-[#1A188C] px-4 py-3 sticky top-0 z-50 shadow-md"
      aria-label="Navegação principal"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          className="group flex items-center gap-2.5 no-underline transition-opacity hover:opacity-90"
          href={route}
        >
          {/* Logo decorativo com transição suave */}
          <img
            src="/img/compartilhado.png"
            alt=""
            width="28"
            height="28"
            className="h-7 w-7 object-contain transition-transform group-hover:scale-105 brightness-0 invert"
          />
          <span className="text-lg font-semibold tracking-tight text-white">
            {text}
          </span>
        </Link>

        {actions && (
          <div className="flex items-center gap-2 flex-wrap text-white">
            {actions}
          </div>
        )}
      </div>
    </nav>
  );
}

/**
 * Cabeçalho de seção (listas). Título à esquerda (com dropdown opcional) e
 * ações à direita, como nas telas "Minhas Despensas" e "Despensa X".
 */
export function Nav_bar_itens({
  name_nav_bar,
  Dropdown,
  actions = null,
  backHref = null,
  backLabel = "Voltar",
}) {
  return (
    <nav
      className="bg-[#1A188C] px-3 py-3 md:px-6 md:py-4 shadow-md"
      aria-label={name_nav_bar}
    >
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center justify-center p-1.5 md:p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label={backLabel}
              title={backLabel}
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white m-0 truncate">
            {name_nav_bar}
          </h1>

          {Dropdown && (
            <div className="flex items-center text-white flex-shrink-0">{Dropdown}</div>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-1 md:gap-2 flex-nowrap text-white flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </nav>
  );
}
