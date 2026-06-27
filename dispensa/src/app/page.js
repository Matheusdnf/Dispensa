import { redirect } from "next/navigation";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { getSessionUserId } from "@/app/lib/session";
import style from "@/app/style/home.module.css";
import Link from "next/link";

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
      <Navbar
        text="Despensa Virtual"
        actions={
          <>
            <Link href="/auth/register" className="btn btn-outline-primary">
              Criar conta
            </Link>
            <Link href="/auth/login" className="btn btn-primary">
              Fazer login
            </Link>
          </>
        }
      />

      <main id="main-content" className="flex-fill">
        <section className={style.hero}>
          <h1 className={style.hero_title}>Sua despensa, sempre organizada</h1>
          <p className={style.hero_text}>
            A Despensa Virtual é a melhor maneira de organizar seus alimentos,
            controlar o que você tem em casa e compartilhar com quem você quiser.
          </p>
        </section>

        <section className="container pb-5">
          <ul className="row g-4 list-unstyled m-0">
            {beneficios.map((b) => (
              <li key={b.titulo} className="col-12 col-md-4">
                <div className={style.card}>
                  <h2 className="h5">{b.titulo}</h2>
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
