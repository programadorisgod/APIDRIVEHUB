import nodeMailer from "nodemailer";
import { settings } from "../config/env/varaibles.js";

export const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: settings.PRIVATE_EMAIL,
        pass: settings.PRIVATE_PASSWORD,
      },
    });

    const emailOptions = {
      from: email,
      to: settings.PRIVATE_EMAIL,
      subject,
      text: message + "\n" + email,
    };

    await transporter.sendMail(emailOptions);
    res.status(200).json({ msg: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Internal error" });
  }
};
