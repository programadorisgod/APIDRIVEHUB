import bcrypt from 'bcrypt'

export const encryptPassword = async (password) => {
  const has = await bcrypt.hash(password, 10)
  return has
}

export const comparePassword = async (password, passwordHas) => {
  return await bcrypt.compare(password, passwordHas)
}
