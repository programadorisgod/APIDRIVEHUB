import fs, { unlink } from 'node:fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = fileURLToPath(import.meta.url)

export const deleteFiles = async (req, res) => {
  const { nameDirectory } = req.params
  const { files } = req.body

  try {
    let totalSize = 0
    const route = path.join(__dirname, `../../../../unidad/${nameDirectory}`)

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
