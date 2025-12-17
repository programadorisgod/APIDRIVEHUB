import path from 'node:path'
import { httpError } from '../../helpers/handleError.js'
import getDirectorySize from '../../helpers/directories/calculateSize.js'
import { rm } from 'node:fs/promises'
import { UNIDAD_PATH } from '../../helpers/directories/paths.js'

export const deleteFile = async (req, res) => {
  const { nameDirectory } = req.params

  try {
    const route = path.join(UNIDAD_PATH, `unidad/${nameDirectory}`)

    const sizeDirectory = await getDirectorySize(route)

    await rm(route, { recursive: true })

    return sizeDirectory
  } catch (error) {
    httpError(error, res)
  }
}
