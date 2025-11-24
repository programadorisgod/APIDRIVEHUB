import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
export const APP_ROOT = path.join(__dirname, '..', '..', '..') // sale de /src
console.log(APP_ROOT)
export const UNIDAD_PATH = path.join(APP_ROOT, 'unidad')
