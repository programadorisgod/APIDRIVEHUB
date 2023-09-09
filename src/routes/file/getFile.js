import { Router } from 'express'
import getFiles from '../../controllers/files/getFilesNormal.js'
import getAvatars from '../../controllers/files/getAvatars.js'

const routerFile = Router()
const path = '/api/files'

routerFile.get(`${path}/unidad/:directory/:fileName/:userName`, getFiles)
routerFile.get(`${path}/avatars/:fileName`, getAvatars)

export default routerFile
