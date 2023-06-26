import { rmdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { httpError } from '../../helpers/handleError.js'

const __dirname = fileURLToPath(import.meta.url)

export const deleteFile = async (req, res, next) => {
  const { nameDirectory } = req.params
  try {
    const route = path.join(__dirname, `../../../../unidad/${nameDirectory}`)
    await rmdir(route, { recursive: true })
    return next()
  } catch (error) {
    httpError(error, res)
  }
}
