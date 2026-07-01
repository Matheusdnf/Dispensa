"use client";
import card from "@/app/style/card.module.css";
import Link from "next/link";
import { Not_information } from "./not_information";
import { Modal_function, Modal_function_pratries } from "./modal";
import { Eye } from "lucide-react";

export function ShowCard({ itens, ismodal, button_pantries, role }) {
  if (!itens || itens.length === 0) {
    return <Not_information menssage={"Nenhum dado cadastrado ainda."} />;
  }

  return (
    <ul className="row g-4 list-unstyled m-0 p-3 p-md-4">
      {itens.map((p) => (
        <li key={p.id} className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
          <div className={`card w-100 ${card.card}`}>
            <img
              src={p.image || "/img/invalid.jpg"}
              className={`card-img-top ${card.card_img}`}
              alt={p.name ? `Imagem de ${p.name}` : ""}
              onError={(e) => {
                e.currentTarget.src = "/img/invalid.jpg";
              }}
            />
            <div className="card-body d-flex flex-column">
              <h2 className="card-title h5 d-flex align-items-center gap-2">
                {p.name}
                {p.shared ? (
                  <span className="badge text-bg-secondary">Compartilhada</span>
                ) : null}
              </h2>
              {p.description && <p className="card-text">{p.description}</p>}
              {p.quantity != null && (
                <p className="card-text text-muted mb-1">
                  Quantidade: {p.quantity}
                </p>
              )}
              {p.expiration && (
                <p className="card-text text-muted">Validade: {p.expiration}</p>
              )}

              <div className="mt-auto d-flex flex-column gap-2 pt-2">
                {ismodal ? (
                  role === "admin" && (
                    <Modal_function pantryId={p.pantry_id} productId={p.id} productName={p.name} />
                  )
                ) : (
                  <Link
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
                    href={`/pantries/${p.id}/products/`}
                  >
                    <Eye className="h-4 w-4" />
                    Ver produtos
                  </Link>
                )}
                {button_pantries && !p.shared && <Modal_function_pratries pantryId={p.id} pantryName={p.name} />}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
