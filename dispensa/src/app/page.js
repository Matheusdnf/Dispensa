import { redirect } from "next/navigation";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { getSessionUserId } from "@/app/lib/session";
import style from "@/app/style/home.module.css";
import Link from "next/link";

import { UserPlus, LogIn, PackageOpen, Users, CalendarClock } from "lucide-react";

const beneficios = [
  {
    icon: <PackageOpen className="h-6 w-6" />,
    titulo: "Organize seus alimentos",
    texto:
      "Cadastre o que você tem em casa e nunca mais perca o controle do seu estoque.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    titulo: "Compartilhe despensas",
    texto:
      "Convide outras pessoas para gerenciar a mesma despensa em conjunto.",
  },
  {
    icon: <CalendarClock className="h-6 w-6" />,
    titulo: "Acompanhe a validade",
    texto: "Registre as datas de validade e evite o desperdício de comida.",
  },
];

export default async function Home() {
  // Usuário já logado vai direto para suas despensas.
  if (await getSessionUserId()) redirect("/pantries");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar text="Despensa Virtual" />

      <main id="main-content" className="flex-1">
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
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white transition duration-200 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto text-center justify-center no-underline backdrop-blur-sm"
              >
                <LogIn className="h-5 w-5" />
                Já tenho conta
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Como a Despensa Virtual te ajuda</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Tudo o que você precisa para manter o controle dos seus mantimentos de forma inteligente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beneficios.map((b) => (
              <div key={b.titulo} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-xl mb-6 self-start">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{b.titulo}</h3>
                <p className="text-gray-500 leading-relaxed flex-1">{b.texto}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
