import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase, PricingPlan } from '../lib/supabase'

export default function Pricing() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPricingPlans()
  }, [])

  const fetchPricingPlans = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      setPricingPlans(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (plan: PricingPlan) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: plan.name,
          planPrice: plan.price,
          planFeatures: plan.features,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        const error = await response.json()
        alert('Error: ' + error.error)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <>
      <Head>
        <title>PRICING</title>
      </Head>
      <Layout>
        <section className="page__main main main_pricing main_pages">
          <div className="main__container main__container_pages">
            <h1 className="main__title">Pricing</h1>
            <div className="main__text main__text_pages">
              Choose the perfect plan that fits your needs and budget.
            </div>
          </div>
        </section>
        <section className="page__pricing pricing">
          <div className="pricing__container">
            <h3 className="pricing__caption">Our Plans</h3>
            <h2 className="pricing__title">Simple, Transparent Pricing</h2>
            <div className="pricing__text">
              Select the plan that works best for you and your business goals.
            </div>
            <div className="pricing__row">
              {loading && (
                <div style={{ textAlign: 'center', padding: '2rem', width: '100%' }}>
                  <h2>Loading pricing plans...</h2>
                </div>
              )}
              
              {error && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'red', width: '100%' }}>
                  <h2>Error loading pricing: {error}</h2>
                </div>
              )}
              
              {!loading && !error && pricingPlans.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', width: '100%' }}>
                  <h2>No pricing plans available</h2>
                </div>
              )}
              
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="pricing__column">
                  <div className={`pricing__item item-pricing ${plan.is_popular ? 'popular' : ''}`} style={{ position: 'relative' }}>
                    {plan.is_popular && (
                      <div style={{ 
                        position: 'absolute', 
                        top: '-10px', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        background: '#007bff',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        MOST POPULAR
                      </div>
                    )}
                    <div className="item-pricing__info">
                      <div className="item-pricing__label">{plan.name}</div>
                      <div className="item-pricing__cost">
                        ${plan.price}
                        <span style={{ fontSize: '0.5em', fontWeight: 'normal' }}>
                          /{plan.price_period}
                        </span>
                      </div>
                      {plan.description && (
                        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                          {plan.description}
                        </div>
                      )}
                    </div>
                    <ul className="item-pricing__list">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="item-pricing__item">{feature}</li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => handlePayment(plan)}
                      className="item-pricing__button"
                      style={{ 
                        background: plan.is_popular ? '#007bff' : undefined,
                        border: plan.is_popular ? '2px solid #007bff' : undefined,
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'center'
                      }}
                    >
                      {plan.button_text}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="page__outro outro outro_pricing">
          <div className="outro__container">
            <h2 className="outro__title title">Ready to Get Started?</h2>
            <div className="outro__text">
              Contact us today to discuss your project and find the perfect plan for your business needs.
            </div>
            <Link href="/contact" className="outro__button button">Contact Us</Link>
          </div>
        </section>
      </Layout>
    </>
  )
}
