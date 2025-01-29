"use client";
import { handleChange, validate_Date } from "@/app/lib/validations/page";
import { validate_name } from "@/app/lib/validations/page";
import { useState } from "react";

export default function productForm({
  Name,
  setName,
  Description,
  setDescription,
  Validate,
  setValidate,
}) {
  const [NameError, setNameError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
  const [ValidateError, setValidateError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!validate_name(Name)) {
      setNameError(
        <div>
          <ul>
            <li>Ter no mínimo 3 Letras e no máximo 30</li>
          </ul>
        </div>
      );
      hasError = true;
    } else {
      setNameError("");
    }

    if (!validate_name(Description)) {
      setDescriptionError(
        <div>
          <ul>
            <li>Ter no mínimo 3 Letras e no máximo 30</li>
          </ul>
        </div>
      );
      hasError = true;
    } else {
      setDescriptionError("");
    }

    if (!validate_Date(Validate)) {
      setValidateError(
        <div>
          <ul>
            <li>Digite Uma Data Válida</li>
          </ul>
        </div>
      );
      hasError = true;
    } else {
      setValidateError("");
    }
    if (!hasError) {
      console.log("Formulário enviado com sucesso!", {
        Name,
        Description,
        Validate,
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar Produto</h1>
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Nome"
              onChange={(e) => handleChange(e, setName)}
              value={Name}
            />
            {NameError && <div className="text-danger">{NameError}</div>}
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Descrição"
              onChange={(e) => handleChange(e, setDescription)}
              value={Description}
            />
            {DescriptionError && (
              <div className="text-danger">{DescriptionError}</div>
            )}
          </div>

          <div className="input-group mb-3">
            <input
              type="Date"
              className="form-control w-100"
              placeholder="Validade"
              onChange={(e) => handleChange(e, setValidate)}
              value={Validate}
            />
            <div>
              {ValidateError && (
                <div className="text-danger">{ValidateError}</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="btn  btn-primary mt-3" type="submit">
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
