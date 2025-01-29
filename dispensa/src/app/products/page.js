"use client";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "../components/navbar";
import { Dropdown_Products } from "../components/dropdown";
const products = [
  {
    name: "Produto 1",
    description: "Descrição do Produto 1",
    image: "https://example.com/images/produto1.jpg",
    validate: "2025-12-31",
  },
  {
    name: "Produto 2",
    description: "Descrição do Produto 2",
    image: "https://example.com/images/produto2.jpg",
    validate: "2025-11-30",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
    validate: "2025-10-15",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
    validate: "2025-10-15",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
    validate: "2025-10-15",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
    validate: "2025-10-15",
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    image: "https://example.com/images/produto3.jpg",
    validate: "2025-10-15",
  },
];

export default function Page_products() {
  return (
    <div>
      <Nav_bar_itens
        name_nav_bar={"Sessão de Produtos"}
        Dropdown={<Dropdown_Products />}
      />
      <ShowCard itens={products} ismodal={true} />
    </div>
  );
}
