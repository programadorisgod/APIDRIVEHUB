import { Router } from 'express'
import { sendEmail } from '../../helpers/sendEmail.js'

const routerEmail = Router()

const path = '/api/support/sendEmail'

routerEmail.post(`${path}`, sendEmail)

export default routerEmail
