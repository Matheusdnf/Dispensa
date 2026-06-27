"use client";
import { handleChange, validate_name, validate_Date } from "@/app/lib/validations";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { editProduct, fetchProduct } from "@/app/lib/products";
import { Nav_bar_itens } from "@/app/components/navbar";
import form_style from "@/app/style/form.module.css";

export default function EditProductPage() {
  const { id: pantryId, pid: productId } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validate, setValidate] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [validateError, setValidateError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProduct(productId).then((data) => {
      if (data) {
        setName(data.name ?? "");
        setDescription(data.description ?? "");
        setQuantity(data.quantity ?? "");
        setValidate(data.expiration ?? "");
      }
    });
  }, [productId]);

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
    if (validate && !validate_Date(validate)) {
      setValidateError("Informe uma data de validade válida.");
      hasError = true;
    } else {
      setValidateError("");
    }
    if (hasError) return;

    const { error } = await editProduct(
      productId,
      name,
      description,
      quantity,
      null,
      validate
    );
    if (error) {
      setFormError(error);
      return;
    }
    setSuccess("Produto atualizado com sucesso!");
    setTimeout(() => router.push(`/pantries/${pantryId}/products`), 1200);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav_bar_itens
        name_nav_bar="Editar Produto"
        backHref={`/pantries/${pantryId}/products`}
        actions={
          <button type="submit" form="product-form" className="btn btn-primary">
            Salvar
          </button>
        }
      />

      <main
        id="main-content"
        className="flex-fill d-flex justify-content-center p-3"
      >
        <form
          id="product-form"
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
            <label htmlFor="product-name" className="form-label">
              Nome
            </label>
            <input
              id="product-name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => handleChange(e, setName)}
              aria-invalid={nameError ? "true" : "false"}
              aria-describedby={nameError ? "product-name-error" : undefined}
            />
            {nameError && (
              <p id="product-name-error" className="text-danger small mt-1 mb-0">
                {nameError}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="product-description" className="form-label">
              Descrição
            </label>
            <input
              id="product-description"
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => handleChange(e, setDescription)}
              aria-invalid={descriptionError ? "true" : "false"}
              aria-describedby={
                descriptionError ? "product-description-error" : undefined
              }
            />
            {descriptionError && (
              <p
                id="product-description-error"
                className="text-danger small mt-1 mb-0"
              >
                {descriptionError}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="product-quantity" className="form-label">
              Quantidade
            </label>
            <input
              id="product-quantity"
              type="number"
              min="0"
              className="form-control"
              value={quantity}
              onChange={(e) => handleChange(e, setQuantity)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="product-validity" className="form-label">
              Validade
            </label>
            <input
              id="product-validity"
              type="date"
              className="form-control"
              value={validate}
              onChange={(e) => handleChange(e, setValidate)}
              aria-invalid={validateError ? "true" : "false"}
              aria-describedby={
                validateError ? "product-validity-error" : undefined
              }
            />
            {validateError && (
              <p
                id="product-validity-error"
                className="text-danger small mt-1 mb-0"
              >
                {validateError}
              </p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
