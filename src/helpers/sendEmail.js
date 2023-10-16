import nodeMailer from 'nodemailer'
import { config } from 'dotenv'
config()
export const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    const emailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject,
      text: message + '\n' + email
    }

    await transporter.sendMail(emailOptions)
    res.status(200).json({ msg: 'Email sent successfully' })
  } catch (error) {
    res.status(500).json({ msg: 'Server Internal error' })
  }
}
