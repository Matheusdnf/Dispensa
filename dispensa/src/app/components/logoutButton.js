"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/lib/auth";
import { LogOut } from "lucide-react";

export function LogoutButton({
  className = "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition hover:scale-[1.02] active:scale-[0.98]",
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <button type="button" className={className} onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      <span>Sair</span>
    </button>
  );
}

