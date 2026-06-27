"use client";
import {
  validateEmail,
  validatePassword,
  handleChange,
} from "@/app/lib/validations";
import { useState } from "react";
import { signinUser } from "@/app/lib/signinUser";
import { useRouter } from "next/navigation";

export function LoginForm({ email, setEmail, password, setPassword }) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    let hasError = false;
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

    const response = await signinUser(email, password);
    if (response.error) {
      setFormError(response.error);
      return;
    }
    router.push("/pantries");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="h3 mb-4">Entrar</h1>

      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="login-email" className="form-label">
          E-mail
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          className="form-control"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          aria-invalid={emailError ? "true" : "false"}
          aria-describedby={emailError ? "login-email-error" : undefined}
        />
        {emailError && (
          <p id="login-email-error" className="text-danger small mt-1 mb-0">
            {emailError}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="login-password" className="form-label">
          Senha
        </label>
        <div className="input-group">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="form-control"
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby={
              passwordError ? "login-password-error" : undefined
            }
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <img
              src={showPassword ? "/img/olho-aberto.png" : "/img/olho.png"}
              alt=""
              width="20"
              height="20"
            />
          </button>
        </div>
        {passwordError && (
          <p id="login-password-error" className="text-danger small mt-1 mb-0">
            {passwordError}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Entrar
      </button>
    </form>
  );
}
