import { Router } from 'express'
import { sendEmail } from '../../helpers/sendEmail.js'

const emailRouter = Router()
const PREFIX = '/api/support'

emailRouter.post(`${PREFIX}/send/email`, sendEmail)

export default emailRouter
