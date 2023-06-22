import { Router } from 'express'
import { UpdateUser, createUser, delteUser, getUser } from '../../controllers/users.js/user.js'
import { ValidateData } from '../../validators/validatorUser.js'
import { checkAuth } from '../../middleware/auth.js'
const routerUser = Router()

const path = '/api/users'

routerUser.get(`${path}/:userName`, checkAuth, getUser)
routerUser.post(`${path}/create`, ValidateData, createUser)
routerUser.put(`${path}/update/:id`, checkAuth, ValidateData, UpdateUser)
routerUser.delete(`${path}/delete/:userName`, checkAuth, delteUser)

export default routerUser
