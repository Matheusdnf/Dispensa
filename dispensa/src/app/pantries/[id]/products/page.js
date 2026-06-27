"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importe o hook useParams
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "@/app/components/navbar";
import { Dropdown_Products } from "@/app/components/dropdown";
import { fetchProducts } from "@/app/lib/products";

export default function Page_products() {
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para carregamento
  const [error, setError] = useState(null); // Estado para erros

  const params = useParams(); // Acessa os parâmetros da rota
  const { id } = params; // Extrai o `id` da URL

  useEffect(() => {
    const getProducts = async () => {
      try {
        // Busca os produtos da despensa selecionada (a API valida a sessão)
        const data = await fetchProducts(id);
        setProducts(data); // Atualiza o estado com os dados obtidos
      } catch (error) {
        setError(error.message); // Define o erro, se houver
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    getProducts(); // Chama a função para buscar os produtos
  }, [id]); // Executa o useEffect sempre que o `id` mudar

  if (loading) return <p>Carregando...</p>; // Exibe um indicador de carregamento
  if (error) return <p>Erro: {error}</p>; // Exibe uma mensagem de erro

  return (
    <div>
      <Nav_bar_itens
        Dropdown={<Dropdown_Products />}
        name_nav_bar={"Sessão de Produtos"}
      />
      <ShowCard itens={products} ismodal={true} />
    </div>
  );
}
