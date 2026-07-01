"use client";
import { handleChange, validate_name } from "@/app/lib/validations";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { editPantry, fetchPantry } from "@/app/lib/pantries";
import { Nav_bar_itens } from "@/app/components/navbar";
import { Save, Type, AlignLeft, Image as ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav_bar_itens
        name_nav_bar="Editar Despensa"
      />

      <main
        id="main-content"
        className="flex-1 flex justify-center items-start p-4 sm:p-6"
      >
        <form
          id="pantry-form"
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mt-4"
        >
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Editar Despensa</h2>
            <p className="text-sm text-gray-500">Atualize as informações do seu espaço.</p>
          </div>

          {formError && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 border border-red-100" role="alert">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
              <span>{formError}</span>
            </div>
          )}
          {success && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-800 border border-green-100" role="status">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="pantry-name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Nome da despensa
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Type className="h-4.5 w-4.5" />
              </div>
              <input
                id="pantry-name"
                type="text"
                placeholder="Ex: Minha Casa"
                className={`block w-full pl-10 pr-4 py-2.5 bg-white border ${nameError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-shadow`}
                value={name}
                onChange={(e) => handleChange(e, setName)}
                aria-invalid={nameError ? "true" : "false"}
                aria-describedby={nameError ? "pantry-name-error" : undefined}
              />
            </div>
            {nameError ? (
              <p id="pantry-name-error" className="text-red-500 text-xs mt-1.5 font-medium">
                {nameError}
              </p>
            ) : (
              <p className="text-gray-400 text-xs mt-1.5">
                Escolha um nome fácil de lembrar.
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="pantry-description" className="block text-sm font-medium text-gray-700 mb-1.5">
              Descrição
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 pt-3 pointer-events-none text-gray-400">
                <AlignLeft className="h-4.5 w-4.5" />
              </div>
              <textarea
                id="pantry-description"
                rows="3"
                placeholder="Descreva esta despensa..."
                className={`block w-full pl-10 pr-4 py-2.5 bg-white border ${descriptionError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-shadow resize-none`}
                value={description}
                onChange={(e) => handleChange(e, setDescription)}
                aria-invalid={descriptionError ? "true" : "false"}
                aria-describedby={descriptionError ? "pantry-description-error" : undefined}
              />
            </div>
            {descriptionError ? (
              <p id="pantry-description-error" className="text-red-500 text-xs mt-1.5 font-medium">
                {descriptionError}
              </p>
            ) : (
              <p className="text-gray-400 text-xs mt-1.5">
                Ex: Despensa da casa de praia.
              </p>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="pantry-image" className="block text-sm font-medium text-gray-700 mb-1.5">
              Trocar imagem (opcional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <ImageIcon className="h-4.5 w-4.5" />
              </div>
              <input
                id="pantry-image"
                type="file"
                accept="image/*"
                className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl text-sm text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer shadow-sm transition-shadow"
                onChange={handleFileChange}
              />
            </div>
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    className="h-32 w-32 object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
            <Link
              href="/pantries"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98] no-underline"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] cursor-pointer border-0"
            >
              <Save className="h-4 w-4" />
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
