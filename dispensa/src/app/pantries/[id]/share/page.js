"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchShares, addShare, removeShare } from "@/app/lib/shares";
import { validateEmail } from "@/app/lib/validations";
import {
  UserPlus,
  UserMinus,
  Users,
  Shield,
  User,
  Mail,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function SharePantryPage() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("colaborador");
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

    const result = await addShare(id, email, role);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    setEmail("");
    setRole("colaborador");
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav_bar_itens name_nav_bar="Compartilhar despensa" />

      <main
        id="main-content"
        className="flex-1 flex justify-center items-start p-4 sm:p-6"
      >
        {loading ? (
          <div className="flex justify-center items-center h-32" role="status">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="sr-only">Carregando…</span>
          </div>
        ) : denied ? (
          <div
            className="w-full max-w-lg mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800 border border-red-100"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            <span>
              Você não tem permissão para gerenciar as pessoas desta despensa.
            </span>
          </div>
        ) : (
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mt-4">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-full mb-3">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-1">
                Compartilhamento
              </h2>
              <p className="text-sm text-gray-500">
                Gerencie quem tem acesso a esta despensa.
              </p>
            </div>

            {formError && (
              <div
                className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 border border-red-100"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
            {success && (
              <div
                className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-800 border border-green-100"
                role="status"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">
                Pessoas com acesso
              </h3>
              <ul className="space-y-3">
                {owner && (
                  <li className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 text-indigo-700 rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {owner.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {owner.email}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <Shield className="h-3 w-3" />
                      Dono
                    </span>
                  </li>
                )}

                {members.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 text-gray-600 rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {m.username}
                        </span>
                        <span className="text-xs text-gray-500">{m.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${m.role === "leitor" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}
                      >
                        {m.role === "leitor" ? "Leitor" : "Colaborador"}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        {m.status === "pending" ? "(Pendente)" : ""}
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition active:scale-[0.98] cursor-pointer"
                        onClick={() => handleRemove(m.id)}
                        aria-label={`Remover ${m.email}`}
                      >
                        <UserMinus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}

                {members.length === 0 && (
                  <li className="p-4 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    Nenhuma outra pessoa tem acesso.
                  </li>
                )}
              </ul>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">
                Convidar pessoa
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="share-email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  E-mail do convidado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="share-email"
                    type="email"
                    placeholder="amigo@email.com"
                    className={`block w-full pl-10 pr-4 py-2.5 bg-white border ${emailError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"} rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-shadow`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={emailError ? "true" : "false"}
                    aria-describedby={
                      emailError ? "share-email-error" : undefined
                    }
                  />
                </div>
                {emailError && (
                  <p
                    id="share-email-error"
                    className="text-red-500 text-xs mt-1.5 font-medium"
                  >
                    {emailError}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="share-role"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Permissão
                </label>
                <select
                  id="share-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-shadow"
                >
                  <option value="colaborador">
                    Colaborador (Pode visualizar e adicionar produtos)
                  </option>
                  <option value="leitor">Leitor (Apenas visualização)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href={`/pantries/${id}/products`}
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98] no-underline"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] cursor-pointer border-0"
                >
                  <UserPlus className="h-4 w-4" />
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
