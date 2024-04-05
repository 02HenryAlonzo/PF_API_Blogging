import express from 'express'
import { createCommentController, getCommentsByPostController, updateCommentController, deleteCommentController } from '../controllers/comentariosController.js'
import { requireAuth, validateCommentAuthorOrAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Ruta que  permite crear un comentario en una publicación, solo si el usuario está autenticado..
router.post('/:postId/comments', requireAuth, createCommentController)

// Ruta para obtener los comentarios de una publicación específica. No requiere autenticación.
router.get('/:postId/comments', getCommentsByPostController)

// Ruta que permite actualizar un comentario, solo si el usuario es el autor del comentario o un administrador.
router.patch('/:commentId', validateCommentAuthorOrAdmin, updateCommentController)

// Ruta que permite eliminar un comentario, accesible únicamente por el autor del comentario o por un administrador.
router.delete('/:commentId', validateCommentAuthorOrAdmin, deleteCommentController)

export default router
