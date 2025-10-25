// EmailJS Setup for Contact Form Notifications
// This is the easiest way to receive emails from your contact form

// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Set up an email service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your service ID, template ID, and public key

import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: 'your_service_id', // Replace with your EmailJS service ID
  templateId: 'your_template_id', // Replace with your EmailJS template ID
  publicKey: 'your_public_key' // Replace with your EmailJS public key
}

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey)
}

// Send email notification
export const sendContactEmail = async (formData: {
  name: string
  email: string
  phone: string
  message: string
}) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: 'your-email@example.com', // Replace with your email
      reply_to: formData.email
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )

    console.log('Email sent successfully:', response)
    return { success: true, response }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

// Email template for EmailJS:
/*
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}

You can reply directly to this email to respond to {{from_name}}.

Best regards,
Your Website Contact Form
*/


