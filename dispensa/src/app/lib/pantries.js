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

export async function deletePantry(pantryId, imagePath) {
  if (!pantryId) {
    return { error: "ID da despensa é obrigatório." };
  }

  // Excluir a imagem associada, se houver
  if (imagePath) {
    const { error: deleteError } = await supabase.storage
      .from("pantry-images")
      .remove([imagePath]);

    if (deleteError) {
      console.error("Erro ao deletar imagem:", deleteError.message);
      return { error: deleteError.message };
    }
  }

  // Excluir a despensa do banco de dados
  const { error } = await supabase.from("pantries").delete().eq("id", pantryId);

  if (error) {
    console.error("Erro ao deletar despensa:", error.message);
    return { error: error.message };
  }

  return { success: true };
}

export async function editPantry(
  pantryId,
  name,
  description,
  newImageFile,
  oldImagePath,
  userId
) {
  if (!pantryId || !name || !description || !userId) {
    return {
      error:
        "ID da despensa, nome, descrição e ID do usuário são obrigatórios.",
    };
  }

  let imageUrl = oldImagePath;

  // Se houver uma nova imagem, fazer o upload e remover a antiga
  if (newImageFile) {
    const fileExt = newImageFile.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from("pantry-images")
      .upload(filePath, newImageFile);

    if (uploadError) {
      console.error(
        "Erro ao fazer upload da nova imagem:",
        uploadError.message
      );
      return { error: uploadError.message };
    }

    imageUrl = data.path;

    // Remover a imagem antiga se existir
    if (oldImagePath) {
      await supabase.storage.from("pantry-images").remove([oldImagePath]);
    }
  }

  // Atualizar a despensa no banco de dados
  const { error } = await supabase
    .from("pantries")
    .update({ name, description, image: imageUrl })
    .eq("id", pantryId);

  if (error) {
    console.error("Erro ao editar despensa:", error.message);
    return { error: error.message };
  }

  return { success: true };
}
