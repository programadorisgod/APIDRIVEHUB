import { unlink } from 'node:fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = fileURLToPath(import.meta.url)

export const deleteFiles = async (req, res) => {
  const { nameDirectory } = req.params
  const { files } = req.body
  try {
    const route = path.join(__dirname, `../../../../unidad/${nameDirectory}`)
    for (const file of files) {
      await unlink(`${route}/${file}`)
    }
    res.status(200).json({ message: 'files deleted correctly' })
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
