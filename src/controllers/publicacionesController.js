import {
  createPost, associatePostWithCategories,
  updatePostAndCategories,
  deletePostAndCategories, getAllPostsWithCategories,
  getPostsByUserId, getPostsByCategoryId,
  searchPostsByTitle
} from '../models/publicacionModel.js'

// Esta función maneja la creación de una nueva publicación. Obtiene los datos del título, contenido y categorías asociadas del cuerpo de la solicitud, y el ID de usuario de la sesión actual. Luego, llama a las funciones createPost y associatePostWithCategories del modelo para guardar la publicación y asociarla con las categorías correspondientes.
export const createPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body
  const userId = req.session.userId

  try {
    const postResult = await createPost({ userId, title, content })
    const postId = postResult.insertId

    // Si hay categorías para asociar.
    if (categoryIds && categoryIds.length > 0) {
      await associatePostWithCategories(postId, categoryIds)
    }

    console.log(`Publicación creada con ID: ${postId}`)
    res.status(201).json({ message: 'Publicación creada exitosamente' })
  } catch (error) {
    console.error('Error al crear la publicación:', error)
    res.status(500).json({ message: 'Error al crear la publicación', error: error.message })
  }
}

// Esta función actualiza una publicación existente. Obtiene el ID de la publicación de los parámetros de la ruta, y los nuevos datos (título, contenido y categorías) del cuerpo de la solicitud. Luego, llama a la función updatePostAndCategories del modelo para actualizar la publicación y sus categorías asociadas.
export const updatePostController = async (req, res) => {
  const { postId } = req.params
  const { title, content, categoryIds } = req.body

  try {
    await updatePostAndCategories(postId, { title, content, categoryIds })
    console.log(`Publicación ${postId} actualizada por el usuario`)
    res.json({ message: 'Publicación actualizada exitosamente' })
  } catch (error) {
    console.error('Error al actualizar la publicación:', error)
    res.status(500).json({ message: 'Error al actualizar la publicación', error: error.message })
  }
}

// Esta función elimina una publicación existente. Obtiene el ID de la publicación de los parámetros de la ruta y llama a la función deletePostAndCategories del modelo para eliminar la publicación y sus asociaciones con categorías.
export const deletePostController = async (req, res) => {
  const { postId } = req.params

  try {
    const result = await deletePostAndCategories(postId)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'La publicación no fue encontrada o ya fue eliminada' })
    }
    res.json({ message: 'Publicación eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar la publicación:', error)
    res.status(500).json({ message: 'Error al eliminar la publicación', error: error.message })
  }
}

// Esta función obtiene todas las publicaciones asociadas a una categoría específica. Obtiene el ID de la categoría de los parámetros de la ruta y llama a la función getPostsByCategoryId del modelo para obtener las publicaciones correspondientes.
export const getPostsByCategoryController = async (req, res) => {
  const { categoryId } = req.params

  try {
    const posts = await getPostsByCategoryId(categoryId)
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron publicaciones para la categoría especificada' })
    }
    res.json(posts)
  } catch (error) {
    console.error('Error al obtener las publicaciones por categoría:', error)
    res.status(500).json({ message: 'Error al obtener las publicaciones por categoría', error: error.message })
  }
}

// Esta función obtiene todas las publicaciones creadas por un usuario específico. Obtiene el ID del usuario de los parámetros de la ruta y llama a la función getPostsByUserId del modelo para obtener las publicaciones correspondientes.
export const getPostsByUserController = async (req, res) => {
  const { userId } = req.params

  try {
    const posts = await getPostsByUserId(userId)
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron publicaciones para el usuario especificado' })
    }
    res.json(posts)
  } catch (error) {
    console.error('Error al obtener las publicaciones por usuario:', error)
    res.status(500).json({ message: 'Error al obtener las publicaciones por usuario', error: error.message })
  }
}

// Esta función obtiene todas las publicaciones existentes, junto con sus categorías asociadas. Llama a la función getAllPostsWithCategories del modelo para obtener los datos.
export const getAllPostsWithCategoriesController = async (req, res) => {
  try {
    const posts = await getAllPostsWithCategories()
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron publicaciones' })
    }
    res.json(posts)
  } catch (error) {
    console.error('Error al obtener todas las publicaciones:', error)
    res.status(500).json({ message: 'Error al obtener todas las publicaciones', error: error.message })
  }
}

// Esta función realiza una búsqueda de publicaciones por un término de búsqueda en el título. Obtiene el término de búsqueda de los parámetros de consulta y llama a la función searchPostsByTitle del modelo para obtener las publicaciones correspondientes.
export const searchPostsByTitleController = async (req, res) => {
  const { searchTerm } = req.query

  if (!searchTerm) {
    return res.status(400).json({ message: 'Es necesario proporcionar un término de búsqueda' })
  }

  try {
    const posts = await searchPostsByTitle(searchTerm)
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron publicaciones con el título proporcionado' })
    }
    res.json(posts)
  } catch (error) {
    console.error('Error al buscar las publicaciones por título:', error)
    res.status(500).json({ message: 'Error al buscar las publicaciones por título', error: error.message })
  }
}
