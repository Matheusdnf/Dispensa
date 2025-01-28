"use client";
import card from "@/app/style/card.module.css";
import { useState } from "react";
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

export function Card_Product({ itens }) {
  //Manipuladores de Evento
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  //Caso a imagem apresente error chama essa função
  const handleError = () => {
    setImgSrc("/img/compartilhado.png");
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  if (itens.length === 0) {
    return (
      <div
        className="d-grid justify-items-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-center mb-32">Nada ainda</h1>
      </div>
    );
  }
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {itens.map((p, index) => (
        <div
          //interpolação de string ${}$ -- diferentes classes Css podem ser aplicadas a depender da situação
          className={`card m-3 ${card.card} ${
            //caso essa comparação seja atendida o efeito de hover é aplicado
            hoveredIndex === index ? card.cardHovered : ""
          }`}
          key={index}
          //está ecima do mouse
          onMouseEnter={() => handleMouseEnter(index)}
          //não está encima do mouse
          onMouseLeave={handleMouseLeave}
        >
          <img
            //manipulador de evento para pegar a imagem atual
            src={imgSrc || p.img}
            className="card-img-top"
            alt={p.name}
            //caso a imagem tenha dado error, chamar uma imagem diferente no lugar
            onError={handleError}
          />
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text m-1">{p.description}</p>
            <p className="card-text">Validade: {p.validate}</p>
            <a href="#" className="btn btn-primary">
              Saiba mais
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page_products() {
  return (
    <div>
      <Card_Product itens={products} />
    </div>
  );
}
