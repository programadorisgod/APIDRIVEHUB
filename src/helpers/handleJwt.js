import jwt from 'jsonwebtoken'
import { settings } from '../config/env/varaibles.js'

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, settings.SECRET_KEY)
}

export const validateToken =  (token) => {
  return  jwt.verify(token, settings.SECRET_KEY)
}
