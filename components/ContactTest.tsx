'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function ContactTest() {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<string>('')

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setLoading(true)
      setConnectionStatus('Testing Supabase connection...')

      // Test basic connection
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) {
        setConnectionStatus(`❌ Connection Error: ${error.message}`)
        console.error('Supabase Error:', error)
      } else {
        setContacts(data || [])
        setConnectionStatus(`✅ Connected! Found ${data?.length || 0} recent contacts`)
      }
    } catch (err: any) {
      setConnectionStatus(`❌ Connection Failed: ${err.message}`)
      console.error('Connection Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const insertTestContact = async () => {
    try {
      const testData = {
        name: 'Test User ' + Date.now(),
        email: 'test@example.com',
        phone: '+1234567890',
        message: 'This is a test message from the contact form test.',
        status: 'new'
      }

      const { data, error } = await supabase
        .from('contacts')
        .insert([testData])
        .select()

      if (error) {
        alert('Error inserting test contact: ' + error.message)
      } else {
        alert('✅ Test contact inserted successfully!')
        testConnection() // Refresh the list
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div style={{ 
      padding: '2rem', 
      margin: '2rem 0', 
      background: '#f0f9ff', 
      borderRadius: '8px',
      border: '2px solid #0ea5e9'
    }}>
      <h3 style={{ color: '#0369a1', marginBottom: '1rem' }}>🔧 Supabase Connection Test</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Status:</strong> {connectionStatus}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={testConnection}
          style={{
            padding: '0.5rem 1rem',
            background: '#0ea5e9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '1rem',
            cursor: 'pointer'
          }}
        >
          Test Connection
        </button>
        
        <button 
          onClick={insertTestContact}
          style={{
            padding: '0.5rem 1rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Insert Test Contact
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h4 style={{ color: '#0369a1' }}>Recent Contacts ({contacts.length}):</h4>
          {contacts.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No contacts found. Try inserting a test contact or submitting the form above.</p>
          ) : (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {contacts.map((contact, index) => (
                <div 
                  key={contact.id || index}
                  style={{
                    padding: '0.5rem',
                    margin: '0.5rem 0',
                    background: 'white',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}
                >
                  <strong>{contact.name}</strong> ({contact.email})<br />
                  <span style={{ color: '#6b7280' }}>
                    {contact.message?.substring(0, 100)}...
                  </span><br />
                  <small style={{ color: '#9ca3af' }}>
                    Status: {contact.status} | {new Date(contact.created_at).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#fef3c7', 
        borderRadius: '4px',
        fontSize: '0.875rem'
      }}>
        <strong>🔍 Debug Info:</strong><br />
        • Supabase URL: https://dtdpiqqrsvnzswaliavm.supabase.co<br />
        • Anon Key: Set ✅<br />
        • Environment: Client
      </div>
    </div>
  )
}
