"use client";
import { handleChange, validate_name } from "@/app/lib/validations";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { editPantry, fetchPantry } from "@/app/lib/pantries";
import { Nav_bar_itens } from "@/app/components/navbar";
import form_style from "@/app/style/form.module.css";

export default function EditPantryPage({ params }) {
  const pantryId = use(params).id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchPantry(pantryId).then((data) => {
      if (data) {
        setName(data.name ?? "");
        setDescription(data.description ?? "");
      }
    });
  }, [pantryId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    let hasError = false;
    if (!validate_name(name)) {
      setNameError("O nome deve ter entre 3 e 30 caracteres.");
      hasError = true;
    } else {
      setNameError("");
    }
    if (!validate_name(description)) {
      setDescriptionError("A descrição deve ter entre 3 e 30 caracteres.");
      hasError = true;
    } else {
      setDescriptionError("");
    }
    if (hasError) return;

    const result = await editPantry(pantryId, name, description, image);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    setSuccess("Despensa atualizada com sucesso!");
    setTimeout(() => router.push("/pantries"), 1200);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav_bar_itens
        name_nav_bar="Editar Despensa"
        actions={
          <button type="submit" form="pantry-form" className="btn btn-primary">
            Salvar
          </button>
        }
      />

      <main
        id="main-content"
        className="flex-fill d-flex justify-content-center p-3"
      >
        <form
          id="pantry-form"
          onSubmit={handleSubmit}
          noValidate
          className={form_style.form}
        >
          {formError && (
            <div className="alert alert-danger" role="alert">
              {formError}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="status">
              {success}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="pantry-name" className="form-label">
              Nome da despensa
            </label>
            <input
              id="pantry-name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => handleChange(e, setName)}
              aria-invalid={nameError ? "true" : "false"}
              aria-describedby={nameError ? "pantry-name-error" : undefined}
            />
            {nameError && (
              <p id="pantry-name-error" className="text-danger small mt-1 mb-0">
                {nameError}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="pantry-description" className="form-label">
              Descrição
            </label>
            <input
              id="pantry-description"
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => handleChange(e, setDescription)}
              aria-invalid={descriptionError ? "true" : "false"}
              aria-describedby={
                descriptionError ? "pantry-description-error" : undefined
              }
            />
            {descriptionError && (
              <p
                id="pantry-description-error"
                className="text-danger small mt-1 mb-0"
              >
                {descriptionError}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="pantry-image" className="form-label">
              Trocar imagem
            </label>
            <input
              id="pantry-image"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="mt-3 text-center">
                <img
                  src={imagePreview}
                  alt="Pré-visualização da imagem da despensa"
                  className={form_style.preview}
                />
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
