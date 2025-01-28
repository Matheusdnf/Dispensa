export function Navbar() {
  return (
    <nav className="navbar bg-body-none">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex align-items-center text-decoration-none"
          href="#"
          style={{ cursor: "default" }}
        >
          <img
            src="/img/Compartilhado.png"
            alt="Logo"
            width="20"
            height="20"
            className="d-inline-block me-2"
          />
          <span style={{ position: "relative", top: "-2px" }}>
            Dispensa Compartilhada
          </span>
        </a>
      </div>
    </nav>
  );
}
