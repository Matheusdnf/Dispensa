import { supabase } from "@/app/lib/supabase/SupabaseClient";

export async function createPantry(name, description, imageFile, userId) {
  if (!name || !description || !userId) {
    return { error: "Nome, descrição e ID do usuário são obrigatórios." };
  }

  let imageUrl = null;

  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from("pantry-images") 
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError.message);
      return { error: uploadError.message };
    }

    imageUrl = data.path;
  }

  const { data, error } = await supabase
    .from("pantries")
    .insert([{ name, description, image: imageUrl, user_id: userId }]);

  if (error) {
    console.error("Erro ao criar despensa:", error.message);
    return { error: error.message };
  }

  return { data };
}
