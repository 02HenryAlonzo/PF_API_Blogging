import express from 'express'
import session from 'express-session'// Middleware para manejar sesiones
import router from './routes/index.routes.js'
import userRoutes from './routes/usuarios.routes.js'// Rutas relacionadas con usuarios
import adminRoutes from './routes/admin.routes.js'// Rutas relacionadas con administradores
import postsRoutes from './routes/publicaciones.routes.js'// Rutas relacionadas con publicaciones
import categoriesRoutes from './routes/categorias.routes.js'// Rutas relacionadas con categorías
import commentsRoutes from './routes/comentarios.routes.js'// Rutas relacionadas con comentarios
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };


const app = express()
const PORT = process.env.PORT || 3000// Puerto donde se ejecutará el servidor

app.use(express.json())// Middleware para analizar cuerpos de solicitudes JSON

app.use(session({
  secret: 'clave', // Clave secreta para firmar la cookie de sesión
  resave: false, // No guardar la sesión en cada solicitud
  saveUninitialized: false, // No crear una sesión hasta que se almacene algo
  cookie: {
    secure: false, // Valor booleano si la cookie solo debe ser enviada sobre HTTPS
    httpOnly: true, // Indica si la cookie puede ser accedida solo a través de HTTP(S)
    maxAge: 1000 * 60 * 60 * 24 // Tiempo de vida de la cookie (1 día)
  }
}))

// Rutas
app.use('/', router) // Ruta raíz
app.use('/api/users', userRoutes) // Ruta para operaciones relacionadas con usuarios
app.use('/uploads', express.static('uploads')) // Ruta para servir archivos estáticos desde la carpeta 'uploads'
app.use('/api/posts', postsRoutes) // Ruta para operaciones relacionadas con publicaciones
app.use('/api/post-comment', commentsRoutes) // Ruta para operaciones relacionadas con comentarios
app.use('/admin', adminRoutes) // Ruta para operaciones de administrador
app.use('/api/categories', categoriesRoutes) // Ruta para operaciones relacionadas con categorías

// Configuración de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
