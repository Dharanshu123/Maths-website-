'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'

// Test component to verify EmailJS setup
export default function EmailJSTest() {
  const [testStatus, setTestStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testEmailJS = async () => {
    setLoading(true)
    setTestStatus('Testing EmailJS...')

    try {
      // Use the same config as your ContactForm
      const response = await emailjs.send(
        'service_hux76ml', // Your service ID
        'template_i6hqg3r', // Your template ID
        {
          from_name: 'EmailJS Test',
          from_email: 'test@example.com',
          phone: '+1-555-TEST',
          message: 'This is a test email from your website contact form setup!',
          to_email: 'mathstutoring412@gmail.com', // Your actual email
          reply_to: 'test@example.com',
          submitted_at: new Date().toLocaleString()
        },
        'oqEfxxvo9mazUlyKE' // Your public key
      )

      setTestStatus(`✅ Success! Email sent. Status: ${response.status}`)
      console.log('EmailJS test successful:', response)
    } catch (error: any) {
      setTestStatus(`❌ Error: ${error.text || error.message}`)
      console.error('EmailJS test failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      margin: '2rem auto', 
      padding: '2rem', 
      maxWidth: '600px', 
      background: '#f0f8ff', 
      borderRadius: '8px',
      border: '2px solid #007bff',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#0056b3', marginBottom: '1rem' }}>📧 EmailJS Test</h3>
      
      <p style={{ marginBottom: '1.5rem', color: '#495057' }}>
        Click the button below to test your EmailJS setup.<br/>
        <small>Make sure you've updated the credentials in this component first!</small>
      </p>

      <button 
        onClick={testEmailJS}
        disabled={loading}
        style={{
          padding: '12px 24px',
          background: loading ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          marginBottom: '1rem'
        }}
      >
        {loading ? 'Sending Test Email...' : 'Send Test Email'}
      </button>

      {testStatus && (
        <div style={{
          padding: '1rem',
          background: testStatus.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${testStatus.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '6px',
          color: testStatus.includes('✅') ? '#155724' : '#721c24'
        }}>
          {testStatus}
        </div>
      )}

      <div style={{ marginTop: '1rem', fontSize: '14px', color: '#6c757d' }}>
        <strong>Before testing:</strong><br/>
        1. Update service ID, template ID, and public key above<br/>
        2. Replace email address with your actual email<br/>
        3. Make sure your EmailJS service is connected
      </div>
    </div>
  )
}
