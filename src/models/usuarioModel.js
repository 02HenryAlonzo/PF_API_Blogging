import pool from '../config/db.js'

// Busca el ID de un rol específico por su nombre en la base de datos. Es útil para asociar usuarios a roles cuando solo se conoce el nombre del rol. Si el rol existe, devuelve su ID; de lo contrario, lanza un error indicando que el rol no fue encontrado.
const findRoleIdByName = async (rolName) => {
  const query = 'SELECT id_rol FROM roles WHERE nombre = ?'
  const [rows] = await pool.execute(query, [rolName])
  if (rows.length > 0) {
    return rows[0].id_rol // Retorna el id del rol
  } else {
    throw new Error('Rol no encontrado')
  }
}

// Guarda un nuevo usuario en la base de datos. Primero, busca el ID del rol utilizando el nombre del rol proporcionado y luego inserta un nuevo registro en la tabla de usuarios con los datos proporcionados. Si la operación es exitosa, devuelve el resultado de la inserción.
export const saveUser = async (userName, email, password, rolName, profilePhotoPath) => {
  try {
    const idRol = await findRoleIdByName(rolName) // Obtiene el id del rol basado en el nombre del rol
    const query = 'INSERT INTO usuarios (userName, email, password, id_rol, profilePhoto) VALUES (?, ?, ?, ?, ?)'
    const [result] = await pool.execute(query, [userName, email, password, idRol, profilePhotoPath])
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Encuentra un usuario por su correo electrónico. Esta función es fundamental para operaciones que requieren validar la existencia de un usuario, como el inicio de sesión o la verificación de duplicados. Devuelve el usuario si existe; si no, devuelve null.
export const findUserByEmail = async (email) => {
  if (email === undefined) {
    throw new Error('El email no puede ser undefined')
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?'
  const [rows] = await pool.execute(query, [email])
  return rows.length > 0 ? rows[0] : null
}

// Actualiza la información de un usuario en la base de datos. Permite actualizar el nombre de usuario, correo electrónico, contraseña y la ruta de la foto de perfil. Construye dinámicamente la consulta SQL para incluir solo los campos que se desean actualizar.
export const updateUserById = async (userId, username, email, password, profilePhotoPath) => {
  const queryParams = [username, email]
  let query = 'UPDATE usuarios SET username = ?, email = ?'

  if (password) {
    query += ', password = ?'
    queryParams.push(password)
  }

  query += ', profilePhoto = ?'
  queryParams.push(profilePhotoPath)

  query += ' WHERE id_usuario = ?'
  queryParams.push(userId)

  const [result] = await pool.execute(query, queryParams)
  return result
}

// Elimina un usuario de la base de datos utilizando su ID. Es útil para la gestión de usuarios, permitiendo remover registros de usuarios que ya no necesitan acceso al sistema. El resultado de la operación incluye 'affectedRows' para verificar si la eliminación fue exitosa.
export const deleteUserById = async (userId) => {
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?'
  const [result] = await pool.execute(query, [userId])
  return result
}

// Recupera todos los usuarios registrados en la base de datos, seleccionando solo su ID, nombre de usuario y correo electrónico. Esta función puede ser utilizada para mostrar una lista de usuarios, por ejemplo, en la administración del sistema.
export const getAllUsers = async () => {
  const query = 'SELECT id_usuario, username, email FROM usuarios'
  const [users] = await pool.execute(query)
  return users
}
