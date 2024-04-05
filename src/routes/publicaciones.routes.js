import express from 'express'
import {
  createPostController, updatePostController,
  deletePostController, getPostsByCategoryController,
  getPostsByUserController, getAllPostsWithCategoriesController,
  searchPostsByTitleController
} from '../controllers/publicacionesController.js'
import { checkSession } from '../middlewares/checkSession.js'
import { validatePostAuthorOrAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Accede a todas las publicaciones junto con sus categorías asociadas, sin restricciones de autenticación.
router.get('/', getAllPostsWithCategoriesController)

// Ruta para filtrar publicaciones por categoría. Útil para usuarios que buscan contenido específico.
router.get('/by-category/:categoryId', getPostsByCategoryController)

// Muestra publicaciones creadas por un usuario específico. Facilita la visualización del contenido propio o de otros usuarios.
router.get('/by-user/:userId', getPostsByUserController)

// Crea una nueva publicación. Requiere que el usuario haya iniciado sesión.
router.post('/create', checkSession, createPostController)

// Permite a los usuarios editar sus propias publicaciones o a los administradores editar cualquier publicación, asegurando que estén autenticados.
router.patch('/:postId', checkSession, validatePostAuthorOrAdmin, updatePostController)

// Habilita la eliminación de publicaciones por parte de sus autores o por administradores, verificando primero la sesión del usuario.
router.delete('/:postId', checkSession, validatePostAuthorOrAdmin, deletePostController)

// Busca publicaciones por palabras clave en el título. Útil para encontrar rápidamente contenido relevante.
router.get('/search', searchPostsByTitleController)

export default router
