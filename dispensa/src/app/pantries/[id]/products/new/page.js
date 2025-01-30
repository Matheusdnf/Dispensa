"use client";
import { handleChange, validate_Date } from "@/app/lib/validations/page";
import { validate_name } from "@/app/lib/validations/page";
import { useState } from "react";
import { createProduct } from "@/app/lib/products";
import { useRouter } from "next/navigation";
export function ProductForm({
  Name,
  setName,
  Description,
  setDescription,
  Validate,
  setValidate,
  image,
  setImage,
}) {
  const [NameError, setNameError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
  const [ValidateError, setValidateError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [successmensage, setsuccessmensage] = useState("");
  const router = useRouter();
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
  const handleSubmit = async (e) => {
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
      const response = await createProduct(
        Name,
        Description,
        image,
        10,
        "06ab96d3-b579-45dd-97ad-ed047ac2a583",
        Validate,
        null
      );

      if (response.error) {
        console.log("Erro ao cadastrar produto", response.error);
      } else {
        console.log("Produto cadastrado com sucesso");
      }

      console.log("Formulário enviado com sucesso!", {
        Name,
        Description,
        Validate,
        image,
      });
      setsuccessmensage("Cadastro Realizado com Sucesso!");
      setTimeout(() => {
        setsuccessmensage("");
        router.push("/products");
      }, 2000);
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
        {successmensage && (
          <div className="alert alert-success mt-3">{successmensage}</div>
        )}
      </form>
    </div>
  );
}

export default function Login_Products() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Validate, setValidate] = useState("");
  const [image, setImage] = useState(null);

  return (
    <div>
      <ProductForm
        Name={Name}
        setName={setName}
        Description={Description}
        setDescription={setDescription}
        Validate={Validate}
        setValidate={setValidate}
        image={image}
        setImage={setImage}
      />
    </div>
  );
}
