import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import connectDB from './config/conectDatabase.js'
import routerUser from './src/routes/users/user.js'
import routerAuth from './src/routes/auth/login.js'
import routerFile from './src/routes/file/getFile.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.json('Welcome to my API')
})

app.use(routerUser)
app.use(routerAuth)
app.use(routerFile)
connectDB()
const Server = app.listen(PORT, () => console.log(`Server running in the port: ${PORT}`.bold))

export { app, Server }
