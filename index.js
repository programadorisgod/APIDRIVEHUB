import express, { urlencoded } from 'express'
import cors from 'cors'
// eslint-disable-next-line no-unused-vars
import colors from 'colors'

import connectDB from './config/conectDatabase.js'
import routerUser from './src/routes/users/user.js'
import routerAuth from './src/routes/auth/login.js'
import routerFile from './src/routes/file/getFile.js'
import swaggerDocs from './src/routes/swagger.js'
import emailRouter from './src/routes/Email/sendMail.js'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT ?? 4000

app.use(cors())

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(morgan('dev'))
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to DRIVEHUB' })
})

app.use(routerUser)
app.use(routerAuth)
app.use(routerFile)
app.use(emailRouter)
connectDB()

const Server = app.listen(PORT, () => {
  console.log(`Server running in the port: ${PORT}`.bold)
  swaggerDocs(app, PORT)
})

export { app, Server }
