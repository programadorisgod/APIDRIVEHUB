import UserModel from '../models /user.js'

export const verifyPassword = (password) => {
  if (password?.length < 8) {
    return true
  }
}

export const verifyEmail = async (email) => {
  const userExists = await UserModel.findOne({ email })
  const isValidEmail = email?.includes('@')

  if (userExists) {
    return true
  }
  if (!isValidEmail) {
    return 'invalid email'
  }
}

export const verifyUserName = async (userName) => {
  const userNameExists = await UserModel.findOne({ userName })
  if (userNameExists) {
    return true
  }
}
