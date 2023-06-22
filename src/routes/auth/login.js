import { Router } from 'express'
import { Login } from '../../controllers/auth/auth.js'

const routerAuth = Router()

const path = '/api/auth/login'

routerAuth.post(path, Login)

export default routerAuth
