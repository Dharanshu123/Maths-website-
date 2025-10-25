import { loadStripe } from '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default stripePromise

// Stripe configuration
export const STRIPE_CONFIG = {
  // Test mode prices (replace with your actual Stripe price IDs)
  PRICES: {
    basic: 'price_1234567890', // Replace with your actual price ID
    premium: 'price_0987654321', // Replace with your actual price ID
    enterprise: 'price_1122334455' // Replace with your actual price ID
  }
}

// Price mapping for your plans
export const PRICING_PLANS = {
  1: { // Basic Tutoring
    stripePrice: 'price_basic_tutoring',
    name: 'Basic Tutoring',
    amount: 4500, // $45.00 in cents
  },
  2: { // Premium Tutoring  
    stripePrice: 'price_premium_tutoring',
    name: 'Premium Tutoring',
    amount: 6500, // $65.00 in cents
  },
  3: { // Test Prep Package
    stripePrice: 'price_test_prep',
    name: 'Test Prep Package', 
    amount: 7500, // $75.00 in cents
  }
}


