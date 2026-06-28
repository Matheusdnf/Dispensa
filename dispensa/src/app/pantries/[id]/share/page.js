"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchShares, addShare, removeShare } from "@/app/lib/shares";
import { validateEmail } from "@/app/lib/validations";
import form_style from "@/app/style/form.module.css";

export default function SharePantryPage() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const load = () => {
    return fetchShares(id).then((data) => {
      if (data.error) {
        setDenied(true);
        return;
      }
      setOwner(data.owner ?? null);
      setMembers(data.members ?? []);
    });
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setEmailError("Informe um e-mail válido.");
      return;
    }
    setEmailError("");

    const result = await addShare(id, email);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    setEmail("");
    setSuccess("Pessoa adicionada com sucesso!");
    await load();
  };

  const handleRemove = async (userId) => {
    setFormError("");
    setSuccess("");
    const result = await removeShare(id, userId);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    setMembers((prev) => prev.filter((m) => m.id !== userId));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav_bar_itens
        name_nav_bar="Compartilhar despensa"
        backHref={`/pantries/${id}/products`}
        backLabel="Voltar para a despensa"
      />

      <main
        id="main-content"
        className="flex-fill d-flex justify-content-center p-3"
      >
        {loading ? (
          <p className="p-4" role="status">
            Carregando…
          </p>
        ) : denied ? (
          <div className="alert alert-danger mt-4" role="alert">
            Você não tem permissão para gerenciar as pessoas desta despensa.
          </div>
        ) : (
          <div className={form_style.form}>
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

            <h2 className="h5">Pessoas com acesso</h2>
            <ul className="list-group mb-4">
              {owner && (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    {owner.username}{" "}
                    <span className="text-muted">({owner.email})</span>
                  </span>
                  <span className="badge text-bg-secondary">Dono</span>
                </li>
              )}
              {members.map((m) => (
                <li
                  key={m.id}
                  className="list-group-item d-flex justify-content-between align-items-center gap-2"
                >
                  <span>
                    {m.username}{" "}
                    <span className="text-muted">({m.email})</span>
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(m.id)}
                    aria-label={`Remover ${m.email}`}
                  >
                    Remover
                  </button>
                </li>
              ))}
              {members.length === 0 && (
                <li className="list-group-item text-muted">
                  Ainda não há ninguém além de você.
                </li>
              )}
            </ul>

            <form onSubmit={handleSubmit} noValidate>
              <h2 className="h5">Adicionar pessoa</h2>
              <div className="mb-3">
                <label htmlFor="share-email" className="form-label">
                  E-mail da pessoa
                </label>
                <input
                  id="share-email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={emailError ? "true" : "false"}
                  aria-describedby={emailError ? "share-email-error" : undefined}
                />
                {emailError && (
                  <p
                    id="share-email-error"
                    className="text-danger small mt-1 mb-0"
                  >
                    {emailError}
                  </p>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Adicionar
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
