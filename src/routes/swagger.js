import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { settings } from '../config/env/varaibles.js'
import { ROUTES_PATH } from '../helpers/directories/paths.js'

const swggerDocumentOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'DriveHub-API',
      version: '1.1.0',
      description: 'API REST for Volaryss',
    },
  },
  servers: [
    {
      url: settings.HOST ?? 'http://localhost:4000',
    },
  ],
  apis: [`${path.join(ROUTES_PATH, 'users/*.js')}`, `${path.join(ROUTES_PATH, '/auth/*.js')}`],
}

const swaggerDocument = swaggerJSDoc(swggerDocumentOptions)

// Funcion to generate swagger documentation
const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.get('/api/doc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDocument)
  })
  console.log(`[Documentation] Swagger docs running on ${settings.HOST}/api-docs`.yellow.bold)
}

export default swaggerDocs
