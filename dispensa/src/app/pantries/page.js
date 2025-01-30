"use client";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "../components/navbar";
import { Dropdown_Pentries, Dropdown_Products } from "../components/dropdown";
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
      <Nav_bar_itens
        name_nav_bar={"Sessão de Dispensas"}
        Dropdown={<Dropdown_Pentries />}
      />
      <ShowCard itens={products} ismodal={false} button_pantries={true} />
    </div>
  );
}
