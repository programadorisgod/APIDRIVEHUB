import nodemailer from 'nodemailer'
import { httpError } from './handleError.js'
import { google } from 'googleapis'
export const sendEmail = async (req, res) => {
  const { content, subject, Email } = req.body
  try {
    const outh2Client = new google.auth.OAuth2(
      '178047990490-l1va0ik1hsq65006i4iqi5cj3pd9qn2r.apps.googleusercontent.com',
      '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',
      'https://safesync.fly.dev/'
    )
    outh2Client.setCredentials({
      refresh_token: '1//04BRycP5uAvJJCgYIARAAGAQSNwF-L9IrEmLErBzkvfB94UEuqNfcaEAF8hJZw4EDWgqXP98E3rTxj2rJtXmQvdWe9OYsctz60h0'
    })

    async function getAccessToken () {
      try {
        const { token } = await outh2Client.getAccessToken()
        return token
      } catch (error) {
        console.error('Error al obtener el token de acceso:', error.message)
        throw error
      }
    }
    const accessToken = await getAccessToken()
    console.log(accessToken)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'safesync159@gmail.com',
        pass: 'kmilogamer28',
        type: 'OAuth2',
        clientId: '178047990490-l1va0ik1hsq65006i4iqi5cj3pd9qn2r.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04BRycP5uAvJJCgYIARAAGAQSNwF-L9IrEmLErBzkvfB94UEuqNfcaEAF8hJZw4EDWgqXP98E3rTxj2rJtXmQvdWe9OYsctz60h0',
        accessToken: 'ya29.a0AfB_byBEa6ioEME8-y5RwLALiuvNVEqLw-1ZD0yTJELAbCZtFSr25OBuz1U8VvffQM2U1If9zco8IJ4Y-msvAXWzLjSw7j-vFBJ1jRm3KaqMsYgwcisthPCRAeO-mOtsyuSvZH0NAgSABIEprM_qYfHlVld_v9cPuUq6aCgYKARESARESFQGOcNnC0PAktg5LgkZ-h9yX9LxJgw0171'
      }
    })

    const mailOptions = {
      from: Email,
      to: 'safesync159@gmail.com',
      subject,
      text: content
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        res.status(200).json({ msg: 'Email send' })
        console.log('data')
      }
    })
  } catch (error) {
    httpError(req, res)
  }
}
