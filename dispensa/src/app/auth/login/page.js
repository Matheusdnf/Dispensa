"use client";
import { LoginForm } from "@/app/components/loginForm";
import { Navbar } from "@/app/components/navbar";
import { useState } from "react";
import Link from "next/link";
import style from "@/app/style/auth.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar text="Despensa Virtual" />
      <main
        id="main-content"
        className="flex-fill d-flex align-items-center justify-content-center p-3"
      >
        <div className={style.card}>
          <aside className={style.welcome}>
            <h2 className={style.welcome_title}>Bem-vindo de volta!</h2>
            <p className={style.welcome_text}>
              A Despensa Virtual é a melhor maneira de organizar seus alimentos.
            </p>
            <p className="mb-2">Ainda não tem uma conta?</p>
            <Link href="/auth/register" className="btn btn-outline-light">
              Registrar
            </Link>
          </aside>

          <div className={style.form_side}>
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
