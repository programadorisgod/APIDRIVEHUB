import QRCode from 'qrcode'
import path from 'node:path'
import crypto from 'node:crypto'

export async function GenerateQR(link) {
  const id = crypto.randomUUID()
  const route = path.join(process.cwd(), `/QR/${id}.png`)
  return new Promise((resolve, reject) => {
    QRCode.toFile(route, link, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(`${id}.png`)
      }
    })
  })
}
