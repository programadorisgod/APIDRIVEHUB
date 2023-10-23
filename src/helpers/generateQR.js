import QRCode from 'qrcode'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'
// import fs from 'node:fs/promises'

const __dirname = fileURLToPath(import.meta.url)
const id = crypto.randomUUID()
const route = path.join(__dirname, `../../../QR/${id}.png`)
console.log(__dirname, 'dirname')
console.log(procces.cwd())
// const routeFile = path.join(__dirname, '../../../QR/')
export default async function GenerateQR (link) {
  try {
    // await fs.unlink(route, { recursive: true, force: true })
    QRCode.toFile(route, link)
    return id
  } catch (error) {
    console.log(error, 'error')
  }
}
