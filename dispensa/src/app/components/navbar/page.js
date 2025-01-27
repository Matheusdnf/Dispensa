"use client";
import {
  validateEmail,
  validatePassword,
  handleChange,
} from "@/app/lib/validations/page";
import { useState } from "react";
import footer_style from "@/app/style/footer.module.css";

export function Navbar() {
  return (
    <nav className="navbar bg-body-none">
      <div className="container-fluid">
        <a
          className="navbar-brand d-flex align-items-center text-decoration-none"
          href="#"
          style={{ cursor: "default" }}
        >
          <img
            src="/img/Compartilhado.png"
            alt="Logo"
            width="20"
            height="20"
            className="d-inline-block me-2"
          />
          <span style={{ position: "relative", top: "-2px" }}>
            Dispensa Compartilhada
          </span>
        </a>
      </div>
    </nav>
  );
}

export function Form({ email, setEmail, password, setPassword }) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hidepassword, sethidepassword] = useState(false);

  const secretPassword = () => {
    sethidepassword(!hidepassword);
  };

  const handleSubmit = (e) => {
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
      console.log("Formulário enviado com sucesso!", { email, password });
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
            <a href="#">Esqueci minha senha</a>
            <button className="btn btn-primary mt-3" type="submit">
              Entrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row flex-fill">
        <div className="col-12 col-lg-6 p-0">
          <img
            src="/img/invalid.jpg"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-4">
          <Navbar />
          <Form
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Footer() {
  return (
    <footer className={footer_style.footer}>
      <ul className={footer_style.info}>
        <li>© 2025 Dispensa</li>
        <li className={footer_style.info_center}>
          Projeto para a disciplina de PWEB 2024.2
        </li>
      </ul>
    </footer>
  );
}
