import express from 'express'
import { requireAuth, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Define una ruta protegida para el panel de administración. Solo accesible para usuarios autenticados con rol de administrador. Retorna un mensaje indicativo al acceder correctamente.
router.get('/dashboard', requireAuth, isAdmin, (req, res) => {
  res.json({ message: 'Panel de Administración' })
})

export default router
