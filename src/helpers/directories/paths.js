import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const APP_ROOT = path.join(__dirname, '..', '..', '..') // sale de /src
export const UNIDAD_PATH = path.join(APP_ROOT, 'unidad')
export const UPLOADS_PATH = path.join(APP_ROOT, 'uploads')
export const CONVERTED_ṔATH = path.join(APP_ROOT, 'converted')
export const ROUTES_PATH = path.join(APP_ROOT, 'src', 'routes')
