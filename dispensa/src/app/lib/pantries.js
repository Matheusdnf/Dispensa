import { supabase } from "@/app/lib/supabase/SupabaseClient";

export const fetchPantries = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("pantries")
      .select("*") // Seleciona todas as colunas
      .eq("user_id", userId);

    if (error) throw error;
    return data; // Retorna os dados obtidos
  } catch (error) {
    console.error("Erro ao buscar despensas:", error.message);
    return []; // Retorna um array vazio em caso de erro
  }
};

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

export async function editPantry(id, name, description, imageFile, userId) {
  if (!id || !name || !description || !userId) {
    return {
      error:
        "ID da despensa, nome, descrição e ID do usuário são obrigatórios.",
    };
  }

  let imageUrl = null;

  // Verifica se uma nova imagem foi fornecida
  if (imageFile) {
    // Exclui a imagem antiga, se existir
    const { data: existingPantry, error: fetchError } = await supabase
      .from("pantries")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Erro ao buscar despensa:", fetchError.message);
      return { error: fetchError.message };
    }

    if (existingPantry.image) {
      // Remove a imagem antiga do armazenamento
      const { error: deleteError } = await supabase.storage
        .from("pantry-images")
        .remove([existingPantry.image]);

      if (deleteError) {
        console.error("Erro ao excluir imagem antiga:", deleteError.message);
        return { error: deleteError.message };
      }
    }

    // Faz o upload da nova imagem
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("pantry-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error(
        "Erro ao fazer upload da nova imagem:",
        uploadError.message
      );
      return { error: uploadError.message };
    }

    imageUrl = uploadData.path;
  }

  // Atualiza a despensa no banco de dados
  const { data, error } = await supabase
    .from("pantries")
    .update({ name, description, image: imageUrl })
    .eq("id", id)
    .eq("user_id", userId); // Garante que apenas o dono da despensa possa editá-la

  if (error) {
    console.error("Erro ao atualizar despensa:", error.message);
    return { error: error.message };
  }

  return { data };
}
