import { LoginForm } from "@/app/components/loginForm";
import { Navbar } from "@/app/components/navbar";
import { getSessionUserId } from "@/app/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import style from "@/app/style/auth.module.css";

import { UserPlus } from "lucide-react";

export default async function Login() {
  // Usuário já logado não precisa ver a tela de login.
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
            <h2 className={style.welcome_title}>Bem-vindo de volta!</h2>
            <p className={style.welcome_text}>
              A Despensa Virtual é a melhor maneira de organizar seus alimentos.
            </p>
            <p className="mb-2">Ainda não tem uma conta?</p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] active:scale-[0.98] no-underline"
            >
              <UserPlus className="h-4 w-4" />
              Registrar
            </Link>
          </aside>

          <div className={style.form_side}>
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}
