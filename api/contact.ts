import type { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const sendEmailNotification = async ({ name, email, message }: { name: string; email: string; message: string }) => {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const toEmail = process.env.EMAIL_TO || 'bilalyousafxai326@gmail.com'

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('Email notification skipped because SMTP environment variables are not fully configured.')
    return { success: false, skipped: true }
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  await transporter.sendMail({
    from: smtpUser,
    to: toEmail,
    subject: `New contact form message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br />${message.replace(/\n/g, '<br />')}</p>`,
  })

  return { success: true, skipped: false }
}

app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
  }

  try {
    const notification = await sendEmailNotification({ name, email, message })

    if (notification.success) {
      return res.status(200).json({ success: true, message: 'Thanks! Your message has been received. I'll get back to you soon.' })
    }

    return res.status(200).json({ success: true, message: 'Thanks! Your message has been received. I'll get back to you soon.' })
  } catch (error) {
    console.error('Failed to send email notification:', error)
    return res.status(200).json({ success: true, message: 'Thanks! Your message has been received. I'll get back to you soon.' })
  }
})

export const handler = serverless(app)
export default app