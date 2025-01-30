"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeletePantryPage({ params }) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const deletePantry = async () => {
      try {
        const response = await fetch(`/api/pantries/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir a despensa.");
        }

        alert("Despensa excluída com sucesso!");
        router.push("/pantries");
      } catch (error) {
        alert("Erro ao excluir a despensa.");
        router.push("/pantries");
      }
    };

    deletePantry();
  }, [id, router]);

  return <p>Excluindo despensa...</p>;
}
