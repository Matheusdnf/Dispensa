import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import BootstrapClient from "@/app/lib/bootstrap/BootstrapClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dispensa Compartilhada",
  description:
    "Organize seus alimentos em despensas virtuais e compartilhe com quem você quiser.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
