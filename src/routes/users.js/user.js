import { Router } from 'express'
import { UpdateUser, createDirectorie, createUser, delteUser, getUser, updateDirectories } from '../../controllers/users.js/user.js'
import { ValidateData } from '../../validators/validatorUser.js'
import { checkAuth } from '../../middleware/auth/auth.js'
import { uploadFile } from '../../middleware/multer/upload.js'
import { createFile } from '../../middleware/directories/CreateDirectories.js'
import { uploadAvatar } from '../../middleware/multer/uploadAvatar.js'

const routerUser = Router()

const path = '/api/users'

routerUser.get(`${path}/:userName`, getUser)
routerUser.post(`${path}/create`, ValidateData, createUser)
routerUser.put(`${path}/update/:id`, ValidateData, uploadAvatar, UpdateUser)
routerUser.put(`${path}/createDirectory/:userName`, createDirectorie, createFile)
routerUser.put(`${path}/addFields/:nameDirectorio`, uploadFile, updateDirectories)
routerUser.delete(`${path}/delete/:userName`, checkAuth, delteUser)

export default routerUser
