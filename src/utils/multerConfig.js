import multer from 'multer'
import path from 'path'

// Define la configuración de almacenamiento para Multer, especificando el directorio de destino y el método de nomenclatura de archivos para asegurar nombres únicos y evitar sobreescrituras.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único para evitar sobreescrituras
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

// Establece un filtro para procesar solo imágenes, rechazando archivos que no cumplan con el tipo MIME esperado. Esto ayuda a mantener la integridad del almacenamiento y evita subidas no deseadas.
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('No es un archivo de imagen'), false)
  }
}

// Inicializa y exporta una instancia de Multer configurada para manejar subidas de archivos, utilizando el almacenamiento y filtro definidos. Facilita la incorporación de subidas de imágenes a rutas específicas en la aplicación.
export const upload = multer({ storage, fileFilter })
