import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_SECRET_KEY_EXISTS: !!process.env.STRIPE_SECRET_KEY,
      STRIPE_SECRET_KEY_PREFIX: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || 'NOT_SET',
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_EXISTS: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PREFIX: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 7) || 'NOT_SET',
      SUPABASE_URL_EXISTS: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      GMAIL_USER_EXISTS: !!process.env.GMAIL_USER,
      SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET'
    }

    res.status(200).json({
      message: 'Environment check completed',
      environment: envCheck,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Environment check error:', error)
    res.status(500).json({ 
      error: 'Failed to check environment variables',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
