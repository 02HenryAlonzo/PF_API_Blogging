import pool from '../config/db.js'

// Inserta una nueva publicación en la base de datos. Requiere el ID del usuario que crea la publicación, así como el título y el contenido de la misma. Retorna el resultado de la inserción, incluyendo el ID de la nueva publicación.
export const createPost = async ({ userId, title, content }) => {
  const query = 'INSERT INTO publicaciones (id_usuario, titulo, contenido) VALUES (?, ?, ?)'
  const [result] = await pool.execute(query, [userId, title, content])
  console.log(`Publicación creada con ID: ${result.insertId}`)
  return result
}

// Asocia una publicación existente con una o varias categorías. Utiliza el ID de la publicación y una lista de IDs de categorías para crear relaciones en la tabla publicaciones_categorias. Es crucial para mantener organizadas las publicaciones según sus categorías.
export const associatePostWithCategories = async (postId, categoryIds) => {
  const values = categoryIds.map(categoryId => [postId, categoryId])
  await pool.query('INSERT INTO publicaciones_categorias (id_publicacion, id_categoria) VALUES ?', [values])
}

// Recupera una publicación específica por su ID. Es útil para visualizar o editar una publicación existente. Devuelve la publicación si existe; de lo contrario, retorna null.
export const getPostById = async (postId) => {
  const [rows] = await pool.query('SELECT * FROM publicaciones WHERE id_publicacion = ?', [postId])
  if (rows.length > 0) {
    return rows[0]
  } else {
    return null
  }
}

// Actualiza tanto los detalles de una publicación (título y contenido) como sus asociaciones de categorías. Primero actualiza la publicación en sí y luego actualiza la tabla de relaciones con las categorías, asegurando que la publicación refleje los cambios en las categorías asociadas.
export const updatePostAndCategories = async (postId, { title, content, categoryIds }) => {
  await pool.query('UPDATE publicaciones SET titulo = ?, contenido = ? WHERE id_publicacion = ?', [title, content, postId])

  await pool.query('DELETE FROM publicaciones_categorias WHERE id_publicacion = ?', [postId])

  if (categoryIds && categoryIds.length > 0) {
    const values = categoryIds.map(categoryId => [postId, categoryId])
    await pool.query('INSERT INTO publicaciones_categorias (id_publicacion, id_categoria) VALUES ?', [values])
  }
}

// Elimina una publicación y todas sus asociaciones de categorías de la base de datos. Asegura que al eliminar la publicación, también se limpian las relaciones en la tabla publicaciones_categorias, manteniendo la integridad de la base de datos.
export const deletePostAndCategories = async (postId) => {
  await pool.query('DELETE FROM publicaciones_categorias WHERE id_publicacion = ?', [postId])

  const [result] = await pool.query('DELETE FROM publicaciones WHERE id_publicacion = ?', [postId])
  return result
}

// Recupera todas las publicaciones creadas por un usuario específico. Facilita la visualización de las contribuciones de un usuario en particular al sistema de publicaciones.
export const getPostsByUserId = async (userId) => {
  const [posts] = await pool.query('SELECT * FROM publicaciones WHERE id_publicacion = ?', [userId])
  return posts
}

// Obtiene todas las publicaciones junto con las categorías asociadas a cada una. Utiliza JOINs en la consulta SQL para combinar datos de varias tablas, proporcionando una vista completa de las publicaciones y sus categorías en un solo resultado.
export const getAllPostsWithCategories = async () => {
  const [posts] = await pool.query(`
    SELECT p.*, GROUP_CONCAT(c.nombre SEPARATOR ', ') AS categorias
    FROM publicaciones p
    LEFT JOIN publicaciones_categorias pc ON p.id_publicacion = pc.id_publicacion
    LEFT JOIN categorias c ON pc.id_categoria = c.id_categoria
    GROUP BY p.id_publicacion;
  `)
  return posts
}

// Encuentra publicaciones que están asociadas a una categoría específica. Permite a los usuarios filtrar publicaciones por categoría, facilitando la búsqueda de contenido relevante dentro de una categoría.
export const getPostsByCategoryId = async (categoryId) => {
  const [posts] = await pool.query(`
    SELECT pub.* FROM publicaciones pub
    JOIN publicaciones_categorias pc ON pub.id_publicacion = pc.id_publicacion
    WHERE pc.id_categoria = ?`, [categoryId]
  )
  return posts
}

// Busca publicaciones cuyos títulos contengan un término de búsqueda específico. Mejora la accesibilidad al contenido, permitiendo a los usuarios encontrar publicaciones por palabras clave en sus títulos.
export const searchPostsByTitle = async (searchTerm) => {
  const [posts] = await pool.query('SELECT * FROM publicaciones WHERE titulo LIKE ?', [`%${searchTerm}%`])
  return posts
}
