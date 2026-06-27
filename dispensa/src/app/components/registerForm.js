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

export function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
}) {
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
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="h3 mb-4">Registrar</h1>

      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="register-name" className="form-label">
          Nome
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          className="form-control"
          value={username}
          onChange={(e) => handleChange(e, setUsername)}
          aria-invalid={usernameError ? "true" : "false"}
          aria-describedby={usernameError ? "register-name-error" : undefined}
        />
        {usernameError && (
          <p id="register-name-error" className="text-danger small mt-1 mb-0">
            {usernameError}
          </p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="register-email" className="form-label">
          E-mail
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          className="form-control"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          aria-invalid={emailError ? "true" : "false"}
          aria-describedby={emailError ? "register-email-error" : undefined}
        />
        {emailError && (
          <p id="register-email-error" className="text-danger small mt-1 mb-0">
            {emailError}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="register-password" className="form-label">
          Senha
        </label>
        <div className="input-group">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className="form-control"
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby={
              passwordError ? "register-password-error" : undefined
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
          <p
            id="register-password-error"
            className="text-danger small mt-1 mb-0"
          >
            {passwordError}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Registrar
      </button>
    </form>
  );
}
