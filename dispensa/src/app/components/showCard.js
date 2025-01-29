import card from "@/app/style/card.module.css";
import { useState } from "react";
import { Not_information } from "./not_information";

export function ShowCard({ itens }) {
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
    return <Not_information menssage={"Nenhum Dado Cadastrado"} />;
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
            {p.validate && <p className="card-text">Validade: {p.validate}</p>}
            <a href="#" className="btn btn-primary">
              Ver Detalhes
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
