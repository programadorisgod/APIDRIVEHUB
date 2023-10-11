import crypto, { createDecipheriv } from 'node:crypto'
import GenerateQR from './generateQR.js'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const algoritm = 'aes-256-cbc'
const key = Buffer.from('0a1f4a9c3b0f6b9c5d2a8c3d6e8f7f1c4a3b2c1d5e4f6d7c8a9b0c1d2e3f4a5b', 'hex')
const iv = Buffer.from('0f1e2d3c4b5a69788796a5b4c3d2e1f0', 'hex')

const __dirname = fileURLToPath(import.meta.url)

const encryptIdentifier = async (req, res) => {
  try {
    const { identifier } = req.query
    const { Directory } = req.query

    const cipher = crypto.createCipheriv(algoritm, key, iv)

    let encrypted = cipher.update(identifier, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const hash = createHash(encrypted)

    const link = `${process.env.HOST}/api/files/open-file?file=${encodeURIComponent(encrypted)}&Directory=${Directory}&signature=${encodeURIComponent(hash)}`
    const idQR = await GenerateQR(link)
    const route = path.join(__dirname, `../../../QR/${idQR}.png`)
    const qrImage = await fs.readFile(route, { encoding: 'base64' })

    const response = {
      link,
      QR: qrImage
    }
    res.status(200).json({ response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export function createHash (identifier) {
  const hash = crypto.createHash('sha256', process.env.secret)
  hash.update(identifier)
  return hash.digest('hex')
}

function descryptIdentifier (identifier) {
  const decipher = createDecipheriv(algoritm, key, iv)

  let descrypted = decipher.update(identifier, 'hex', 'utf8')
  descrypted += decipher.final('utf8')
  return descrypted.toString()
}

export { encryptIdentifier, descryptIdentifier }
