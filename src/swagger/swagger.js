import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { settings } from '../config/env/varaibles.js'
import { APP_ROOT, ROUTES_PATH } from '../helpers/directories/paths.js'

const swaggerDocumentOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'DriveHub-API',
      version: '1.1.0',
      description: 'API REST for Volaryss',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [`${APP_ROOT}/src/swagger/**/*.js`],
}
console.log(`${APP_ROOT}/src/swagger/*.js`)
const swaggerDocument = swaggerJSDoc(swaggerDocumentOptions)

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.get('/api/doc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDocument)
  })

  console.log(`[Documentation] Swagger docs running on ${settings.HOST}/api-docs`.yellow.bold)
}

export default swaggerDocs
