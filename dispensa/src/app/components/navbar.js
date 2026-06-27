import Link from "next/link";

/**
 * Cabeçalho de marca. Mostra o logo + título à esquerda e um slot opcional de
 * ações à direita (botões), como no wireframe da homepage.
 */
export function Navbar({ text = "Despensa Virtual", route = "/", actions = null }) {
  return (
    <nav
      className="navbar bg-white shadow-sm"
      aria-label="Navegação principal"
    >
      <div className="container-fluid d-flex align-items-center justify-content-between gap-3">
        <Link
          className="navbar-brand d-flex align-items-center text-decoration-none m-0"
          href={route}
        >
          {/* Logo decorativo: o nome ao lado já identifica a marca (alt vazio) */}
          <img
            src="/img/compartilhado.png"
            alt=""
            width="28"
            height="28"
            className="d-inline-block me-2"
          />
          <span className="fw-semibold text-dark">{text}</span>
        </Link>
        {actions && (
          <div className="d-flex align-items-center gap-2 flex-wrap">{actions}</div>
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
      className="navbar bg-white shadow-sm px-3 px-md-4 py-3"
      aria-label={name_nav_bar}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between gap-3 flex-wrap">
        <div className="d-flex align-items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="btn btn-outline-secondary btn-sm"
              aria-label={backLabel}
            >
              <span aria-hidden="true">←</span> {backLabel}
            </Link>
          )}
          <h1 className="h4 m-0">{name_nav_bar}</h1>
          {Dropdown}
        </div>
        {actions && (
          <div className="d-flex align-items-center gap-2 flex-wrap">{actions}</div>
        )}
      </div>
    </nav>
  );
}
