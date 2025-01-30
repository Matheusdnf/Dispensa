import Link from "next/link";
export function Navbar({ text, route = "/" }) {
  return (
    <nav className="navbar bg-body-none shadow-sm">
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center text-decoration-none"
          href={route}
          style={{ cursor: "default" }}
        >
          <img
            src="/img/Compartilhado.png"
            alt="Logo"
            width="20"
            height="20"
            className="d-inline-block me-2"
          />
          <span style={{ position: "relative", top: "-2px" }}>{text}</span>
        </Link>
      </div>
    </nav>
  );
}

export function Nav_bar_itens({ name_nav_bar, Dropdown }) {
  return (
    <div>
      <nav className="shadow-sm p-4 navbar navbar-light bg-light d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <h4 className="size-11 me-3">{name_nav_bar}</h4>
          {Dropdown}
        </div>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Pesquisar"
            aria-label="Pesquisar"
          />
          <button className="btn btn-outline-success" type="submit">
            Pesquisar
          </button>
        </form>
      </nav>
    </div>
  );
}
