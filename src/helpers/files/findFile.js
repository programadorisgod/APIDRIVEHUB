import fs from 'node:fs/promises'
import path from 'node:path'
import { UNIDAD_PATH } from '../directories/paths.js'


export default async function verifyFileExistLink(nameFile, dir) {
  const route = path.join(UNIDAD_PATH, `${dir}`)
  const filesInDirectory = await fs.readdir(route)
  try {
    for (const file of filesInDirectory) {
      const pathFile = path.join(route, file)
      const stats = await fs.stat(pathFile)

      if (stats.isFile()) {
        return pathFile
      }

      if (stats.isDirectory()) {
        const nextDir = path.join(dir, file)
        return verifyFileExistLink(nameFile, nextDir)
      }
    }
  } catch (error) {
    return false
  }
}
