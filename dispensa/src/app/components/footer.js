import footer_style from "@/app/style/footer.module.css";
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
