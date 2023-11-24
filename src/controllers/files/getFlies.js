import path from 'path'
import verifyFileExist from '../../helpers/verifyFile.js'
import { httpError } from '../../helpers/handleError.js'
import { descryptIdentifier } from '../../helpers/encrypt.js'
import verifyFileExistLink from '../../helpers/findFile.js'
import fs from 'fs'
import UserModel from '../../models /user.js'
import Throttle from 'throttle'
/**
 * This function retrieves a file from a specified directory and sends it as a response, while handling
 * errors.
 * @param req - The request object represents the HTTP request that the server receives from the
 * client. It contains information about the request, such as the URL, headers, and parameters.
 * @param res - `res` is the response object that is used to send the response back to the client who
 * made the request. It is an instance of the `http.ServerResponse` class in Node.js. The `res` object
 * has methods like `send`, `json`, `status`, etc. that are
 * @returns The function is not returning anything explicitly, but it is sending a file as a response
 * using the `res.sendFile()` method if the file exists. If the file does not exist, it sends a 404
 * error response with a JSON object containing an error message. If there is any other error, it sends
 * a 500 error response with a JSON object containing an error message.
 */
export default async function getFiles (req, res) {
  const { fileName, directory, userName } = req.params
  try {
    const route = path.join(process.cwd(), `/unidad/${directory}`, fileName)
    const user = await UserModel.findOne({ userName })

    if (!user) {
      res.status(404).json({ error: 'user not found' })
      return
    }

    if (!verifyFileExist(route)) {
      res.status(404).json({ error: 'file not found' })
      return
    }

    const fileStream = fs.createReadStream(route)
    const stat = fs.statSync(route)
    const fileSize = stat.size

    res.setHeader('Content-Type', 'application/octet-stream')
    res.header('Content-Length', fileSize)

    if (user.premium) {
      const throttle = new Throttle(1024 * 1024 * 250)// 250MB/s
      fileStream.pipe(throttle).pipe(res)
      return
    }

    const throttle = new Throttle(1024 * 1024 * 50)// 10MB/s
    fileStream.pipe(throttle).pipe(res, { end: true })
  } catch (error) {
    httpError(error, res)
  }
}

export async function getMiniatures (req, res) {
  const { fileName, Default } = req.params
  try {
    const route = path.join(process.cwd(), `/unidad/${Default}/gallery`, fileName)
    if (!verifyFileExist(route)) {
      res.status(404).json({ error: 'file not found' })
      return
    }

    res.sendFile(route)
  } catch (error) {
    httpError(error, res)
  }
}

export async function getFilebyLink (req, res) {
  const { file } = req.query
  const { Directory } = req.query
  const nameFile = descryptIdentifier(file)
  try {
    const fileExist = await verifyFileExistLink(nameFile, Directory)
    if (!fileExist) {
      res.status(404).json({ error: 'file not found' })
      return
    }

    res.sendFile(fileExist)
  } catch (error) {
    httpError(error, res)
  }
}
