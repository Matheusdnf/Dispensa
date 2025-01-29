"use client";
import { useEffect } from "react";
import { signOut } from "@/app/lib/auth";

export default function Logout() {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div>
      <h1>Deslogado com sucesso</h1>
    </div>
  );
}
