'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import emailjs from '@emailjs/browser'

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_hux76ml', // Your EmailJS service ID
  templateId: 'template_i6hqg3r', // Your EmailJS template ID
  publicKey: 'oqEfxxvo9mazUlyKE' // Your EmailJS public key
}

// Email notification function using EmailJS
const sendEmailNotification = async (formData: FormData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: 'mathstutoring412@gmail.com', // Update this with your real email address
      reply_to: formData.email,
      submitted_at: new Date().toLocaleString()
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('Email sent successfully:', response)
    return { success: true }
  } catch (error) {
    console.error('EmailJS error:', error)
    // Don't throw error - we don't want to break the form submission
    return { success: false, error }
  }
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: 'new'
        }])

      if (error) throw error

      // Send email notification
      const emailResult = await sendEmailNotification(formData)
      
      if (emailResult.success) {
        console.log('✅ Email notification sent successfully!')
      } else {
        console.log('⚠️ Email notification failed, but form was saved to database')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      setError(err.message || 'Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form">
        <h2>Get In Touch</h2>
        <p>Send us a message and we'll get back to you soon!</p>

        {success && (
          <div className="contact-success">
            ✅ Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="input-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="input-group full-width">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell us about your project or inquiry..."
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
