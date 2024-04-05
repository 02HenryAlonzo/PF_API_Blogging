import pool from '../config/db.js'

// Inserta un nuevo comentario en la base de datos asociado a una publicación y un usuario. Además de los datos proporcionados, registra automáticamente la fecha de creación. Retorna el ID del comentario recién creado, facilitando operaciones posteriores sobre este comentario.
export const createComment = async (postId, userId, contenido) => {
  const [result] = await pool.query('INSERT INTO comentarios (id_publicacion, id_usuario, contenido, fechaCreacion) VALUES (?, ?, ?, NOW())', [postId, userId, contenido])
  return result.insertId
}

// Recupera todos los comentarios asociados a una publicación específica, ordenados de manera descendente por fecha de creación. Esto permite mostrar los comentarios más recientes primero, mejorando la relevancia y la experiencia del usuario al leer comentarios.
export const getCommentsByPostId = async (postId) => {
  const [comments] = await pool.query('SELECT * FROM comentarios WHERE id_publicacion = ? ORDER BY fechaCreacion DESC', [postId])
  return comments
}

// Obtiene un comentario específico por su ID. Es útil para operaciones que requieren verificar la existencia de un comentario o recuperar sus detalles, como en procesos de edición o validación de permisos de usuario para realizar acciones sobre el comentario.
export const getCommentById = async (commentId) => {
  const [rows] = await pool.query('SELECT * FROM comentarios WHERE id_comentario = ?', [commentId])
  if (rows.length > 0) {
    return rows[0]
  } else {
    return null
  }
}

// Actualiza el contenido de un comentario específico. Si el usuario es administrador, puede actualizar cualquier comentario directamente; si no, la actualización se limita a los comentarios propios del usuario. Devuelve el número de filas afectadas para verificar si la actualización fue exitosa.
export const updateComment = async (commentId, userId, contenido, isAdmin) => {
  let query, params

  if (isAdmin) {
    // Actualizar el comentario directamente sin verificar el userId para administradores
    query = 'UPDATE comentarios SET contenido = ? WHERE id_comentario = ?'
    params = [contenido, commentId]
  } else {
    query = 'UPDATE comentarios SET contenido = ? WHERE id_comentario = ? AND id_usuario = ?'
    params = [contenido, commentId, userId]
  }

  const [result] = await pool.query(query, params)
  return result.affectedRows
}

// Elimina un comentario de la base de datos. Similar a la actualización, los administradores pueden eliminar cualquier comentario, mientras que los usuarios solo pueden eliminar sus propios comentarios. Devuelve el número de filas afectadas para confirmar si la eliminación se llevó a cabo correctamente.
export const deleteComment = async (commentId, userId, isAdmin) => {
  let query, params

  if (isAdmin) {
    query = 'DELETE FROM comentarios WHERE id_comentario = ?'
    params = [commentId]
  } else {
    query = 'DELETE FROM comentarios WHERE id_comentario = ? AND id_usuario = ?'
    params = [commentId, userId]
  }

  const [result] = await pool.query(query, params)
  return result.affectedRows
}
