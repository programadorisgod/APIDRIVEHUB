import UserModel from '../models /user.js'
import { httpError } from './handleError.js'

export const verifySpace = (req, res, next) => {
  const { userName } = req.params

  try {
    const user = UserModel.findOne({ userName })
    if (!user) {
      res.status(404).json({ error: 'user not found' })
      return
    }
    const size = user.space / 1024 ** 3
    if (size > 4.66 && user.premium === false) {
      res.status(400).json({ error: 'no space' })
      return
    }
    return next()
  } catch (error) {
    httpError(error, res)
  }
}
