import fs, { unlink } from 'node:fs/promises'
import path from 'path'
import { UNIDAD_PATH } from '../../helpers/directories/paths.js'

export const deleteFiles = async (req, res) => {
  const { nameDirectory } = req.params
  const { files } = req.body

  try {
    let totalSize = 0
    const route = path.join(UNIDAD_PATH, `unidad/${nameDirectory}`)
    for (const file of files) {
      const filePath = `${route}/${file}`
      const stats = await fs.stat(filePath)
      totalSize += stats.size
      await unlink(filePath)
    }
    return totalSize
  } catch (error) {
    return error
  }
}
