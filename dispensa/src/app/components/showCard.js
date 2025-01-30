import card from "@/app/style/card.module.css";
import { useState } from "react";
import { Not_information } from "./not_information";
import Link from "next/link";
import { Modal_function, Modal_function_pratries } from "./modal";

export function ShowCard({ itens, ismodal, button_pantries }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imgSrc, setImgSrc] = useState("/img/invalid.jpg"); // Definir a imagem padrão diretamente

  // Caso a imagem apresente erro, chama essa função
  const handleError = () => {
    setImgSrc("/img/invalid.jpg");
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
        console.log(p),
        <div
          className={`card m-3 ${card.card} ${
            hoveredIndex === index ? card.cardHovered : ""
          }`}
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={p.img || imgSrc} // Usar a imagem original se existir, caso contrário, usar a imagem padrão
            className="card-img-top"
            alt={p.name}
            onError={handleError} // Chamar handleError se a imagem falhar ao carregar
          />
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text m-1">{p.description}</p>
            {p.validate && <p className="card-text">Validade: {p.validate}</p>}
            {ismodal ? (
              <Modal_function pantryId={p.pantry_id} productId={p.id} />
            ) : (
              <Link
                className="btn btn-primary"
                href={`/pantries/${p.id}/products/`}
              >
                Saber mais Informação
              </Link>
            )}
            {button_pantries && (
              <div className="pt-2">
                <Modal_function_pratries
                  pantryId={p.id}
                  productId={p.id} // Aqui também usamos p.id
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
