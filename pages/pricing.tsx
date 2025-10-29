import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { supabase, PricingPlan } from '../lib/supabase'

export default function Pricing() {
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  // Professional pricing plans with systematic structure
  const pricingPlans = [
    {
      id: 1,
      name: "Basic Tutoring",
      price: 45,
      period: "session",
      description: "Perfect for students needing occasional help with homework and basic concepts",
      features: [
        "1-on-1 Online Sessions",
        "Homework Support", 
        "Basic Progress Tracking",
        "Email Support",
        "Flexible Scheduling",
        "Session Recording Available"
      ],
      buttonText: "Get Started",
      isPopular: false,
      color: "#4a5568"
    },
    {
      id: 2,
      name: "Premium Tutoring",
      price: 65,
      period: "session", 
      description: "Ideal for students who need regular support and advanced learning strategies",
      features: [
        "1-on-1 Online Sessions",
        "Customized Learning Plans",
        "Progress Reports",
        "Exam Preparation",
        "Priority Scheduling",
        "Parent Updates",
        "Study Materials Included",
        "24/7 Chat Support"
      ],
      buttonText: "Choose Premium",
      isPopular: true,
      color: "#3182ce"
    },
    {
      id: 3,
      name: "Intensive Package",
      price: 299,
      period: "month",
      description: "Complete solution for students preparing for major exams with comprehensive support",
      features: [
        "8 Sessions Per Month",
        "Dedicated Tutor Assignment",
        "Comprehensive Exam Prep",
        "Mock Tests & Analysis",
        "Study Schedule Planning",
        "Parent-Teacher Meetings",
        "Priority Support",
        "Performance Analytics",
        "Resource Library Access"
      ],
      buttonText: "Contact Us",
      isPopular: false,
      color: "#2d3748"
    }
  ]

  // Check for payment status on page load
  useEffect(() => {
    const { status } = router.query
    if (status === 'cancelled') {
      // Show a subtle notification that payment was cancelled
      console.log('Payment was cancelled by user')
    }
  }, [router.query])

  const handlePayment = async (plan: any) => {
    if (loadingPlan) return // Prevent multiple clicks
    
    setLoadingPlan(plan.id.toString())
    
    try {
      console.log('Initiating payment for plan:', plan.name)
      
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

      const data = await response.json()

      if (response.ok && data.url) {
        console.log('Redirecting to Stripe Checkout:', data.url)
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        console.error('Checkout session creation failed:', data)
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error: any) {
      console.error('Payment error:', error)
      setLoadingPlan(null)
      
      // Show user-friendly error message
      const errorMessage = error.message || 'Unable to process payment. Please try again.'
      
      // Create a simple error notification instead of alert
      const errorDiv = document.createElement('div')
      errorDiv.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          max-width: 300px;
        ">
          <strong>Payment Error:</strong><br>
          ${errorMessage}
        </div>
      `
      document.body.appendChild(errorDiv)
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        document.body.removeChild(errorDiv)
      }, 5000)
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
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="pricing__column">
                  <div className={`pricing__item item-pricing ${plan.isPopular ? 'popular' : ''}`} style={{ position: 'relative' }}>
                    {plan.isPopular && (
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
                          /{plan.period}
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
                      disabled={loadingPlan === plan.id.toString()}
                      className="item-pricing__button"
                      style={{ 
                        background: plan.isPopular ? '#007bff' : undefined,
                        border: plan.isPopular ? '2px solid #007bff' : undefined,
                        cursor: loadingPlan === plan.id.toString() ? 'not-allowed' : 'pointer',
                        width: '100%',
                        textAlign: 'center',
                        opacity: loadingPlan === plan.id.toString() ? 0.7 : 1,
                        position: 'relative'
                      }}
                    >
                      {loadingPlan === plan.id.toString() ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <span style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid transparent',
                            borderTop: '2px solid currentColor',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></span>
                          Processing...
                        </span>
                      ) : (
                        plan.buttonText
                      )}
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
