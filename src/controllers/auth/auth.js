import { comparePassword } from '../../helpers/handleBcrypt.js'
import { httpError } from '../../helpers/handleError.js'
import { generateToken } from '../../helpers/handleJwt.js'
import UserModel from '../../models /user.js'

/**
 * This function handles user login by checking if the email and password provided match with the ones
 * stored in the database and returns a token if successful.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the HTTP status code, headers, and the
 * response body. In this case, the response object is used to send a JSON response with either an
 * error message or a
 * @returns This function returns a JSON response with the user's email and a token if the login
 * credentials are valid. If the credentials are invalid, it returns a JSON response with an error
 * message. If there is an internal server error, it returns a JSON response with an error message.
 */
export const Login = async (req, res) => {
  const { password, email } = req.body

  try {
    const userEmailCorrect = await UserModel.findOne({ email })

    if (!userEmailCorrect) {
      res.status(409).json({ error: 'Credentials invalid' })
      return
    }
    const passwordCorrect = await comparePassword(password, userEmailCorrect.password)

    if (!passwordCorrect) {
      res.status(409).json({ error: 'Credentials invalid' })
      return
    }

    const token = generateToken(userEmailCorrect)

    res.status(200).json({ userEmailCorrect, token })
  } catch (error) {
    httpError(error, res)
  }
}
