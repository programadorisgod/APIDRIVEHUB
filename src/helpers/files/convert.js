import path from 'node:path'
import libre from 'libreoffice-convert'
import util from 'node:util'
import fs from 'node:fs/promises'
import { CONVERTED_ṔATH, UNIDAD_PATH } from '../directories/paths.js'

const libreConvertAsync = util.promisify(libre.convert)
export const convertFile = async (req, res) => {
  const { dir, folder, filename, ext } = req.params

  try {
    const baseName = filename.split('.')[0]

    const filePath = folder
      ? path.join(UNIDAD_PATH, `${dir}/${folder}`, filename)
      : path.join(UNIDAD_PATH, `${dir}`, filename)

    const convertedFilePath = path.join(CONVERTED_ṔATH, `${baseName}.${ext}`)

    const docx = await fs.readFile(filePath)

    const pdfBuf = await libreConvertAsync(docx, ext, undefined)

    await fs.writeFile(convertedFilePath, pdfBuf)

    await res.sendFile(convertedFilePath)
  } catch (error) {
    res.status(500).json({ msg: 'Failed convert' })
  }
}
