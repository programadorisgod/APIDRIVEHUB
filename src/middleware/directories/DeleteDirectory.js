import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { httpError } from '../../helpers/handleError.js'
import getDirectorySize from '../../helpers/calculateSize.js'
import { rm } from 'node:fs/promises'

const __dirname = fileURLToPath(import.meta.url)

export const deleteFile = async (req, res) => {
  const { nameDirectory } = req.params
  try {
    const route = path.join(__dirname, `../../../../unidad/${nameDirectory}`)
    const sizeDirectory = await getDirectorySize(route)
    await rm(route, { recursive: true })
    return sizeDirectory
  } catch (error) {
    httpError(error, res)
  }
}
