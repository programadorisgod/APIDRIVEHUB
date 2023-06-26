import path from 'path'
import { fileURLToPath } from 'url'
import verifyFileExist from '../../helpers/verifyFile.js'
import { httpError } from '../../helpers/handleError.js'

const __dirname = fileURLToPath(import.meta.url)

/**
 * This function retrieves an uploaded file and sends it as a response if it exists, otherwise it
 * returns a 404 error.
 * @param req - `req` is an object that represents the HTTP request made by the client to the server.
 * It contains information about the request such as the request method, headers, URL, and parameters.
 * In this specific function, `req` is used to extract the `fileName` parameter from the URL path.
 * @param res - `res` is an object representing the HTTP response that an Express.js route sends when
 * it is accessed. It contains methods and properties that allow the server to send data back to the
 * client, such as `status`, `json`, and `sendFile`. In this specific code snippet, `res`
 * @returns The function is not returning anything explicitly, but it is sending a file as a response
 * using `res.sendFile(route)`.
 */
export default function getAvatars (req, res) {
  const { fileName } = req.params

  try {
    const route = path.join(__dirname, '../../../../uploads/', fileName)

    if (!verifyFileExist(route)) {
      res.status(404).json({ error: 'file not found' })
      return
    }
    res.sendFile(route)
  } catch (error) {
    httpError(error, res)
  }
}
