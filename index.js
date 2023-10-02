import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import { rateLimit } from 'express-rate-limit'

import connectDB from './config/conectDatabase.js'
import routerUser from './src/routes/users/user.js'
import routerAuth from './src/routes/auth/login.js'
import routerFile from './src/routes/file/getFile.js'
import swaggerDocs from './src/routes/swagger.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const HOST = '0.0.0.0'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(limiter)
app.use(routerUser)
app.use(routerAuth)
app.use(routerFile)

app.get('/', (req, res) => {
  res.send({ Hello: 'API REST for SafeSync' })
})

connectDB()
const Server = app.listen(PORT, HOST, () => {
  console.log(`Server running in the address:${HOST}:${PORT}`.blue.bold)
  swaggerDocs(app, PORT)
})

export { Server, app }
