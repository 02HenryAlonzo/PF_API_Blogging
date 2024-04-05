import { createCategory, getAllCategories, updateCategory, deleteCategoryById } from '../models/categoriaModel.js'

// Esta función es responsable de la creación de nuevas categorías en el sistema. Recibe un nombre a través del cuerpo de la solicitud, lo cual utiliza para crear una nueva categoría en la base de datos mediante la función createCategory. Si la operación es exitosa, devuelve un mensaje junto con el ID de la categoría recién creada. Maneja los errores en caso de problemas al crear la categoría.
export const createCategoryController = async (req, res) => {
  const { nombre } = req.body

  try {
    const categoryId = await createCategory(nombre)
    res.status(201).json({ message: 'Categoría creada exitosamente', categoryId })
  } catch (error) {
    console.error('Error al crear la categoría:', error)
    res.status(500).json({ message: 'Error al crear la categoría', error: error.message })
  }
}

// Encargada de recuperar todas las categorías existentes. No requiere de parámetros de entrada, y devuelve una lista de todas las categorías almacenadas en la base de datos. Utiliza la función getAllCategories para realizar la consulta. En caso de error durante la recuperación, devuelve un mensaje indicativo.
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories()
    res.json(categories)
  } catch (error) {
    console.error('Error al obtener las categorías:', error)
    res.status(500).json({ message: 'Error al obtener las categorías', error: error.message })
  }
}

// Esta función maneja la actualización de una categoría específica. Necesita el ID de la categoría que se va a actualizar, que se recibe a través de los parámetros de la ruta, y el nuevo nombre para la categoría, que se obtiene del cuerpo de la solicitud. Utiliza la función updateCategory para aplicar los cambios en la base de datos. Registra un mensaje de éxito o error dependiendo del resultado de la operación.
export const updateCategoryController = async (req, res) => {
  const { categoryId } = req.params
  const { nombre } = req.body

  try {
    await updateCategory(categoryId, nombre)
    console.log(`Categoria ${categoryId} actualizada por el administrador`)
    res.json({ message: 'Categoria actualizada exitosamente' })
  } catch (error) {
    console.error('Error al actulizar la categoria', error)
    res.status(500).json({ message: 'Error al actualizar la publicacion', error: error.message })
  }
}

// Se encarga de eliminar una categoría por su ID, que se proporciona a través de los parámetros de la ruta. Llama a deleteCategoryById para remover la categoría de la base de datos. Devuelve un mensaje de éxito si la categoría se elimina correctamente, o un mensaje de error en caso contrario.
export const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params
    await deleteCategoryById(categoryId)
    res.status(200).json({ message: 'Categoría eliminada exitosamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message })
  }
}
