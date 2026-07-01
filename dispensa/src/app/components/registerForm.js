"use client";
import {
  validateEmail,
  validatePassword,
  handleChange,
  validate_name,
} from "@/app/lib/validations";
import { useState } from "react";
import { signupUser } from "../lib/signupUser";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, User, Mail, Lock, AlertCircle } from "lucide-react";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    let hasError = false;
    if (!validate_name(username)) {
      setUsernameError("O nome deve ter entre 3 e 30 caracteres.");
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!validateEmail(email)) {
      setEmailError("Informe um e-mail válido.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "A senha deve ter ao menos 6 caracteres, incluindo maiúscula, minúscula, número e caractere especial."
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    const response = await signupUser(email, password, username);
    if (response.error) {
      setFormError(response.error);
      return;
    }
    router.push("/pantries");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Criar uma conta</h1>
        <p className="text-sm text-gray-500">Junte-se a nós para gerenciar sua despensa inteligente.</p>
      </div>

      {formError && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800 border border-red-100" role="alert">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div className="mb-5">
        <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nome
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <User className="h-4.5 w-4.5" />
          </div>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            placeholder="Como devemos chamar você?"
            className={`block w-full pl-10 pr-4 py-2.5 bg-white border ${usernameError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-shadow`}
            value={username}
            onChange={(e) => handleChange(e, setUsername)}
            aria-invalid={usernameError ? "true" : "false"}
            aria-describedby={usernameError ? "register-name-error" : undefined}
          />
        </div>
        {usernameError ? (
          <p id="register-name-error" className="text-red-500 text-xs mt-1.5 font-medium">
            {usernameError}
          </p>
        ) : (
          <p className="text-gray-400 text-xs mt-1.5">
            Mínimo de 3 caracteres.
          </p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          E-mail
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            className={`block w-full pl-10 pr-4 py-2.5 bg-white border ${emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-shadow`}
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
            aria-invalid={emailError ? "true" : "false"}
            aria-describedby={emailError ? "register-email-error" : undefined}
          />
        </div>
        {emailError ? (
          <p id="register-email-error" className="text-red-500 text-xs mt-1.5 font-medium">
            {emailError}
          </p>
        ) : (
          <p className="text-gray-400 text-xs mt-1.5">
            Enviaremos informações importantes para este e-mail.
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1.5">
          Senha
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Lock className="h-4.5 w-4.5" />
          </div>
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            className={`block w-full pl-10 pr-11 py-2.5 bg-white border ${passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-shadow`}
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby={passwordError ? "register-password-error" : undefined}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
        {passwordError ? (
          <p id="register-password-error" className="text-red-500 text-xs mt-1.5 font-medium">
            {passwordError}
          </p>
        ) : (
          <p className="text-gray-400 text-xs mt-1.5">
            Ao menos 6 caracteres, com maiúscula, minúscula, número e símbolo.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-0"
      >
        <UserPlus className="h-4.5 w-4.5" />
        Registrar e Continuar
      </button>
    </form>
  );
}
