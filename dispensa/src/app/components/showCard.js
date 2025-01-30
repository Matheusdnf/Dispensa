import card from "@/app/style/card.module.css";
import { useState } from "react";
import { Not_information } from "./not_information";
import Link from "next/link";
import { Modal_function, Modal_function_pratries } from "./modal";

export function ShowCard({ itens, ismodal, button_pantries }) {
  // Manipuladores de Evento
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imgSrc, setImgSrc] = useState("");

  // Caso a imagem apresente erro, chama essa função
  const handleError = (index) => {
    setImgSrc((prev) => ({
      ...prev,
      [index]: "/img/invalid.jpg",
    }));
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  if (itens.length === 0) {
    return <Not_information menssage={"Nenhum Dado Cadastrado"} />;
  }

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {itens.map((p, index) => (
        <div
          // Interpolação de string ${}$ -- diferentes classes CSS podem ser aplicadas dependendo da situação
          className={`card m-3 ${card.card} ${
            // Caso essa comparação seja atendida, o efeito de hover é aplicado
            hoveredIndex === index ? card.cardHovered : ""
          }`}
          key={index}
          // Está em cima do mouse
          onMouseEnter={() => handleMouseEnter(index)}
          // Não está em cima do mouse
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imgSrc[index] || p.img}
            className="card-img-top"
            alt={p.name}
            onError={() => handleError(index)}
          />
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text m-1">{p.description}</p>
            {p.validate && <p className="card-text">Validade: {p.validate}</p>}
            {/* Rota que irá levar para os produtos específicos */}
            {ismodal ? (
              <Modal_function pantryId={p.id} productId={p.productId} />
            ) : (
              <Link
                className="btn btn-primary"
                href={`/pantries/${p.id}/products`}
              >
                Saber mais Informação
              </Link>
            )}
            {button_pantries && (
              <div className="pt-2">
                <Modal_function_pratries pantryId={p.id} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
