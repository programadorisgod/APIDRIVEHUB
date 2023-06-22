import { verifyEmail, verifyPassword, verifyUserName } from '../helpers/handleValidator.js'

export const ValidateData = async (req, res, next) => {
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

  const emailError = await verifyEmail(email)
  if (emailError === 'Email invalid') {
    res.status(400).json({ erro: 'Email invalid' })
  }
  if (emailError) {
    res.status(400).json({ erro: 'Email is already in use ' })
    return
  }

  return next()
}
