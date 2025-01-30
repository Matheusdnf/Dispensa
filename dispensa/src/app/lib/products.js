import { supabase } from "@/app/lib/supabase/SupabaseClient";

export async function createProduct(name, description, quantity, pantryId, expiration, imageFile) {
  if (!name || !description || !quantity || !pantryId || !expiration) {
    return { error: "Nome, descrição, quantidade, ID da despensa e data de vencimento são obrigatórios." };
  }

  let imageUrl = null;

  // Se houver uma imagem, fazer o upload
  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${pantryId}/${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError.message);
      return { error: uploadError.message };
    }

    imageUrl = data.path;
  }

  // Inserir o novo produto no banco de dados
  const { data, error } = await supabase
    .from("products")
    .insert([{ name, description, quantity, pantry_id: pantryId, expiration, image: imageUrl }]);

  if (error) {
    console.error("Erro ao criar produto:", error.message);
    return { error: error.message };
  }

  return { data };
}
