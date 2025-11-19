import { Router } from 'express'
import getFiles, { getFilebyLink, getMiniatures } from '../../controllers/files/getFlies.js'
import getAvatars from '../../controllers/files/getAvatars.js'
import { encryptIdentifier } from '../../helpers/encrypt.js'
import { convertFile } from '../../helpers/convert.js'
import { checkAuth } from '../../middleware/auth/auth.js'

const routerFile = Router()

const PREFIX = '/api/files'

routerFile.get(`${PREFIX}/unidad/:username/:dir/:filename`, getFiles)

routerFile.get(`${PREFIX}/unidad/:dir/:filename`, getMiniatures)
routerFile.get(`${PREFIX}/avatars/:filename`, getAvatars)
routerFile.get(`${PREFIX}/getlink`, checkAuth, encryptIdentifier)
routerFile.get(`${PREFIX}/open-file`, getFilebyLink)
routerFile.get(`${PREFIX}/convert/:dir/:filename/:ext`, checkAuth, convertFile)

export default routerFile
