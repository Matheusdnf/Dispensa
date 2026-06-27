import { RegisterForm } from "@/app/components/registerForm";
import { Navbar } from "@/app/components/navbar";
import { getSessionUserId } from "@/app/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import style from "@/app/style/auth.module.css";

export default async function Register() {
  // Usuário já logado não precisa ver a tela de registro.
  if (await getSessionUserId()) redirect("/pantries");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar text="Despensa Virtual" />
      <main
        id="main-content"
        className="flex-fill d-flex align-items-center justify-content-center p-3"
      >
        <div className={style.card}>
          <aside className={style.welcome}>
            <h2 className={style.welcome_title}>Seja bem-vindo!</h2>
            <p className={style.welcome_text}>
              A Despensa Virtual é a melhor maneira de organizar seus alimentos.
            </p>
            <p className="mb-2">Já tem uma conta?</p>
            <Link href="/auth/login" className="btn btn-outline-light">
              Login
            </Link>
          </aside>

          <div className={style.form_side}>
            <RegisterForm />
          </div>
        </div>
      </main>
    </div>
  );
}
