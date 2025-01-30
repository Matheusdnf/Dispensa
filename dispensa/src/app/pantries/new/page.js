"use client";
import { handleChange } from "@/app/lib/validations/page";
import { validate_name } from "@/app/lib/validations/page";
import { useState } from "react";
import { useAuth } from "@/app/lib/auth";
import { createPantry } from "@/app/lib/pantries";
import { useRouter } from "next/navigation";
export function PantryForm({
  Name,
  setName,
  Description,
  setDescription,
  image,
  setImage,
}) {
  const { user } = useAuth();
  const [NameError, setNameError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
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

    if (!hasError) {
      const result = await createPantry(Name, Description, image, user.id);

      if (result.error) {
        console.log("Erro no envio ao banco", result.error);
      }

      console.log("Formulário enviado com sucesso!", {
        Name,
        Description,
        image,
      });
      setsuccessmensage("Cadastro Realizado com Sucesso!");
      setTimeout(() => {
        setsuccessmensage("");
        router.push("/pentries");
      }, 2000);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar Despensa</h1>
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
        {successmensage && (
          <div className="alert alert-success mt-3">{successmensage}</div>
        )}
      </form>
    </div>
  );
}

export default function Login_Pantries() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <PantryForm
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
