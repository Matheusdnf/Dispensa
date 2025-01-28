"use client";
import { handleChange, validate_Date } from "@/app/lib/validations/page";
import { validate_name } from "@/app/lib/validations/page";
import { useState } from "react";

export function Form_produto({
  Name,
  setName,
  Description,
  setDescription,

  image,
  setImage,
}) {
  const [NameError, setNameError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

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

    if (!hasError) {
      console.log("Formulário enviado com sucesso!", {
        Name,
        Description,
        Validate,
        image,
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar Dispensa</h1>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="col-12 col-md-5 mb-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => handleChange(e, setName)}
                value={Name}
              />
              {NameError && <div className="text-danger">{NameError}</div>}
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
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
                type="text"
                className="form-control"
                placeholder="Usuários"
              />
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="imageUpload" className="form-label">
              Imagem:
            </label>
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />

            {imagePreview && (
              <div className="d-flex justify-content-center mt-3">
                <img
                  src={imagePreview}
                  alt="Imagem selecionada"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  className="img-fluid"
                />
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <button className="btn btn-primary mt-3" type="submit">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Login() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  return (
    <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-4">
      <Form_produto
        Name={Name}
        setName={setName}
        Description={Description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
      />
    </div>
  );
}
