import { supabase } from "@/app/lib/supabase/SupabaseClient";

// Buscar todos os produtos de um usuário
export const fetchProducts = async (pantryId) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*") // Seleciona todas as colunas
      .eq("pantry_id", pantryId);

    if (error) throw error;
    return data; // Retorna os dados obtidos
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return []; // Retorna um array vazio em caso de erro
  }
};

// Criar um novo produto
export async function createProduct(
  name,
  description,
  imageFile,
  quantity,
  pantryId,
  expiration
) {
  // Verifica se todos os parâmetros obrigatórios foram fornecidos
  if (!name || !description || !quantity || !pantryId || !expiration) {
    return {
      error:
        "Nome, descrição, quantidade, ID da despensa e data de vencimento são obrigatórios.",
    };
  }

  let imageUrl = null;

  // Se houver um arquivo de imagem, faz o upload
  if (imageFile) {
    try {
      const fileExt = imageFile.name.split(".").pop();
      const filePath = `${pantryId}/${Date.now()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      imageUrl = data.path; // Obtém o caminho da imagem após o upload
    } catch (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError.message);
      return { error: uploadError.message };
    }
  }

  // Insere o novo produto no banco de dados
  try {
    const { data, error } = await supabase.from("products").insert([
      {
        name,
        description,
        quantity,
        pantry_id: pantryId,
        expiration,
        image: imageUrl,
      },
    ]);

    if (error) throw error;

    return { data }; // Retorna os dados do produto inserido
  } catch (error) {
    console.error("Erro ao criar produto:", error.message);
    return { error: error.message };
  }
}

// Editar um produto
export async function editProduct(
  id,
  name,
  description,
  price,
  imageFile,
  userId
) {
  if (!id || !name || !description || !price || !userId) {
    return {
      error:
        "ID do produto, nome, descrição, preço e ID do usuário são obrigatórios.",
    };
  }

  let imageUrl = null;

  // Verifica se uma nova imagem foi fornecida
  if (imageFile) {
    // Exclui a imagem antiga, se existir
    const { data: existingProduct, error: fetchError } = await supabase
      .from("products")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Erro ao buscar produto:", fetchError.message);
      return { error: fetchError.message };
    }

    if (existingProduct.image) {
      // Remove a imagem antiga do armazenamento
      const { error: deleteError } = await supabase.storage
        .from("product-images")
        .remove([existingProduct.image]);

      if (deleteError) {
        console.error("Erro ao excluir imagem antiga:", deleteError.message);
        return { error: deleteError.message };
      }
    }

    // Faz o upload da nova imagem
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
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

  // Atualiza o produto no banco de dados
  const { data, error } = await supabase
    .from("products")
    .update({ name, description, price, image: imageUrl })
    .eq("id", id)
    .eq("user_id", userId); // Garante que apenas o dono do produto possa editá-lo

  if (error) {
    console.error("Erro ao atualizar produto:", error.message);
    return { error: error.message };
  }

  return { data };
}

// Deletar um produto
export async function deleteProduct(id, userId) {
  if (!id || !userId) {
    return { error: "ID do produto e ID do usuário são obrigatórios." };
  }

  try {
    // Busca o produto para obter o caminho da imagem (se houver)
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("image")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Erro ao buscar produto:", fetchError.message);
      return { error: fetchError.message };
    }

    // Se houver uma imagem associada, exclui do armazenamento
    if (product.image) {
      const { error: deleteImageError } = await supabase.storage
        .from("product-images")
        .remove([product.image]);

      if (deleteImageError) {
        console.error("Erro ao excluir imagem:", deleteImageError.message);
        return { error: deleteImageError.message };
      }
    }

    // Exclui o produto do banco de dados
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (deleteError) {
      console.error("Erro ao excluir produto:", deleteError.message);
      return { error: deleteError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Erro inesperado ao excluir produto:", error.message);
    return { error: error.message };
  }
}
