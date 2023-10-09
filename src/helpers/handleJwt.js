import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.secretKey)
}

export const validateToken = async (token) => {
  return await jwt.verify(token, process.env.secretKey)
}
