"use client";
import { ShowCard } from "@/app/components/showCard";
import { Nav_bar_itens } from "@/app/components/navbar";
import { fetchPantries } from "@/app/lib/pantries"
import { useState } from "react";
import { useEffect } from "react";
import { Dropdown_Pentries, Dropdown_Products } from "../components/dropdown";
import { supabase } from "@/app/lib/supabase/SupabaseClient";
export default function scream_pantry() {
  const [pantries, setPantries] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getPantries = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      try {
        const data = await fetchPantries(user.id); 
        setPantries(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    getPantries(); 
  }, []); 

  return (
    <div>
      <Nav_bar_itens
        name_nav_bar={"Sessão de Dispensas"}
        Dropdown={<Dropdown_Pentries />}
      />
      <ShowCard itens={pantries} ismodal={false} button_pantries={true} />
    </div>
  );
}
