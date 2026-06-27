"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/lib/auth";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      router.replace("/");
      router.refresh();
    });
  }, [router]);

  return (
    <p className="p-4" role="status">
      Saindo…
    </p>
  );
}
