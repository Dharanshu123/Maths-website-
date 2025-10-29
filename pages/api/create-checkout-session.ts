import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

// Initialize Stripe with proper error handling
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { planName, planPrice, planFeatures } = req.body

    // Validate required fields
    if (!planName || !planPrice || !planFeatures) {
      return res.status(400).json({ 
        error: 'Missing required fields: planName, planPrice, and planFeatures are required' 
      })
    }

    console.log('Creating checkout session for:', { planName, planPrice, planFeatures })

    // Get base URL from environment or request headers
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName,
              description: `${planName} - ${planFeatures.slice(0, 3).join(', ')}${planFeatures.length > 3 ? ' and more...' : ''}`,
            },
            unit_amount: Math.round(planPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?status=cancelled`,
      metadata: {
        plan_name: planName,
        plan_price: planPrice.toString(),
        plan_features: planFeatures.join(', '),
      },
      billing_address_collection: 'auto',
      phone_number_collection: {
        enabled: true,
      },
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: false,
      },
    })

    console.log('Checkout session created successfully:', session.id)
    
    if (!session.url) {
      throw new Error('Failed to create checkout session URL')
    }

    res.status(200).json({ 
      url: session.url,
      sessionId: session.id 
    })

  } catch (err: any) {
    console.error('Stripe checkout session creation error:', err)
    
    // Return appropriate error message
    const errorMessage = err.type === 'StripeCardError' 
      ? 'Payment processing error. Please check your payment details.'
      : err.message || 'An unexpected error occurred. Please try again.'
    
    res.status(err.statusCode || 500).json({ 
      error: errorMessage,
      type: err.type || 'api_error'
    })
  }
}