import { createComment, getCommentsByPostId, updateComment, deleteComment } from '../models/comentarioModel.js'
import { getPostById } from '../models/publicacionModel.js'

// Maneja la creación de comentarios. Verifica si la publicación existe antes de permitir la creación del comentario. Devuelve el ID del comentario creado.
export const createCommentController = async (req, res) => {
  const { postId } = req.params
  const userId = req.session.userId
  const { contenido } = req.body

  try {
    const post = await getPostById(postId)
    if (!post) {
      return res.status(404).json({ message: 'La publicación no existe.' })
    }

    const commentId = await createComment(postId, userId, contenido)
    res.status(201).json({ message: 'Comentario creado exitosamente', commentId })
  } catch (error) {
    console.error('Error al crear el comentario:', error)
    res.status(500).json({ message: 'Error al crear el comentario', error: error.message })
  }
}

// Recupera y devuelve todos los comentarios de una publicación específica, asegurándose de que la publicación exista. Informa si no hay comentarios disponibles.
export const getCommentsByPostController = async (req, res) => {
  const { postId } = req.params

  try {
    const post = await getPostById(postId)
    if (!post) {
      return res.status(404).json({ message: 'La publicación no existe.' })
    }

    const comments = await getCommentsByPostId(postId)
    if (comments.length === 0) {
      return res.status(404).json({ message: 'No hay comentarios para esta publicación.' })
    }

    res.json(comments)
  } catch (error) {
    console.error('Error al obtener los comentarios:', error)
    res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message })
  }
}

// Actualiza un comentario basado en el ID proporcionado. Verifica los permisos del usuario para asegurar que solo los usuarios autorizados puedan editar el comentario.
export const updateCommentController = async (req, res) => {
  const { commentId } = req.params
  const userId = req.session.userId
  const { contenido } = req.body
  const isAdmin = req.session.role === 1 // Determina si el usuario es un administrador.

  try {
    const affectedRows = await updateComment(commentId, userId, contenido, isAdmin)
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'El comentario no existe o no tienes permiso para actualizarlo.' })
    }
    res.json({ message: 'Comentario actualizado exitosamente.' })
  } catch (error) {
    console.error('Error al actualizar el comentario:', error)
    res.status(500).json({ message: 'Error al actualizar el comentario', error: error.message })
  }
}

// Elimina un comentario basado en el ID proporcionado. Similar a la actualización, verifica que el usuario tenga permisos para eliminar el comentario.
export const deleteCommentController = async (req, res) => {
  const { commentId } = req.params
  const userId = req.session.userId
  const isAdmin = req.session.role === 1

  try {
    const affectedRows = await deleteComment(commentId, userId, isAdmin)
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'El comentario no existe o no tienes permiso para eliminarlo.' })
    }
    res.json({ message: 'Comentario eliminado exitosamente.' })
  } catch (error) {
    console.error('Error al eliminar el comentario:', error)
    res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message })
  }
}
