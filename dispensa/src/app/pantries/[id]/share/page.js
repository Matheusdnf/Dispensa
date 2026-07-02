"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Nav_bar_itens } from "@/app/components/navbar";
import {
  fetchShares,
  addShare,
  removeShare,
  updateShareRole,
} from "@/app/lib/shares";
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
  MoreVertical,
  Eye,
  ShieldAlert,
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

  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

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
  }, [id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setActiveMenuId(null);
    const result = await removeShare(id, userId);
    if (result.error) {
      setFormError(result.error);
      return;
    }
    setMembers((prev) => prev.filter((m) => m.id !== userId));
    setSuccess("Acesso revogado com sucesso!");
  };

  const handleRoleChange = async (userId, newRole) => {
    setFormError("");
    setSuccess("");
    setActiveMenuId(null);
    const result = await updateShareRole(id, userId, newRole);
    if (result.error) {
      setFormError(result.error);
      await load();
      return;
    }
    setMembers((prev) =>
      prev.map((m) => (m.id === userId ? { ...m, role: newRole } : m)),
    );
    setSuccess("Permissão atualizada com sucesso!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav_bar_itens name_nav_bar="Compartilhar despensa" />

      <main
        id="main-content"
        className="flex-1 flex justify-start items-start p-4 sm:p-6 w-full max-w-4xl mx-auto"
      >
        {loading ? (
          <div
            className="flex justify-center items-center h-32 w-full"
            role="status"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="sr-only">Carregando…</span>
          </div>
        ) : denied ? (
          <div
            className="w-full mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800 border border-red-100"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            <span>
              Você não tem permissão para gerenciar as pessoas desta despensa.
            </span>
          </div>
        ) : (
          <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mt-4 flex flex-col items-start text-left">
            <div className="mb-6 w-full text-left">
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
                className="mb-6 w-full flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 border border-red-100"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
            {success && (
              <div
                className="mb-6 w-full flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-800 border border-green-100"
                role="status"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Lista de Pessoas com acesso */}
            <div className="mb-8 w-full text-left">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2 w-full">
                Pessoas com acesso
              </h3>
              <ul className="space-y-3 w-full p-0 m-0">
                {owner && (
                  <li className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-100 w-full">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="p-2 bg-indigo-100 text-indigo-700 rounded-full shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {owner.username}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[140px] sm:max-w-none">
                          {owner.email}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100/60 shrink-0">
                      <Shield className="h-3 w-3" />
                      Dono
                    </span>
                  </li>
                )}

                {members.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md/40 transition-all duration-200 w-full relative"
                  >
                    {/* Bloco da Esquerda: Dados Textuais sem interferência de Badges */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="p-2 bg-slate-50 text-slate-500 rounded-full shrink-0 border border-slate-100">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {m.username}
                        </span>
                        <span className="text-xs text-slate-500 truncate max-w-[140px] sm:max-w-none">
                          {m.email}
                        </span>
                      </div>
                    </div>

                    {/* Bloco da Direita: Alinhado e idêntico à tag do Dono, ao lado dos 3 pontos */}
                    <div
                      className="flex items-center gap-2.5 shrink-0 ml-auto"
                      ref={activeMenuId === m.id ? menuRef : null}
                    >
                      {/* Badge de Cargo (Colaborador / Leitor) no mesmo estilo do Dono */}
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
                          m.role === "leitor"
                            ? "bg-blue-50 text-blue-700 border-blue-100/60"
                            : "bg-emerald-50 text-emerald-700 border-emerald-100/60"
                        }`}
                      >
                        {m.role === "leitor" ? "Leitor" : "Colaborador"}
                      </span>

                      {/* Badge Pendente (Opcional) */}
                      {m.status === "pending" && (
                        <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-1 rounded-lg font-bold border border-amber-100 uppercase tracking-wider shrink-0">
                          Pend.
                        </span>
                      )}

                      {/* Gatilho dos 3 Pontinhos */}
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(activeMenuId === m.id ? null : m.id)
                        }
                        className="p-1.5 rounded-xl hover:bg-slate-50 text-slate-500 transition focus:outline-none shrink-0"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {/* Dropdown de contexto flutuante */}
                      {activeMenuId === m.id && (
                        <div className="absolute right-4 top-14 w-52 bg-white border border-slate-200 shadow-xl rounded-2xl py-1.5 z-40 origin-top-right">
                          <button
                            type="button"
                            onClick={() =>
                              handleRoleChange(
                                m.id,
                                m.role === "leitor" ? "colaborador" : "leitor",
                              )
                            }
                            className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            {m.role === "leitor" ? (
                              <>
                                <ShieldAlert className="h-4 w-4 text-emerald-500" />
                                Tornar Colaborador
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 text-blue-500" />
                                Tornar Leitor
                              </>
                            )}
                          </button>
                          <div className="h-[1px] bg-slate-100 my-1 mx-2" />
                          <button
                            type="button"
                            onClick={() => handleRemove(m.id)}
                            className="w-full px-4 py-2.5 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <UserMinus className="h-4 w-4" />
                            Revogar Acesso
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}

                {members.length === 0 && (
                  <li className="p-5 text-center text-sm font-medium text-gray-400 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 w-full">
                    Nenhuma outra pessoa tem acesso.
                  </li>
                )}
              </ul>
            </div>

            {/* Formulário de Convite */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full text-left"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
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
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="share-email"
                    type="email"
                    placeholder="amigo@email.com"
                    className={`block w-full pl-10 pr-4 py-2.5 bg-white border ${emailError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"} rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-all`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-1.5 font-semibold">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="mb-5">
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
                  className="block w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-all cursor-pointer"
                >
                  <option value="colaborador">Colaborador</option>
                  <option value="leitor">Leitor</option>
                </select>

                <p className="text-[11px] text-slate-400 mt-1.5 font-medium pl-1">
                  {role === "colaborador"
                    ? "• Pode visualizar, adicionar e editar produtos."
                    : "• Acesso restrito apenas à visualização dos produtos."}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href={`/pantries/${id}/products`}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98] no-underline"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition active:scale-[0.98] cursor-pointer border-0"
                >
                  <UserPlus className="h-4 w-4 stroke-[2]" />
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
