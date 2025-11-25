import path from 'path'
import verifyFileExist from '../../helpers/files/verifyFile.js'
import { httpError } from '../../helpers/handleError.js'
import { UPLOADS_PATH } from '../../helpers/directories/paths.js'

/**
 * Retrieves a stored avatar file and sends it in the HTTP response.
 *
 * Extracts the `filename` parameter from the request and resolves its absolute
 * path inside the uploads directory. If the file does not exist, responds with
 * HTTP 404. Otherwise, sends the file to the client. Any unexpected errors are
 * handled by the `httpError` helper.
 *
 * @param {import('express').Request} req - HTTP request object containing `params.filename`.
 * @param {import('express').Response} res - HTTP response used to return the file or an error.
 * @returns {void}
 */

export default function getAvatars(req, res) {
  const { filename } = req.params

  try {
    const route = path.join(UPLOADS_PATH, filename)

    if (!verifyFileExist(route)) {
      res.status(404).json({ error: 'file not found' })
      return
    }
    res.sendFile(route)
  } catch (error) {
    httpError(error, res)
  }
}
