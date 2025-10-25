import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

export default function Success() {
  const router = useRouter()
  const { session_id } = router.query
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session_id) {
      // Fetch session details (optional)
      fetchSessionData(session_id as string)
    }
  }, [session_id])

  const fetchSessionData = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/checkout-session?session_id=${sessionId}`)
      const data = await response.json()
      setSessionData(data)
    } catch (error) {
      console.error('Error fetching session:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Payment Successful - Mathsmastery Institute</title>
      </Head>
      <Layout>
        <section className="page__main main main_services main_pages">
          <div className="main__container main__container_pages">
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ 
                fontSize: '4rem', 
                color: '#10b981', 
                marginBottom: '1rem' 
              }}>
                ✅
              </div>
              
              <h1 className="main__title" style={{ color: '#10b981' }}>
                Payment Successful!
              </h1>
              
              <div className="main__text main__text_pages" style={{ marginBottom: '2rem' }}>
                Thank you for choosing Mathsmastery Institute. Your payment has been processed successfully.
              </div>

              {loading ? (
                <p>Loading payment details...</p>
              ) : (
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '2rem', 
                  borderRadius: '8px', 
                  marginBottom: '2rem',
                  maxWidth: '600px',
                  margin: '0 auto 2rem'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#333' }}>What's Next?</h3>
                  <div style={{ textAlign: 'left', color: '#666' }}>
                    <p>📧 <strong>Confirmation Email:</strong> You'll receive a confirmation email with your payment receipt shortly.</p>
                    <p>📞 <strong>Contact from Our Team:</strong> One of our tutoring coordinators will contact you within 24 hours to schedule your first session.</p>
                    <p>📚 <strong>Preparation:</strong> We'll discuss your learning goals and customize a plan just for you.</p>
                    <p>🎯 <strong>Get Started:</strong> Your mathematical journey to excellence begins now!</p>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link 
                  href="/contact" 
                  className="button"
                  style={{ 
                    background: '#007bff',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none'
                  }}
                >
                  Contact Us
                </Link>
                
                <Link 
                  href="/" 
                  className="button"
                  style={{ 
                    background: '#6c757d',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none'
                  }}
                >
                  Back to Home
                </Link>
              </div>

              <div style={{ 
                marginTop: '3rem', 
                padding: '1.5rem', 
                background: '#e7f3ff', 
                borderRadius: '8px',
                border: '1px solid #b3d9ff'
              }}>
                <h4 style={{ color: '#0056b3', marginBottom: '0.5rem' }}>Need Help?</h4>
                <p style={{ color: '#0056b3', margin: 0 }}>
                  If you have any questions about your purchase or need assistance, 
                  please contact us at <strong>mathstutoring412@gmail.com</strong> or call us at <strong>(412) 555-0123</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}


