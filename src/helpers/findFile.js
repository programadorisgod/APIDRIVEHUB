import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(import.meta.url)

export default async function verifyFileExistLink (nameFile, Directory) {
  const route = path.join(__dirname, `../../../unidad/${Directory}`)
  const filesInDirectory = await fs.readdir(path.dirname(route))
  try {
    // eslint-disable-next-line no-unused-vars
    for (const file of filesInDirectory) {
      const routeFile = path.join(route, nameFile)
      const stats = await fs.stat(routeFile)

      if (stats.isFile()) {
        return routeFile
      }
      if (stats.isDirectory()) {
        const result = verifyFileExistLink(nameFile, Directory)
        console.log(result)
        if (result) {
          return result
        }
      }
    }
  } catch (error) {
    return false
  }
}
