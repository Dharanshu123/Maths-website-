import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { priceId, planName, planPrice, planFeatures } = req.body
      
      console.log('Creating checkout session for:', { planName, planPrice, planFeatures })

      // Create Checkout Sessions from body params
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: planName,
                description: `${planName} Plan - ${planFeatures.slice(0, 3).join(', ')}${planFeatures.length > 3 ? '...' : ''}`,
              },
              unit_amount: Math.round(planPrice * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        metadata: {
          plan_name: planName,
          plan_price: planPrice.toString(),
        },
        billing_address_collection: 'auto',
        phone_number_collection: {
          enabled: true,
        },
      })

      console.log('Checkout session created:', session.id, session.url)
      res.status(200).json({ url: session.url })
    } catch (err: any) {
      console.error('Stripe error:', err)
      res.status(err.statusCode || 500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}