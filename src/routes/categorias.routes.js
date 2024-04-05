import express from 'express'
import { createCategoryController, getAllCategoriesController, updateCategoryController, deleteCategoryController } from '../controllers/categoriasController.js'
import { isAdmin, requireAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Ruta para obtener todas las categorías. Requiere que el usuario sea administrador. Utiliza getAllCategoriesController para manejar la petición.
router.get('/', isAdmin, getAllCategoriesController)

// Ruta para crear una nueva categoría. Verifica primero autenticación y luego autorización de administrador antes de invocar createCategoryController.
router.post('/create', requireAuth, isAdmin, createCategoryController)

// Ruta para actualizar una categoría existente, accesible solo por administradores. Usa updateCategoryController para aplicar cambios.
router.patch('/:categoryId', isAdmin, updateCategoryController)

// Ruta para eliminar una categoría por ID. Restringida a usuarios con rol de administrador, manejada por deleteCategoryController.
router.delete('/:categoryId', isAdmin, deleteCategoryController)

export default router
