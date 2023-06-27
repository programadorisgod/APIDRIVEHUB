import { verifyEmail, verifyPassword, verifyUserName } from '../helpers/handleValidator.js'

/**
 * This function validates user data (username, password, and email) before allowing it to be processed
 * further.
 * @param req - The req parameter is an object that represents the HTTP request made by the client to
 * the server. It contains information such as the request method, headers, URL, and any data sent in
 * the request body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client making the request. It contains methods such as `status` and `json` that are used to set the
 * HTTP status code and send a JSON response, respectively.
 * @param next - `next` is a function that is called to pass control to the next middleware function.
 * It is typically used to move to the next function in the middleware chain.
 * @returns If the request body is not empty and all the validations pass, the function returns the
 * `next()` function, which passes control to the next middleware function. If the request body is
 * empty, the function also returns `next()`. If any of the validations fail, the function returns a
 * response with an error message and does not call `next()`. If an error occurs during the execution
 * of the function
 */
export const ValidateData = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const { password, userName, email } = req.body
      const userNameExist = await verifyUserName(userName)

      if (userNameExist) {
        res.status(400).json({ erro: 'Username is already in use ' })
        return
      }

      const passwordError = await verifyPassword(password)
      if (passwordError) {
        res.status(400).json({ error: 'the password is minor a 8 digits ' })
        return
      }

      if (email.length === 0) {
        res.status(400).json({ erro: 'Email empty' })
        return
      }

      const emailError = await verifyEmail(email)
      if (emailError === 'Email invalid') {
        res.status(400).json({ erro: 'Email invalid' })
        return
      }
      if (emailError) {
        res.status(400).json({ erro: 'Email is already in use ' })
        return
      }

      return next()
    }
    return next()
  } catch (error) {
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
