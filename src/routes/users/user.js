import { Router } from 'express'
import {
  updateUser,
  createFolder,
  createUser,
  deleteDirectory,
  deleteFileUser,
  deleteUser,
  getUser,
  uploadFileToDirectory,
  updateMember,
} from '../../controllers/users/user.js'
import {  validateData } from '../../validators/validatorUser.js'
import { checkAuth } from '../../middleware/auth/auth.js'
import { uploadFile } from '../../middleware/multer/upload.js'
import { uploadAvatar } from '../../middleware/multer/upload-avatar.js'
import { verifySpace } from '../../helpers/verifySpace.js'

const routerUser = Router()

const path = '/api/users'

routerUser.get(`${path}/:id`, checkAuth, getUser)

routerUser.post(`${path}/`, validateData, createUser)

routerUser.put(`${path}/:id`, checkAuth, validateData, uploadAvatar, updateUser)

routerUser.post(`${path}/:username/directories/:baseDir`, checkAuth, createFolder)

routerUser.post(
  `${path}/:username/directories/:directory/folder/:folder/files`,
  checkAuth,
  verifySpace,
  uploadFile,
  uploadFileToDirectory
)

routerUser.put(`${path}/membership/:username`, checkAuth, updateMember)

routerUser.delete(`${path}/directory/:username/:dir`, checkAuth, deleteDirectory)

routerUser.delete(`${path}/files/:username/:dir`, checkAuth, deleteFileUser)

routerUser.delete(`${path}/:username`, checkAuth, deleteUser)

export default routerUser
