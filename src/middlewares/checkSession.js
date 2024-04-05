// Este middleware se encarga de verificar si el usuario ha iniciado sesión antes de permitirle realizar ciertas acciones. Si no hay una sesión activa (es decir, req.session.userId no existe), registra un intento fallido y devuelve un mensaje indicando la necesidad de iniciar sesión. Si existe una sesión, registra el éxito de la verificación y permite continuar con el flujo de la petición. Es útil para garantizar que solo los usuarios autenticados puedan realizar acciones que requieren autenticación.
export const checkSession = (req, res, next) => {
  if (!req.session.userId) {
    console.log('Intento de crear publicación sin sesión iniciada')
    return res.status(401).json({ message: 'Es necesario iniciar sesión para realizar esta acción' })
  }
  console.log(`Sesión verificada para el usuario con ID: ${req.session.userId}`)
  next()
}
