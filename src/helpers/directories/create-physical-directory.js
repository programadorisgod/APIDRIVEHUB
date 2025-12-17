import path from 'node:path'
import { mkdir } from 'node:fs/promises'
import { UNIDAD_PATH } from './paths.js'
/**
 * Creates a physical directory on disk inside `/unidad/<baseDir>/<directoryName>`.
 *
 * This function builds the absolute path using the current working directory,
 * then attempts to create the folder recursively. If the directory already exists,
 * no error is thrown due to the `recursive: true` option.
 *
 * @param {object} params
 * @param {string} params.baseDir - Base directory where the new folder will be created.
 * @param {string} params.directoryName - Name of the folder to create.
 *
 * @returns {Promise<boolean|Error>} Returns `true` on success, or the caught Error object.
 */

export const createPhysicalDir = async ({ baseDir, directoryName }) => {
  try {
    const directoryPath = path.join(UNIDAD_PATH, `${baseDir}/${directoryName.trim()}`)

    await mkdir(directoryPath, { recursive: true })

    return true
  } catch (error) {
    return error
  }
}
