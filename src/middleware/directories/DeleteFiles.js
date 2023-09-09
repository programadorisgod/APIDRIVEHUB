import { unlink } from 'node:fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import { httpError } from '../../helpers/handleError.js'
import getDirectorySize from '../../helpers/calculateSize.js'

const __dirname = fileURLToPath(import.meta.url)
export const deleteFiles = async (req, res, nameDirectory, files) => {
  try {
    const route = path.join(__dirname, `../../../../unidad/${nameDirectory}`)
    const size = await getDirectorySize(route)
    for (const file of files) {
      await unlink(`${route}/${file}`)
    }
    console.log(size, 'bytesx2')
    return size
  } catch (error) {
    httpError(error, res)
  }
}
