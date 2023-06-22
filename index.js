import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/conectDatabase.js'
import routerUser from './src/routes/users.js/user.js'
import routerAuth from './src/routes/auth/login.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(routerUser)
app.use(routerAuth)
connectDB()
const Server = app.listen(PORT, () => console.log(`Server running in the port: ${PORT}`))

export { Server, app }
