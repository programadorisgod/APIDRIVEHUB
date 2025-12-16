import { Router } from 'express'
import getFiles, { getFilebyLink, getMiniatures } from '../../controllers/files/getFiles.js'
import getAvatars from '../../controllers/files/getAvatars.js'
import { convertFile } from '../../helpers/files/convert.js'
import { checkAuth } from '../../middleware/auth/auth.js'
import { requestFileAccess } from '../../controllers/files/secureFileAccess.js'

const routerFile = Router()

const PREFIX = '/api/files'

routerFile.get(`${PREFIX}/unidad/:username/:dir/:filename`, getFiles)

routerFile.get(`${PREFIX}/unidad/:dir/:filename`, getMiniatures)
routerFile.get(`${PREFIX}/avatars/:filename`, getAvatars)
routerFile.get(`${PREFIX}/getlink`, checkAuth, requestFileAccess)
routerFile.get(`${PREFIX}/open-file`, getFilebyLink)
routerFile.get(`${PREFIX}/convert/:dir/:filename/:ext`, checkAuth, convertFile)

export default routerFile
