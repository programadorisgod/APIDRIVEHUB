import QRCode from 'qrcode'
import path from 'node:path'
import crypto from 'node:crypto'

const id = crypto.randomUUID()
const route = path.join(process.cwd(), `/QR/${id}.png`)

export default async function GenerateQR (link) {
  try {
    return new Promise((resolve, reject) => {
      QRCode.toFile(route, link, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve(`${id}.png`)
        }
      })
    })
  } catch (error) {
    console.log(error, 'error')
  }
}
