import React, { useState } from 'react'
import Modal from '../ui/Modal'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  guardianFirstName: string
  guardianLastName: string
  phone: string
  email: string
  studentFirstName: string
  studentLastName: string
  school: string
  gradeLevel: string
  additionalComments: string
  website: string // honeypot field
}

interface FormErrors {
  [key: string]: string
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    guardianFirstName: '',
    guardianLastName: '',
    phone: '',
    email: '',
    studentFirstName: '',
    studentLastName: '',
    school: '',
    gradeLevel: '',
    additionalComments: '',
    website: '' // honeypot
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const gradeOptions = [
    { value: '', label: 'Select Grade Level' },
    { value: 'year-1', label: 'Year 1' },
    { value: 'year-2', label: 'Year 2' },
    { value: 'year-3', label: 'Year 3' },
    { value: 'year-4', label: 'Year 4' },
    { value: 'year-5', label: 'Year 5' },
    { value: 'year-6', label: 'Year 6' },
    { value: 'year-7', label: 'Year 7' },
    { value: 'year-8', label: 'Year 8' },
    { value: 'year-9', label: 'Year 9' },
    { value: 'year-10', label: 'Year 10' },
    { value: 'year-11', label: 'Year 11' },
    { value: 'year-12', label: 'Year 12' },
    { value: 'tertiary', label: 'Tertiary' },
    { value: 'other', label: 'Other' }
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required fields
    if (!formData.guardianFirstName.trim()) {
      newErrors.guardianFirstName = 'Guardian first name is required'
    }
    if (!formData.guardianLastName.trim()) {
      newErrors.guardianLastName = 'Guardian last name is required'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^(\+61|0)[2-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Australian phone number'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Honeypot check
    if (formData.website) {
      newErrors.website = 'Bot detected'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Primary submission to /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guardianName: `${formData.guardianFirstName} ${formData.guardianLastName}`,
          phone: formData.phone,
          email: formData.email,
          studentName: formData.studentFirstName && formData.studentLastName 
            ? `${formData.studentFirstName} ${formData.studentLastName}` 
            : formData.studentFirstName || formData.studentLastName || '',
          school: formData.school,
          gradeLevel: formData.gradeLevel,
          message: formData.additionalComments,
          source: 'Contact Modal'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          guardianFirstName: '',
          guardianLastName: '',
          phone: '',
          email: '',
          studentFirstName: '',
          studentLastName: '',
          school: '',
          gradeLevel: '',
          additionalComments: '',
          website: ''
        })
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        throw new Error('Primary submission failed')
      }
    } catch (error: any) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setSubmitStatus('idle')
      setErrors({})
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    fontFamily: 'inherit'
  }

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ef4444'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  }

  const errorStyle = {
    marginTop: '4px',
    fontSize: '14px',
    color: '#ef4444'
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Contact Us" size="lg">
      <div style={{ padding: '24px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr', 
          gap: '32px' 
        }}>
          {/* Centre Info - Left Column */}
          <div>
            <div style={{ 
              background: '#f9fafb', 
              borderRadius: '8px', 
              padding: '24px' 
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#111827', 
                marginBottom: '16px' 
              }}>
                Mathsmastery Institute
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg style={{ width: '20px', height: '20px', color: '#2563eb', marginRight: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href="tel:+61426913932" 
                    style={{ 
                      color: '#2563eb', 
                      fontWeight: '500',
                      textDecoration: 'none'
                    }}
                  >
                    0426 913 932
                  </a>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg style={{ width: '20px', height: '20px', color: '#2563eb', marginRight: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ color: '#4b5563' }}>Sydney, NSW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div>
            {submitStatus === 'success' && (
              <div style={{ 
                marginBottom: '24px', 
                padding: '16px', 
                background: '#f0fdf4', 
                border: '1px solid #bbf7d0', 
                borderRadius: '8px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg style={{ width: '20px', height: '20px', color: '#16a34a', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p style={{ color: '#166534', fontWeight: '500' }}>
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{ 
                marginBottom: '24px', 
                padding: '16px', 
                background: '#fef2f2', 
                border: '1px solid #fecaca', 
                borderRadius: '8px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg style={{ width: '20px', height: '20px', color: '#dc2626', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p style={{ color: '#991b1b', fontWeight: '500' }}>
                    Sorry, there was an error sending your message. Please try again or call us directly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Guardian Information */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label htmlFor="guardianFirstName" style={labelStyle}>
                    Guardian First Name *
                  </label>
                  <input
                    type="text"
                    id="guardianFirstName"
                    name="guardianFirstName"
                    value={formData.guardianFirstName}
                    onChange={handleInputChange}
                    style={errors.guardianFirstName ? errorInputStyle : inputStyle}
                    disabled={isSubmitting}
                  />
                  {errors.guardianFirstName && (
                    <p style={errorStyle}>{errors.guardianFirstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="guardianLastName" style={labelStyle}>
                    Guardian Last Name *
                  </label>
                  <input
                    type="text"
                    id="guardianLastName"
                    name="guardianLastName"
                    value={formData.guardianLastName}
                    onChange={handleInputChange}
                    style={errors.guardianLastName ? errorInputStyle : inputStyle}
                    disabled={isSubmitting}
                  />
                  {errors.guardianLastName && (
                    <p style={errorStyle}>{errors.guardianLastName}</p>
                  )}
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label htmlFor="phone" style={labelStyle}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0426 913 932"
                    style={errors.phone ? errorInputStyle : inputStyle}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p style={errorStyle}>{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={errors.email ? errorInputStyle : inputStyle}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p style={errorStyle}>{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Student Information */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label htmlFor="studentFirstName" style={labelStyle}>
                    Student First Name
                  </label>
                  <input
                    type="text"
                    id="studentFirstName"
                    name="studentFirstName"
                    value={formData.studentFirstName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="studentLastName" style={labelStyle}>
                    Student Last Name
                  </label>
                  <input
                    type="text"
                    id="studentLastName"
                    name="studentLastName"
                    value={formData.studentLastName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div>
                  <label htmlFor="school" style={labelStyle}>
                    School
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    style={inputStyle}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="gradeLevel" style={labelStyle}>
                    Grade Level
                  </label>
                  <select
                    id="gradeLevel"
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleInputChange}
                    style={inputStyle}
                    disabled={isSubmitting}
                  >
                    {gradeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Comments */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="additionalComments" style={labelStyle}>
                  Additional Comments
                </label>
                <textarea
                  id="additionalComments"
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleInputChange}
                  rows={4}
                  style={inputStyle}
                  placeholder="Tell us about your child's needs, goals, or any specific requirements..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Honeypot field - hidden */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Consent Notice */}
              <div style={{ 
                background: '#f9fafb', 
                padding: '16px', 
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                  By clicking "Submit," you agree to receive recurring advertising emails, text messages and calls from 
                  Mathsmastery and its independently owned learning centres about our offerings to the phone 
                  number/email provided above, including calls and texts placed using an automatic telephone dialing 
                  system. Consent to receive advertising text messages and calls is not required to purchase goods or 
                  services. Message frequency varies. Message and data rates may apply. Reply STOP to no longer receive 
                  messages. Email{' '}
                  <a href="mailto:info@mathsmastery.com" style={{ color: '#2563eb' }}>
                    info@mathsmastery.com
                  </a>{' '}
                  for assistance. By clicking "Submit," you also consent to Mathsmastery's Terms and Conditions of Use and Privacy Policy.
                </p>
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  style={{
                    padding: '16px 32px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: 'white',
                    background: isSubmitting || submitStatus === 'success' 
                      ? '#9ca3af' 
                      : 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                    border: 'none',
                    cursor: isSubmitting || submitStatus === 'success' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid currentColor',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Submitting...
                    </div>
                  ) : submitStatus === 'success' ? (
                    'Sent Successfully!'
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ContactModal