// Esta línea importa funciones del modelo de usuarios para interactuar con la base de datos.
import {
  saveUser, findUserByEmail,
  updateUserById, deleteUserById, getAllUsers
} from '../models/usuarioModel.js'

// Esta función maneja el registro de un nuevo usuario. Obtiene los datos del cuerpo de la solicitud y la ruta de la foto de perfil (si se proporcionó). Luego, llama a la función saveUser del modelo para guardar el usuario en la base de datos.
export const registerUser = async (req, res) => {
  const { username, email, password, rolName } = req.body
  const profilePhotoPath = req.file ? req.file.filename : null

  try {
    await saveUser(username, email, password, rolName, profilePhotoPath)
    res.status(201).json({ message: 'Usuario registrado con éxito' })
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message })
  }
}

// Esta función maneja el inicio de sesión de un usuario. Obtiene las credenciales del cuerpo de la solicitud y busca al usuario en la base de datos mediante findUserByEmail. Si el usuario existe y la contraseña es correcta, se establece la sesión con el ID de usuario y el rol correspondiente.
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Buscar el usuario por email
    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    if (user && user.password === password) {
      req.session.userId = user.id_usuario
      console.log('Inicio de session del usuario con el Id:', req.session.userId)
      req.session.role = user.id_rol
      console.log(user.id_rol)
      res.status(200).json({ message: 'Inicio de sesión exitoso' })
    } else {
      res.status(401).send('Contraseña incorrecta')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Esta función actualiza los datos de un usuario existente. Obtiene el ID del usuario de los parámetros de la ruta, los nuevos datos del cuerpo de la solicitud y la ruta de la nueva foto de perfil (si se proporcionó). Luego, llama a la función updateUserById del modelo para actualizar los datos en la base de datos.
export const updateUser = async (req, res) => {
  const { userId } = req.params
  const { username, email, password } = req.body
  const profilePhotoPath = req.file ? req.file.filename : null

  try {
    const result = await updateUserById(userId, username, email, password, profilePhotoPath)

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json({ message: 'Usuario actualizado con éxito' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

// Esta función elimina un usuario existente. Obtiene el ID del usuario de los parámetros de la ruta y llama a la función deleteUserById del modelo para eliminar el usuario de la base de datos.
export const deleteUser = async (req, res) => {
  const { userId } = req.params

  try {
    const result = await deleteUserById(userId)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar el usuario' })
  }
}

// Esta función obtiene una lista de todos los usuarios registrados en el sistema. Llama a la función getAllUsers del modelo para obtener los datos de los usuarios desde la base de datos.
export const listAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los usuarios' })
  }
}
