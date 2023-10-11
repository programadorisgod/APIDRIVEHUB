import path from 'node:path'
import { fileURLToPath } from 'node:url'
import libre from 'libreoffice-convert'
import util from 'node:util'
import fs from 'node:fs/promises'

const __dirname = fileURLToPath(import.meta.url)
const libreConvertAsync = util.promisify(libre.convert)
export const convertFile = async (req, res) => {
  const { Directory, fileName, ext } = req.params

  try {
    const filename = fileName.split('.')[0]

    const route = path.join(__dirname, `../../../unidad/${Directory}`, fileName)

    const routeFileConverted = path.join(__dirname, `../../../converted/${filename}.${ext}`)

    const docx = await fs.readFile(route)

    const pdfBuf = await libreConvertAsync(docx, ext, undefined)

    await fs.writeFile(routeFileConverted, pdfBuf)

    await res.sendFile(routeFileConverted)
  } catch (error) {
    res.status(500).json({ msg: 'Failed convert' })
  }
}
