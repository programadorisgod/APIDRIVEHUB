import { comparePassword } from '../../helpers/handleBcrypt.js'
import { generateToken } from '../../helpers/handleJwt.js'
import UserModel from '../../models /user.js'

export const Login = async (req, res) => {
  const { password, email } = req.body
  console.log(email)

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
    res.status(500).json({ error: 'an internal error ocurred in the server ' })
  }
}
