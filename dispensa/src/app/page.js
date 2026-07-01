import { redirect } from "next/navigation";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { getSessionUserId } from "@/app/lib/session";
import style from "@/app/style/home.module.css";
import Link from "next/link";

import { UserPlus, LogIn } from "lucide-react";

const beneficios = [
  {
    titulo: "Organize seus alimentos",
    texto:
      "Cadastre o que você tem em casa e nunca mais perca o controle do seu estoque.",
  },
  {
    titulo: "Compartilhe despensas",
    texto:
      "Convide outras pessoas para gerenciar a mesma despensa em conjunto.",
  },
  {
    titulo: "Acompanhe a validade",
    texto: "Registre as datas de validade e evite o desperdício de comida.",
  },
];

export default async function Home() {
  // Usuário já logado vai direto para suas despensas.
  if (await getSessionUserId()) redirect("/pantries");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar text="Despensa Virtual" />

      <main id="main-content" className="flex-fill">
        <section className={style.hero}>
          <div className={style.hero_inner}>
            <h1 className={style.hero_title}>Sua despensa, sempre organizada</h1>
            <p className={style.hero_text}>
              A Despensa Virtual é a melhor maneira de organizar seus alimentos,
              controlar o que você tem em casa e compartilhar com quem você
              quiser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-indigo-700 shadow-md transition duration-200 hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center justify-center no-underline"
              >
                <UserPlus className="h-5 w-5" />
                Criar conta grátis
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-6 py-3 text-base font-semibold text-white transition duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center justify-center no-underline"
              >
                <LogIn className="h-5 w-5" />
                Já tenho conta
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <h2 className={style.section_title}>Como a Despensa Virtual te ajuda</h2>
          <ul className="row g-4 list-unstyled m-0">
            {beneficios.map((b) => (
              <li key={b.titulo} className="col-12 col-md-4">
                <div className={style.card}>
                  <h3 className="h5">{b.titulo}</h3>
                  <p className="m-0 text-muted">{b.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
