import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { httpError } from '../../helpers/handleError.js'
import { error } from 'node:console'
/** Usamos el fileURLToPath para convertir la url en una ruta de archivo */

export const createPhysicalDir = async ({dir, directoryName}) => {
  try {
      /** unimos la ruta con el directorio en el que estemos, nos devolvemos y accedemos a la raiz  */
      const route = path.join(process.cwd(), `/unidad/${dir}/${directoryName.trim()}`)

      await mkdir(route, { recursive: true })
      return true
  } catch (error) {
    return error
  }
}

export const createDirectory = async (directoryName) => {
  try {
    const route = path.join(process.cwd(), `/unidad/${directoryName.trim()}`)
    const routeMiniature = path.join(process.cwd(), `/unidad/${directoryName.trim()}/gallery`)
    await mkdir(route, { recursive: true })
    await mkdir(routeMiniature, { recursive: true })
  } catch (s) {
    console.log(error)
  }
}
