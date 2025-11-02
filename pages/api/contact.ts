import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      guardianName,
      phone,
      email,
      studentName,
      school,
      gradeLevel,
      message,
      source
    } = req.body

    // Basic validation
    if (!guardianName || !phone || !email) {
      return res.status(400).json({ 
        error: 'Guardian name, phone, and email are required' 
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Phone validation (Australian format)
    const phoneRegex = /^(\+61|0)[2-9]\d{8}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid Australian phone number' })
    }

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Source:</strong> ${source || 'Website Contact Form'}</p>
      <hr>
      
      <h3>Guardian Information:</h3>
      <p><strong>Name:</strong> ${guardianName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      
      <h3>Student Information:</h3>
      <p><strong>Name:</strong> ${studentName || 'Not provided'}</p>
      <p><strong>School:</strong> ${school || 'Not provided'}</p>
      <p><strong>Grade Level:</strong> ${gradeLevel || 'Not provided'}</p>
      
      <h3>Message:</h3>
      <p>${message || 'No additional comments'}</p>
      
      <hr>
      <p><em>Submitted at: ${new Date().toLocaleString('en-AU', { 
        timeZone: 'Australia/Sydney' 
      })}</em></p>
    `

    // Create plain text version
    const textContent = `
New Contact Form Submission
Source: ${source || 'Website Contact Form'}

Guardian Information:
Name: ${guardianName}
Phone: ${phone}
Email: ${email}

Student Information:
Name: ${studentName || 'Not provided'}
School: ${school || 'Not provided'}
Grade Level: ${gradeLevel || 'Not provided'}

Message:
${message || 'No additional comments'}

Submitted at: ${new Date().toLocaleString('en-AU', { 
  timeZone: 'Australia/Sydney' 
})}
    `

    // Configure nodemailer
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email to business
    const businessEmailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to your business email
      subject: `New Contact Form Submission - ${guardianName}`,
      html: emailContent,
      text: textContent,
      replyTo: email,
    }

    // Confirmation email to customer
    const customerEmailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Mathsmastery Institute',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${guardianName},</p>
        
        <p>Thank you for contacting Mathsmastery Institute. We have received your inquiry and will get back to you within 24 hours.</p>
        
        <h3>Your submission details:</h3>
        <p><strong>Guardian:</strong> ${guardianName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${studentName ? `<p><strong>Student:</strong> ${studentName}</p>` : ''}
        ${school ? `<p><strong>School:</strong> ${school}</p>` : ''}
        ${gradeLevel ? `<p><strong>Grade Level:</strong> ${gradeLevel}</p>` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        
        <p>In the meantime, feel free to call us directly at <strong>0426 913 932</strong> if you have any urgent questions.</p>
        
        <p>Best regards,<br>
        The Mathsmastery Institute Team</p>
        
        <hr>
        <p><small>This is an automated confirmation email. Please do not reply to this email.</small></p>
      `,
      text: `
Thank you for your inquiry!

Dear ${guardianName},

Thank you for contacting Mathsmastery Institute. We have received your inquiry and will get back to you within 24 hours.

Your submission details:
Guardian: ${guardianName}
Phone: ${phone}
Email: ${email}
${studentName ? `Student: ${studentName}` : ''}
${school ? `School: ${school}` : ''}
${gradeLevel ? `Grade Level: ${gradeLevel}` : ''}
${message ? `Message: ${message}` : ''}

In the meantime, feel free to call us directly at 0426 913 932 if you have any urgent questions.

Best regards,
The Mathsmastery Institute Team

This is an automated confirmation email. Please do not reply to this email.
      `
    }

    // Send emails
    await Promise.all([
      transporter.sendMail(businessEmailOptions),
      transporter.sendMail(customerEmailOptions)
    ])

    // Store in Supabase if available
    try {
      const { supabase } = await import('../../lib/supabase')
      
      await supabase
        .from('contacts')
        .insert([
          {
            guardian_name: guardianName,
            phone: phone,
            email: email,
            student_name: studentName || null,
            school: school || null,
            grade_level: gradeLevel || null,
            message: message || null,
            source: source || 'Website Contact Form',
            submitted_at: new Date().toISOString()
          }
        ])
    } catch (supabaseError) {
      console.warn('Supabase storage failed (non-critical):', supabaseError)
      // Don't fail the request if Supabase fails
    }

    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    res.status(500).json({ 
      error: 'Failed to submit contact form. Please try again or call us directly.' 
    })
  }
}
