import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
/** Usamos el fileURLToPath para convertir la url en una ruta de archivo */
const __dirname = fileURLToPath(import.meta.url)
export const createFile = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const { nameDirectorio } = req.body

      const nameFile = nameDirectorio

      const route = path.join(__dirname, `../../../../unidad/${nameFile}`)

      // creamos la carpeta
      await mkdir(route, { recursive: true })

      return next()
    }
    return next()
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
