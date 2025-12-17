import { Router } from 'express'
import { login } from '../../controllers/auth/auth.js'

const routerAuth = Router()

const path = '/api/auth/login'

routerAuth.post(path, login)

export default routerAuth
