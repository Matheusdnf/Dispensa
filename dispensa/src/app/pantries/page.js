"use client";
import { ShowCard } from "@/app/components/showCard";

const products = [
  {
    name: "Produto 1",
    description: "Descrição do Produto 1",
    image: "https://example.com/images/produto1.jpg",
  },
  {
    name: "Produto 2",
    description: "Descrição do Produto 2",
    image: "https://example.com/images/produto2.jpg",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
  },
];
export default function scream_pantry() {
  return (
    <div>
      <Nav_bar_Pantry />
      <ShowCard itens={products} />
    </div>
  );
}

export function Nav_bar_Pantry() {
  return (
    <div>
      <nav className="p-4 navbar  navbar-light bg-light">
        <h4 className="size-11">Seção de despensas</h4>
        <form className="form-inline d-flex">
          <input
            className="form-control mr-2"
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
