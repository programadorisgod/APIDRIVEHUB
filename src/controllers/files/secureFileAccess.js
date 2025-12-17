import { httpError } from '../../helpers/handleError.js'
import { generateFileAccessLink } from '../../helpers/files/secureFileAccess.js'

export async function requestFileAccess(req, res, next) {
  const { fileIdentifier } = req.query
  const { directory } = req.query
  try {
    const fileAccess = await generateFileAccessLink({ fileIdentifier, directory })
    res.status(200).json(fileAccess)
  } catch (error) {
    httpError(error, res)
  }
}
