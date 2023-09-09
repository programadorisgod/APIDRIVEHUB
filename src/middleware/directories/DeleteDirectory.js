import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { httpError } from '../../helpers/handleError.js'
import { rmdir } from 'node:fs'
import getDirectorySize from '../../helpers/calculateSize.js'
const __dirname = fileURLToPath(import.meta.url)

export const deleteFile = async (req, res, nameDirectory) => {
  try {
    const route = path.join(__dirname, `../../../../unidad/${nameDirectory}`)
    const size = await getDirectorySize(route)
    await rmdir(route, { recursive: true })
    return size
  } catch (error) {
    httpError(error, res)
  }
}
