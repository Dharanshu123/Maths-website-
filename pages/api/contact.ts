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

    let emailSent = false
    let emailError = null

    // Try sending email via Nodemailer (Gmail) first
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && 
        process.env.GMAIL_USER !== 'your-email@gmail.com' && 
        process.env.GMAIL_APP_PASSWORD !== 'your-gmail-app-password') {
      
      try {
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
        
        emailSent = true
        console.log('Email sent successfully via Nodemailer')
        
      } catch (nodemailerError) {
        console.warn('Nodemailer failed:', nodemailerError)
        emailError = nodemailerError
      }
    } else {
      console.log('Gmail credentials not configured, skipping Nodemailer')
    }

    // If Nodemailer failed or isn't configured, try EmailJS as fallback
    if (!emailSent && process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID && 
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY &&
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID !== 'your_service_id') {
      
      try {
        // Use EmailJS as fallback
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
            template_params: {
              guardian_name: guardianName,
              phone: phone,
              email: email,
              student_name: studentName || 'Not provided',
              school: school || 'Not provided',
              grade_level: gradeLevel || 'Not provided',
              message: message || 'No additional comments',
              source: source || 'Website Contact Form',
              submitted_at: new Date().toLocaleString('en-AU', { 
                timeZone: 'Australia/Sydney' 
              })
            }
          })
        })

        if (emailjsResponse.ok) {
          emailSent = true
          console.log('Email sent successfully via EmailJS')
        } else {
          throw new Error(`EmailJS failed with status: ${emailjsResponse.status}`)
        }
        
      } catch (emailjsError) {
        console.warn('EmailJS also failed:', emailjsError)
        emailError = emailjsError
      }
    } else {
      console.log('EmailJS credentials not configured, skipping EmailJS')
    }

    // Store in Supabase if available
    let dataStored = false
    try {
      const { supabase } = await import('../../lib/supabase')
      
      const result = await supabase
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
      
      if (!result.error) {
        dataStored = true
        console.log('Data stored successfully in Supabase')
      }
    } catch (supabaseError) {
      console.warn('Supabase storage failed (non-critical):', supabaseError)
      // Don't fail the request if Supabase fails
    }

    // Log the submission for manual processing
    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log('Guardian Name:', guardianName)
    console.log('Phone:', phone)
    console.log('Email:', email)
    console.log('Student Name:', studentName || 'Not provided')
    console.log('School:', school || 'Not provided')
    console.log('Grade Level:', gradeLevel || 'Not provided')
    console.log('Message:', message || 'No additional comments')
    console.log('Source:', source || 'Website Contact Form')
    console.log('Submitted at:', new Date().toLocaleString('en-AU', { 
      timeZone: 'Australia/Sydney' 
    }))
    console.log('Email Sent:', emailSent)
    console.log('Data Stored:', dataStored)
    console.log('===============================')

    // Return success if either email was sent OR data was stored OR for development
    if (emailSent || dataStored || process.env.NODE_ENV === 'development') {
      res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully. We will get back to you within 24 hours.',
        emailSent: emailSent,
        dataStored: dataStored,
        note: !emailSent && !dataStored ? 'Submission logged for manual processing' : undefined
      })
    } else {
      // Both email and storage failed in production
      console.error('Both email sending and data storage failed')
      res.status(500).json({ 
        error: 'Unable to process your submission. Please call us directly at 0426 913 932.',
        details: emailError?.message || 'Unknown error'
      })
    }

  } catch (error) {
    console.error('Contact form submission error:', error)
    res.status(500).json({ 
      error: 'Failed to submit contact form. Please try again or call us directly.' 
    })
  }
}
