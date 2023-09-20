import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(import.meta.url)

export default function readFromJson (pathRealitve) {
  try {
    const routeAbsolute = path.resolve(__dirname, pathRealitve)
    fs.readFile(routeAbsolute, 'utf-8', (err, data) => {
      if (err) {
        console.error(err, 'xd')
      }
      console.log(data)
      return data
    })
  } catch (error) {
    console.error(error)
  }
}
