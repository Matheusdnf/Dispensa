import Link from "next/link";
export function Dropdown_Pentries() {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Ações Dispensa
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link href={"./pantries/new"} className="dropdown-item ">
            Cadastrar Dispensa
          </Link>
        </li>
        {/* <li>
          <Link href={"./pantries/edit"} className="dropdown-item">
            Editar Dispensa
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="#">
            Excluir Dispensa
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export function Dropdown_Products() {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Ações Do Produto
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link href={"./products/new"} className="dropdown-item ">
            Cadastrar Produto
          </Link>
        </li>
        {/* <li>
          <Link href={"#"} className="dropdown-item">
            Editar Produto
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="#">
            Excluir Produto
          </Link>
        </li> */}
      </ul>
    </div>
  );
}
