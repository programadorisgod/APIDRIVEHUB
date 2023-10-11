import { Router } from 'express'
import getFiles, { getFilebyLink } from '../../controllers/files/getFlies.js'
import getAvatars from '../../controllers/files/getAvatars.js'
import { encryptIdentifier } from '../../helpers/encrypt.js'
import { convertFile } from '../../helpers/convert.js'

const routerFile = Router()
const path = '/api/files'

routerFile.get(`${path}/unidad/:directory/:fileName`, getFiles)
routerFile.get(`${path}/avatars/:fileName`, getAvatars)
routerFile.get(`${path}/getlink`, encryptIdentifier)
routerFile.get(`${path}/open-file`, getFilebyLink)
routerFile.get(`${path}/convert/:Directory/:fileName/:ext`, convertFile)

export default routerFile
