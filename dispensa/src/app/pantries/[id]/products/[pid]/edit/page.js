"use client";
import { handleChange, validate_Date } from "@/app/lib/validations/page";
import { validate_name } from "@/app/lib/validations/page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase/SupabaseClient";
import { editProduct } from "@/app/lib/products"; // Importar função de edição de produto

export function ProductForm({
  Name,
  setName,
  Description,
  setDescription,
  Validate,
  setValidate,
  productId, // Recebe o ID do produto como prop
}) {
  const [NameError, setNameError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
  const [ValidateError, setValidateError] = useState("");
  const [successmensage, setsuccessmensage] = useState("");
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

    if (!hasError && userId) {
      try {
        // Chama a função de edição de produto
        const { data, error } = await editProduct(
          productId, // ID do produto
          Name,
          Description,
          Validate, // Data de validade
          userId
        );

        if (error) {
          console.error("Erro ao editar produto:", error);
          setsuccessmensage("Erro ao editar produto. Tente novamente.");
        } else {
          console.log("Produto atualizado com sucesso:", data);
          setsuccessmensage("Edição Realizada com Sucesso!");
          setTimeout(() => {
            setsuccessmensage("");
            router.push("/products"); // Redireciona para a lista de produtos
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao editar produto:", error.message);
        setsuccessmensage("Erro ao editar produto. Tente novamente.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Editar Produto</h1>
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
            {ValidateError && (
              <div className="text-danger">{ValidateError}</div>
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

export default function EditProductPage({ params }) {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Validate, setValidate] = useState("");
  const productId = params.pid; // Captura o ID do produto da URL

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ProductForm
        Name={Name}
        setName={setName}
        Description={Description}
        setDescription={setDescription}
        Validate={Validate}
        setValidate={setValidate}
        productId={productId} // Passa o ID do produto como prop
      />
    </div>
  );
}
