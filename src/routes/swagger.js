import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'node:url'
import path from 'path'
const __dirname = fileURLToPath(import.meta.url)

// Metadata info about oui API
const swggerDocumentOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'DriveHub-API',
      version: '1.0.0',
      description: 'API REST for DriveHub'
    }
  },
  servers: [{
    url: process.env.HOST ?? 'http://localhost:4000'
  }],
  apis: [
`${path.join(__dirname, '../../routes/users/*.js')}`,
`${path.join(__dirname, '../../routes/auth/*.js')}`
  ]
}

const swaggerDocument = swaggerJSDoc(swggerDocumentOptions)

// Funcion to generate swagger documentation
const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.get('/api/doc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDocument)
  })
  console.log('[Documentation] Swagger docs running on http://localhost:4000/api-docs'.yellow.bold)
}

export default swaggerDocs
