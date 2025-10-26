'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { supabase } from '../../lib/supabase'
import type { Contact } from '../../lib/supabase'

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [serviceFilter, setServiceFilter] = useState<string>('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      
      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status: newStatus as any } : contact
      ))
    } catch (err: any) {
      alert('Error updating status: ' + err.message)
    }
  }

  const deleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      // Update local state
      setContacts(contacts.filter(contact => contact.id !== id))
    } catch (err: any) {
      alert('Error deleting contact: ' + err.message)
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const statusMatch = statusFilter === 'all' || contact.status === statusFilter
    const serviceMatch = serviceFilter === 'all' || contact.service_interest === serviceFilter
    return statusMatch && serviceMatch
  })

  const getUniqueServices = () => {
    const services = contacts.map(c => c.service_interest).filter(Boolean)
    return Array.from(new Set(services))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#10b981'
      case 'contacted': return '#f59e0b'
      case 'closed': return '#6b7280'
      default: return '#6b7280'
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="admin-loading">
          <h1>Loading contacts...</h1>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="admin-error">
          <h1>Error loading contacts</h1>
          <p>{error}</p>
          <button onClick={fetchContacts}>Retry</button>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Admin - Contacts</title>
      </Head>
      <Layout>
        <div className="admin-contacts">
          <div className="admin-header">
            <h1>Contact Submissions</h1>
            <div className="admin-stats">
              <div className="stat">
                <span className="stat-number">{contacts.length}</span>
                <span className="stat-label">Total Contacts</span>
              </div>
              <div className="stat">
                <span className="stat-number">{contacts.filter(c => c.status === 'new').length}</span>
                <span className="stat-label">New</span>
              </div>
              <div className="stat">
                <span className="stat-number">{contacts.filter(c => c.status === 'contacted').length}</span>
                <span className="stat-label">Contacted</span>
              </div>
              <div className="stat">
                <span className="stat-number">{contacts.filter(c => c.status === 'closed').length}</span>
                <span className="stat-label">Closed</span>
              </div>
            </div>
          </div>

          <div className="admin-filters">
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Service:</label>
              <select 
                value={serviceFilter} 
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <option value="all">All Services</option>
                {getUniqueServices().map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <button onClick={fetchContacts} className="refresh-btn">
              Refresh
            </button>
          </div>

          <div className="contacts-grid">
            {filteredContacts.length === 0 ? (
              <div className="no-contacts">
                <h3>No contacts found</h3>
                <p>No contacts match your current filters.</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <div className="contact-info">
                      <h3>{contact.name}</h3>
                      <p className="contact-email">{contact.email}</p>
                      {contact.phone && <p className="contact-phone">{contact.phone}</p>}
                    </div>
                    <div className="contact-meta">
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(contact.status) }}
                      >
                        {contact.status}
                      </span>
                      <span className="contact-date">
                        {formatDate(contact.created_at)}
                      </span>
                    </div>
                  </div>

                  {contact.service_interest && (
                    <div className="service-interest">
                      <strong>Service Interest:</strong> {contact.service_interest}
                    </div>
                  )}

                  <div className="contact-message">
                    <strong>Message:</strong>
                    <p>{contact.message}</p>
                  </div>

                  <div className="contact-actions">
                    <select
                      value={contact.status}
                      onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>

                    <a 
                      href={`mailto:${contact.email}?subject=Re: Your inquiry&body=Hi ${contact.name},%0A%0AThank you for your message:%0A"${contact.message}"%0A%0A`}
                      className="email-btn"
                    >
                      Reply
                    </a>

                    {contact.phone && (
                      <a 
                        href={`tel:${contact.phone}`}
                        className="call-btn"
                      >
                        Call
                      </a>
                    )}

                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}
