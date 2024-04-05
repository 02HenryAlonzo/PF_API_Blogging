import pool from '../config/db.js'

// Crea una nueva categoría en la base de datos utilizando el nombre proporcionado. Es fundamental para organizar el contenido en categorías específicas, mejorando la navegabilidad y la experiencia de usuario. Devuelve el ID de la categoría recién creada, permitiendo acciones posteriores sobre esta.
export const createCategory = async (nombre) => {
  const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre])
  return result.insertId
}

// Recupera todas las categorías existentes de la base de datos. Esta función es esencial para mostrar listas de categorías, permitiendo a los usuarios filtrar contenido o clasificar publicaciones y comentarios según estas categorías.
export const getAllCategories = async () => {
  const [categories] = await pool.query('SELECT * FROM categorias')
  return categories
}

// Actualiza el nombre de una categoría existente, identificada por su ID. Esto permite mantener las categorías relevantes y actualizadas, asegurando que reflejen con precisión los tipos de contenido disponibles en la plataforma.
export const updateCategory = async (idCategoria, nombre) => {
  const [result] = await pool.query('UPDATE categorias SET nombre = ? WHERE id_categoria = ?', [nombre, idCategoria])
  return result
}

// Elimina una categoría específica de la base de datos por su ID. La eliminación de categorías debe manejarse con cuidado para evitar la pérdida de organización en el contenido asociado a la categoría eliminada.
export const deleteCategoryById = async (idCategoria) => {
  const result = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [idCategoria])
  return result
}
