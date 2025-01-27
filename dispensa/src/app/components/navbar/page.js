"use client";
import footer_style from "@/app/style/footer.module.css";
import form from "@/app/style/form.module.css";
import { useState } from "react";
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

export function Form() {
  return (
    <div className={form.form}>
      <h1>Entrar </h1>
      <div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div>
          <input
            type="password"
            className="form-control w-100"
            placeholder="Senha"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <a href="#">Esqueci Minha Senha</a>
          <button className="btn btn-primary mt-3" type="button">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
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
          <Form />
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
