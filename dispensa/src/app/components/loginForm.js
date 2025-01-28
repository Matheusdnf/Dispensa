"use client";
import {
  validateEmail,
  validatePassword,
  handleChange,
} from "@/app/lib/validations/page";
import { useState } from "react";
import { signinUser } from "@/app/lib/supabase/signinUser"

export function LoginForm({ email, setEmail, password, setPassword }) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hidepassword, sethidepassword] = useState(false);

  const secretPassword = () => {
    sethidepassword(!hidepassword);
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

    if (!validatePassword(password)) {
      setPasswordError(
        <div>
          <ul>
            <li>Ter no mínimo 6 caracteres</li>
            <li>Número [1,2,3]</li>
            <li>caracteres Especiais[!@#$%^&*]</li>
            <li>Letra</li>
          </ul>
        </div>
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      const response = await signinUser(email, password)
      if (response.error) {
        console.log("Erro no login", response.error);
      } else {
        console.log("Login efetuado com sucesso!");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Entrar</h1>
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
              type={hidepassword ? "text" : "password"}
              className="form-control w-100"
              placeholder="Senha"
              onChange={(e) => handleChange(e, setPassword)}
              value={password}
            />

            <button
              type="button"
              onClick={secretPassword}
              style={{
                marginLeft: "8px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              {hidepassword ? (
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
            <div>
              {passwordError && (
                <div className="text-danger">{passwordError}</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <a href="register">Não possui uma conta? Registre-se.</a>
            <button className="btn btn-primary mt-3" type="submit">
              Entrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
