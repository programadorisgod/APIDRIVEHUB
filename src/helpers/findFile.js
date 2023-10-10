import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(import.meta.url)
const route = path.join(__dirname, '../../../unidad/')
export default async function verifyFileExistLink (nameFile, currentRoute = route, Directory) {
  const filesInDirectory = await fs.readdir(path.dirname(currentRoute + `/unidad/${Directory}`))
  try {
    for (const file of filesInDirectory) {
      const routeFile = path.join(currentRoute, file, nameFile)
      const stats = await fs.stat(routeFile)

      if (stats.isFile()) {
        return routeFile
      }
      if (stats.isDirectory()) {
        const result = verifyFileExistLink(nameFile, routeFile)
        if (result) {
          return result
        }
      }
    }
  } catch (error) {
    return false
  }
}
