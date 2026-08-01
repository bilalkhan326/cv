import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

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

const readBody = (body: unknown) => {
  if (!body) {
    return {}
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as { name?: string; email?: string; message?: string }
    } catch {
      return {}
    }
  }

  return body as { name?: string; email?: string; message?: string }
}

export default async function handler(req: { method?: string; body?: unknown }, res: { status: (code: number) => { json: (value: unknown) => void } }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' })
  }

  const { name, email, message } = readBody(req.body)

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
  }

  try {
    const notification = await sendEmailNotification({ name, email, message })

    if (notification.success) {
      return res.status(200).json({ success: true, message: "Thanks! Your message has been received. I'll get back to you soon." })
    }

    return res.status(200).json({ success: true, message: "Thanks! Your message has been received. I'll get back to you soon." })
  } catch (error) {
    console.error('Failed to send email notification:', error)
    return res.status(200).json({ success: true, message: "Thanks! Your message has been received. I'll get back to you soon." })
  }
}