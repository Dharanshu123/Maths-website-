import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase, Service } from '../lib/supabase'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>SERVICES</title>
      </Head>
      <Layout>
        <section className="page__main main main_services main_pages">
          <div className="main__container main__container_pages">
            <h1 className="main__title">Services</h1>
            <div className="main__text main__text_pages">
              Subheading: Craft a compelling subheading that sparks curiosity.
            </div>
          </div>
        </section>
        <section className="page__services services-page">
          <div className="services-page__container">
            {loading && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>Loading services...</h2>
              </div>
            )}
            
            {error && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                <h2>Error loading services: {error}</h2>
              </div>
            )}
            
            {!loading && !error && services.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>No services available</h2>
              </div>
            )}
            
            {services.map((service, index) => (
              <div key={service.id} className="services-page__item">
                <div className="services-page__column" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                  <div className="services-page__content">
                    <h2 className="services-page__title title">{service.title}</h2>
                    <div className="services-page__text">
                      <p>{service.description}</p>
                      {service.features && service.features.length > 0 && (
                        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                          {service.features.map((feature, idx) => (
                            <li key={idx} style={{ marginBottom: '0.5rem' }}>{feature}</li>
                          ))}
                        </ul>
                      )}
                      {service.price && (
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem' }}>
                          Starting at ${service.price}/{service.price_type}
                        </p>
                      )}
                    </div>
                    <Link href="/pricing" className="services-page__button button">Get Started</Link>
                  </div>
                  <div className="services-page__img">
                    <Image 
                      src={service.image_url || "/images/pexels-elena-kravets-1601294419-33776534.jpg"}
                      alt={service.title}
                      width={552}
                      height={614}
                      style={{ objectFit: 'cover', borderRadius: '16px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="page__outro outro outro_services">
          <div className="outro__container">
            <h2 className="outro__title title">Talk To Us Heading</h2>
            <div className="outro__text">
              You can compose a friendly and informative paragraph that encourages visitors to engage with your
              business.
            </div>
            <Link href="#" className="outro__button button">CTA Button</Link>
          </div>
        </section>
      </Layout>
    </>
  )
}
