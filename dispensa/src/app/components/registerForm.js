"use client";

import {
  validateEmail,
  validatePassword,
  handleChange,
  validate_name,
} from "@/app/lib/validations/page";
import { useState } from "react";
import { signupUser } from "../lib/supabase/signupUser";
import Link from "next/link";
export function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  confirmPassword,
  setConfirmPassword,
}) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [hidePassword, setHidePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Email inválido");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (!validate_name(username)) {
      setUsernameError(
        <div>
          <ul>
            <li>Ter No mínimo 3 e no máximo 30 letra</li>
            <li>Não pode Incluir caracteres especiais [!@#$%^&*]</li>
          </ul>
        </div>
      );
      hasError = true;
    } else {
      setUsernameError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        <div>
          <ul>
            <li>Ter no mínimo 6 caracteres</li>
            <li>Incluir um número [1,2,3]</li>
            <li>Incluir caracteres especiais [!@#$%^&*]</li>
            <li>Incluir uma letra</li>
            <li>Ter letra Maiúscula</li>
          </ul>
        </div>
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não correspondem.");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (!hasError) {
      const response = await signupUser(email, password, username);
      if (response.error) {
        console.log("Erro no registro. ", response.error);
      } else {
        console.log("Registro realizado com sucesso!", response.data);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar</h1>
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Email"
              onChange={(e) => handleChange(e, setEmail)}
              value={email}
            />
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Nome de usuário"
              onChange={(e) => handleChange(e, setUsername)}
              value={username}
            />
            {usernameError && (
              <div className="text-danger">{usernameError}</div>
            )}
          </div>

          <div className="input-group mb-3">
            <input
              type={hidePassword ? "text" : "password"}
              className="form-control w-100"
              placeholder="Senha"
              onChange={(e) => handleChange(e, setPassword)}
              value={password}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                marginLeft: "8px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              {hidePassword ? (
                <img
                  src="/img/olho-aberto.png"
                  alt="Ocultar senha"
                  width="24"
                  height="24"
                />
              ) : (
                <img
                  src="/img/olho.png"
                  alt="Exibir senha"
                  width="24"
                  height="24"
                />
              )}
            </button>
            {passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
          </div>

          <div className="input-group mb-3">
            <input
              type={hidePassword ? "text" : "password"}
              className="form-control w-100"
              placeholder="Confirmar senha"
              onChange={(e) => handleChange(e, setConfirmPassword)}
              value={confirmPassword}
            />
            {confirmPasswordError && (
              <div className="text-danger">{confirmPasswordError}</div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link href="../auth/login">Já tem uma conta? Entrar</Link>
            <button className="btn btn-primary mt-3" type="submit">
              Cadastrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
