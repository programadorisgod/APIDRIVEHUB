import fs from 'node:fs/promises'
import path from 'node:path'
import { GenerateQR } from '../qr/generateQR.js'
import { createHash, encrypt } from '../encrypt.js'
import { settings } from '../../config/env/varaibles.js'

export const generateFileAccessLink = async ({ fileIdentifier, directory }) => {
  try {
    const signature = encrypt({ text: fileIdentifier })

    const hash = createHash(signature)

    const accessLink = `${settings.HOST}/api/files/open-file?file=${encodeURIComponent(signature)}&dir=${directory.toString().trim()}&signature=${encodeURIComponent(hash)}`

    const qrFilename = await GenerateQR(accessLink)

    const qrFilePath = path.join(process.cwd(), '/QR', `${qrFilename}`)

    const qrImageBase64 = await fs.readFile(qrFilePath, { encoding: 'base64' })

    return {
      link: accessLink,
      QR: qrImageBase64,
    }
  } catch (error) {
    throw error
  }
}
