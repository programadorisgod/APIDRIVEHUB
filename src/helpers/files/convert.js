import path from 'node:path'
import { fileURLToPath } from 'node:url'
import libre from 'libreoffice-convert'
import util from 'node:util'
import fs from 'node:fs/promises'
import { UPLOADS_PATH } from '../directories/paths'

const __dirname = fileURLToPath(import.meta.url)
const libreConvertAsync = util.promisify(libre.convert)
export const convertFile = async (req, res) => {
  const { directory, filename, ext } = req.params

  try {
    const baseName = filename.split('.')[0]

    const route = path.join(UPLOADS_PATH, `${directory}`, filename)

    const convertedFilePath = path.join(__dirname, `../../../converted/${baseName}.${ext}`)

    const docx = await fs.readFile(route)

    const pdfBuf = await libreConvertAsync(docx, ext, undefined)

    await fs.writeFile(convertedFilePath, pdfBuf)

    await res.sendFile(convertedFilePath)
  } catch (error) {
    res.status(500).json({ msg: 'Failed convert' })
  }
}
