"use client";
import { handleChange } from "@/app/lib/validations/page";
import { validate_name } from "@/app/lib/validations/page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { editPantry } from "@/app/lib/pantries";
import { supabase } from "@/app/lib/supabase/SupabaseClient";
import { use } from "react";
import { Navbar } from "@/app/components/navbar";

export function PantryForm({
  Name,
  setName,
  Description,
  setDescription,
  image,
  setImage,
  pantryId, // Recebe o ID da despensa como prop
}) {
  const [NameError, setNameError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
  const [successmensage, setsuccessmensage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário logado
  const router = useRouter();

  // Função para obter o ID do usuário logado
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    fetchUser();
  }, []);

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

    if (!hasError && userId) {
      try {
        const { data, error } = await editPantry(
          pantryId,
          Name,
          Description,
          image,
          userId
        );

        if (error) {
          console.error("Erro ao editar despensa:", error);
          setsuccessmensage("Erro ao editar despensa. Tente novamente.");
        } else {
          console.log("Despensa atualizada com sucesso:", data);
          setsuccessmensage("Edição Realizada com Sucesso!");
          setTimeout(() => {
            setsuccessmensage("");
            router.push("/pantries");
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao editar despensa:", error.message);
        setsuccessmensage("Erro ao editar despensa. Tente novamente.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="p-5">Editar Dispensa</h1>
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

          <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="btn btn-primary mt-3" type="submit">
              Editar
            </button>
          </div>
          {successmensage && (
            <div className="alert alert-success mt-3">{successmensage}</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default function EditPantryPage({ params }) {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Captura o ID da despensa da URL
  const pantryId = use(params).id;

  return (
    <div>
      <Navbar route={"../pantries"} text={"Edição de Dispensa"} />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <PantryForm
          Name={Name}
          setName={setName}
          Description={Description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          pantryId={pantryId} // Passa o ID da despensa como prop
        />
      </div>
    </div>
  );
}
