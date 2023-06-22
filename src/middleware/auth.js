import { validateToken } from '../helpers/handleJwt.js'

export const checkAuth = async (req, res, next) => {
  try {
    const authorization = req.get('Authorization')
    let token

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.split(' ').pop()
    }
    const tokenData = await validateToken(token)

    if (tokenData.id) {
      next()
    }
  } catch (error) {
    res.status(203).json({ error: 'You dont have authoriaztion' })
  }
}
