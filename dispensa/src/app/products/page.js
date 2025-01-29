"use client";
import { ShowCard } from "@/app/components/showCard";

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
      <ShowCard itens={products} />
    </div>
  );
}
