import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dtdpiqqrsvnzswaliavm.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZHBpcXFyc3ZuenN3YWxpYXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MTgxOTQsImV4cCI6MjA2MTk5NDE5NH0.6w7i5cKFGHfzXjgRwPPOwMZ5AvgHsDlQNsKWG5P0aPQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your database
export interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  service_interest?: string
  status: 'new' | 'contacted' | 'closed'
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  description?: string
  short_description?: string
  price?: number
  price_type: string
  features: string[]
  image_url?: string
  icon?: string
  is_featured: boolean
  is_published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  name: string
  company?: string
  position?: string
  message: string
  rating: number
  image_url?: string
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: number
  question: string
  answer: string
  category?: string
  is_published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface PricingPlan {
  id: number
  name: string
  description?: string
  price: number
  price_period: string
  features: string[]
  is_popular: boolean
  is_published: boolean
  order_index: number
  button_text: string
  button_url?: string
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: number
  name: string
  position?: string
  bio?: string
  image_url?: string
  email?: string
  linkedin_url?: string
  twitter_url?: string
  is_published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: number
  setting_key: string
  setting_value?: string
  setting_type: string
  description?: string
  created_at: string
  updated_at: string
}
