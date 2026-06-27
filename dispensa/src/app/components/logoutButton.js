"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/lib/auth";

export function LogoutButton({ className = "btn btn-outline-danger" }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <button type="button" className={className} onClick={handleLogout}>
      Sair
    </button>
  );
}
