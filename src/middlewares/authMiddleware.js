import { getPostById } from '../models/publicacionModel.js'
import { getCommentById } from '../models/comentarioModel.js'

// Verifica si el usuario ha iniciado sesión verificando la existencia del userId en la sesión. Es un middleware de autenticación básico que restringe el acceso a usuarios no autenticados, esencial para proteger rutas que requieren una sesión activa.
export const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Debes Iniciar Sesión para realizar esta acción' })
  }
  next()
}

// Comprueba si el usuario tiene un rol de administrador basado en req.session.role. Este middleware se utiliza para restringir ciertas acciones solo a usuarios administradores, proporcionando una capa adicional de autorización.
export const isAdmin = (req, res, next) => {
  if (req.session.role !== 1) {
    return res.status(403).json({ message: 'Acceso denegado: requiere rol de administrador.' })
  }
  next()
}

// Permite el acceso a una acción si el usuario de la sesión actual es administrador o si el ID del usuario de la sesión coincide con el ID del usuario objetivo en req.params. Util para acciones que pueden realizar tanto el propio usuario como un administrador, como ver o editar información personal.
export const validateAdminAccess = (req, res, next) => {
  const { userId } = req.params
  const userIdFromSession = req.session.userId
  const isAdmin = req.session.role === 1

  const targetUserId = parseInt(userId, 10)

  if (userIdFromSession === targetUserId || isAdmin) {
    next()
  } else {
    res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' })
  }
}

// Valida que el usuario que intenta realizar una acción sobre una publicación sea el autor de la misma o un administrador. Busca la publicación por ID y compara el id_usuario con el ID de la sesión. Es crucial para asegurar que solo los usuarios autorizados puedan modificar o eliminar publicaciones.
export const validatePostAuthorOrAdmin = async (req, res, next) => {
  const { postId } = req.params
  const userIdFromSession = parseInt(req.session.userId, 10)
  const isAdmin = req.session.role === 1

  try {
    const post = await getPostById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada.' })
    }
    const isOwner = post.id_usuario === userIdFromSession

    if (isOwner || isAdmin) {
      next()
    } else {
      res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' })
    }
  } catch (error) {
    console.error('Error validando acceso de autor o administrador para publicaciones:', error)
    res.status(500).json({ message: 'Error al verificar el acceso de autor o administrador', error: error.message })
  }
}

// Similar a validatePostAuthorOrAdmin, este middleware verifica la autoría o permisos administrativos para acciones sobre un comentario. Es fundamental para mantener la integridad y la seguridad de los comentarios, asegurando que solo los autores o administradores puedan modificar o eliminar sus propios comentarios.
export const validateCommentAuthorOrAdmin = async (req, res, next) => {
  const { commentId } = req.params
  const userIdFromSession = parseInt(req.session.userId, 10)
  const isAdmin = req.session.role === 1

  try {
    const comment = await getCommentById(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'El comentario no existe.' })
    }

    const isOwner = comment.id_usuario === userIdFromSession
    console.log({ isOwner, commentUserId: comment.id_usuario, userIdFromSession, isAdmin })

    if (isOwner || isAdmin) {
      next()
    } else {
      res.status(403).json({ message: 'El comentario no existe o no tienes permiso para actualizarlo.' })
    }
  } catch (error) {
    console.error('Error validando acceso de autor o administrador para comentarios:', error)
    res.status(500).json({ message: 'Error al verificar el acceso de autor o administrador', error: error.message })
  }
}
