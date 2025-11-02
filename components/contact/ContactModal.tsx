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
    } catch (error) {
      console.error('Contact form submission error:', error)
      
      // EmailJS fallback (if configured)
      try {
        if (typeof window !== 'undefined' && (window as any).emailjs) {
          await (window as any).emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
              guardian_name: `${formData.guardianFirstName} ${formData.guardianLastName}`,
              phone: formData.phone,
              email: formData.email,
              student_name: formData.studentFirstName && formData.studentLastName 
                ? `${formData.studentFirstName} ${formData.studentLastName}` 
                : formData.studentFirstName || formData.studentLastName || 'Not provided',
              school: formData.school || 'Not provided',
              grade_level: formData.gradeLevel || 'Not provided',
              message: formData.additionalComments || 'No additional comments',
              source: 'Contact Modal (EmailJS Fallback)'
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
          )
          
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
          throw new Error('EmailJS not available')
        }
      } catch (fallbackError) {
        console.error('EmailJS fallback failed:', fallbackError)
        setSubmitStatus('error')
      }
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Contact Us" size="lg">
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Centre Info - Left Column */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mathsmastery Institute
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href="tel:+61426913932" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    0426 913 932
                  </a>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">Sydney, NSW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="md:col-span-2">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-800 font-medium">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-800 font-medium">
                    Sorry, there was an error sending your message. Please try again or call us directly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guardian Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guardianFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian First Name *
                  </label>
                  <input
                    type="text"
                    id="guardianFirstName"
                    name="guardianFirstName"
                    value={formData.guardianFirstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.guardianFirstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.guardianFirstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.guardianFirstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="guardianLastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Guardian Last Name *
                  </label>
                  <input
                    type="text"
                    id="guardianLastName"
                    name="guardianLastName"
                    value={formData.guardianLastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.guardianLastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.guardianLastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.guardianLastName}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0426 913 932"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Student Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="studentFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Student First Name
                  </label>
                  <input
                    type="text"
                    id="studentFirstName"
                    name="studentFirstName"
                    value={formData.studentFirstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="studentLastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Student Last Name
                  </label>
                  <input
                    type="text"
                    id="studentLastName"
                    name="studentLastName"
                    value={formData.studentLastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Grade Level
                  </label>
                  <select
                    id="gradeLevel"
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <div>
                <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Comments
                </label>
                <textarea
                  id="additionalComments"
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  By clicking "Submit," you agree to receive recurring advertising emails, text messages and calls from 
                  Mathsmastery and its independently owned learning centres about our offerings to the phone 
                  number/email provided above, including calls and texts placed using an automatic telephone dialing 
                  system. Consent to receive advertising text messages and calls is not required to purchase goods or 
                  services. Message frequency varies. Message and data rates may apply. Reply STOP to no longer receive 
                  messages. Email{' '}
                  <a href="mailto:info@mathsmastery.com" className="text-blue-600 hover:text-blue-800">
                    info@mathsmastery.com
                  </a>{' '}
                  for assistance. By clicking "Submit," you also consent to Mathsmastery's Terms and Conditions of Use and Privacy Policy.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                    isSubmitting || submitStatus === 'success'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
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
