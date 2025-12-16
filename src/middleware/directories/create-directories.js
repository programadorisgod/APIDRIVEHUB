import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { UNIDAD_PATH } from '../../helpers/directories/paths.js'
/**
 * Creates a main directory and its nested `gallery` folder inside `/unidad/<directoryName>`.
 *
 * This function computes two absolute paths:
 *  - `/unidad/<directoryName>`
 *  - `/unidad/<directoryName>/gallery`
 *
 * Both directories are created recursively. If they already exist, no error is thrown.
 *
 * @param {string} directoryName - Name of the folder structure to create.
 *
 * @returns {Promise<void>} Logs errors to the console if the creation fails.
 */

export const createDirectoryStructure = async (directoryName) => {
  try {
    const directoryPath = path.join(UNIDAD_PATH, `${directoryName.trim()}`)

    const directoryPathMiniature = path.join(UNIDAD_PATH, `${directoryName.trim()}/gallery`)

    await mkdir(directoryPath, { recursive: true })

    await mkdir(directoryPathMiniature, { recursive: true })
  } catch (error) {
    console.log(error)
  }
}
