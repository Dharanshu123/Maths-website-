import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { session_id } = req.query

      if (!session_id || typeof session_id !== 'string') {
        return res.status(400).json({ error: 'Session ID is required' })
      }

      // Retrieve the session
      const session = await stripe.checkout.sessions.retrieve(session_id)

      res.status(200).json({
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        customer_name: session.customer_details?.name,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
        created: session.created,
      })
    } catch (err: any) {
      console.error('Stripe session retrieval error:', err)
      res.status(err.statusCode || 500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}


