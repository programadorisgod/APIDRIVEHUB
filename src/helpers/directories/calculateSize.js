import fs from 'node:fs/promises'
import path from 'node:path'

export default async function getDirectorySize (route) {
  async function calculateSize (route) {
    const stats = await fs.stat(route)
    if (stats.isDirectory()) {
      const files = await fs.readdir(route)
      const subDirectoryPromises = files.map(async (file) => {
        const subDirectory = path.join(route, file)
        return calculateSize(subDirectory)
      })
      const subDirectorySizes = await Promise.all(subDirectoryPromises)
      return subDirectorySizes.reduce((a, size) => a + size, 0)
    } else {
      return stats.size
    }
  }

  const totalSize = await calculateSize(route)

  return totalSize
}
