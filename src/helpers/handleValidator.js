import UserModel from '../models /user.js'

export const verifyPassword = (password) => {
  if (password.length < 8) {
    return true
  }
}

export const verifyEmail = async (email) => {
  const userExist = await UserModel.findOne({ email })
  const correct = email.includes('@')

  if (userExist) {
    return true
  }
  if (!correct) {
    return 'Email invalid'
  }
}

export const verifyUserName = async (userName) => {
  const userNameExist = await UserModel.findOne({ userName })
  if (userNameExist) {
    return true
  }
}
