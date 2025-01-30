"use client";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import style from "@/app/style/home.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className=" d-flex flex-column justify-content-center  text-center">
        <h1 className={` ${style.custom_spacing}`}> Bem Vindo !!</h1>
        <div className={` ${style.box}`}>
          <span className={` ${style.span}`}>
            Esse projeto trata-se de uma Dispensa, a qual é possível definir
            caractéristicas dela e personalizá-lá, além de adicionar produtos
            diversos a mesma, e assim ter um controle daquilo que se tem
            estocado no recinto em questão.
          </span>
        </div>
        <div className={` ${style.button}`}>
          <Link
            href={"/auth/register"}
            type="button"
            className="btn btn-outline-primary"
          >
            Criar Uma Conta
          </Link>
          <Link
            href={"/auth/login"}
            type="button"
            className="btn btn-outline-primary"
          >
            Logar
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
