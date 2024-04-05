import express from 'express'
import { upload } from '../utils/multerConfig.js'
import { isAdmin, validateAdminAccess } from '../middlewares/authMiddleware.js'
import { registerUser, login, updateUser, deleteUser, listAllUsers } from '../controllers/usuariosController.js'

const router = express.Router()

// Permite a los nuevos usuarios registrarse, subiendo opcionalmente una foto de perfil durante el proceso.
router.post('/register', upload.single('profilePhoto'), registerUser)

// Facilita el inicio de sesión para los usuarios, autenticando credenciales proporcionadas.
router.post('/login', login)

// Habilita la actualización de datos personales de un usuario, incluida la foto de perfil, asegurando que solo el propio usuario o un administrador pueda realizar cambios.
router.patch('/:userId', upload.single('profilePhoto'), validateAdminAccess, updateUser)

// Permite eliminar un usuario específico por su ID, restringiendo esta acción a usuarios con acceso administrativo.
router.delete('/:userId', validateAdminAccess, deleteUser)

// Ruta exclusiva para administradores que muestra una lista de todos los usuarios registrados en el sistema.
router.get('/admin/users', isAdmin, listAllUsers)

export default router
