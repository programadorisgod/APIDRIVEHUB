import { Router } from 'express'
import { sendEmail } from '../../helpers/sendEmail.js'

const emailRouter = Router()
const path = '/api/support/sendEmail'

emailRouter.post(path, sendEmail)

export default emailRouter
