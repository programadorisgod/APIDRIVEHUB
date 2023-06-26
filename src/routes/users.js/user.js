import { Router } from 'express'
import { UpdateUser, createDirectorie, createUser, deleteDirectory, deleteFileUser, deleteUser, getUser, updateDirectories } from '../../controllers/users.js/user.js'
import { ValidateData } from '../../validators/validatorUser.js'
import { checkAuth } from '../../middleware/auth/auth.js'
import { uploadFile } from '../../middleware/multer/upload.js'
import { createFile } from '../../middleware/directories/CreateDirectories.js'
import { uploadAvatar } from '../../middleware/multer/uploadAvatar.js'
import { deleteFile } from '../../middleware/directories/DeleteDirectory.js'
import { deleteFiles } from '../../middleware/directories/DeleteFiles.js'

const routerUser = Router()

const path = '/api/users'

routerUser.get(`${path}/:userName`, getUser)
routerUser.post(`${path}/create`, ValidateData, createUser)
routerUser.put(`${path}/update/:id`, ValidateData, uploadAvatar, UpdateUser)
routerUser.put(`${path}/createDirectory/:userName`, createDirectorie, createFile)
routerUser.put(`${path}/addFields/:userName/:nameDirectory`, uploadFile, updateDirectories)
routerUser.delete(`${path}/deleteDirectory/:userName/:nameDirectory`, deleteDirectory, deleteFile)
routerUser.delete(`${path}/deleteFiles/:userName/:nameDirectory`, deleteFileUser, deleteFiles)
routerUser.delete(`${path}/delete/:userName`, checkAuth, deleteUser)

export default routerUser
