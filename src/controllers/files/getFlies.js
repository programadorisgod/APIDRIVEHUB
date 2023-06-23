import path from 'path'
import { fileURLToPath } from 'url'
import verifyFileExist from '../../helpers/verifyFile.js'

const __dirname = fileURLToPath(import.meta.url)

export default function getFiles (req, res) {
  const { fileName, directory } = req.params

  try {
    const route = path.join(__dirname, `../../../../unidad/${directory}`, fileName)
    if (!verifyFileExist(route)) {
      res.status(404).json({ error: 'file not found' })
      return
    }
    res.sendFile(route)
  } catch (error) {
    res.status(500).json({ error: 'Error getting file' })
  }
}
