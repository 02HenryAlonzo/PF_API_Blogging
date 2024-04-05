import swaggerAutogen from 'swagger-autogen'
import './src/app.js'

const doc = {
  info: {
    version: '1.0.0',
    title: 'API de Blogging',
    description: 'Documentación de la API de Blogging'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  import('./src/app.js')
})
