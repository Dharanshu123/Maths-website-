import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { to, subject, message } = req.body

  try {
    // Create transporter with Gmail
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD // Your Gmail app password
      }
    })

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your website contact form.
          </p>
        </div>
      `
    })

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    })
    
  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email notification' 
    })
  }
}
