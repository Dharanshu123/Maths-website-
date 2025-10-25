import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'
import React from 'react'

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'admin' | 'manager' | 'user'
  is_active: boolean
  created_at: string
  updated_at: string
}

// =============================================
// AUTHENTICATION FUNCTIONS
// =============================================

export const auth = {
  // Sign up new user
  signUp: async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })
    return { data, error }
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out user
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Get current session
  getCurrentSession: async (): Promise<Session | null> => {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  },

  // Update password
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    return { data, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// =============================================
// USER PROFILE FUNCTIONS
// =============================================

export const userProfile = {
  // Get user profile
  getProfile: async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<UserProfile>) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    return { data, error }
  },

  // Check if user is admin
  isAdmin: async (userId: string): Promise<boolean> => {
    const profile = await userProfile.getProfile(userId)
    return profile?.role === 'admin'
  },

  // Check if user is admin or manager
  isAdminOrManager: async (userId: string): Promise<boolean> => {
    const profile = await userProfile.getProfile(userId)
    return profile?.role === 'admin' || profile?.role === 'manager'
  },

  // Create admin user (for initial setup)
  createAdminUser: async (email: string) => {
    const { data, error } = await supabase.rpc('create_admin_user', {
      user_email: email
    })
    return { data, error }
  }
}

// =============================================
// ROLE-BASED ACCESS CONTROL
// =============================================

export const rbac = {
  // Check if user has permission for action
  hasPermission: async (action: string, resource?: string): Promise<boolean> => {
    const user = await auth.getCurrentUser()
    if (!user) return false

    const profile = await userProfile.getProfile(user.id)
    if (!profile) return false

    // Admin has all permissions
    if (profile.role === 'admin') return true

    // Define permissions for each role
    const permissions = {
      manager: [
        'read:contacts',
        'update:contacts',
        'read:appointments',
        'update:appointments',
        'read:analytics',
        'manage:content'
      ],
      user: [
        'read:own_profile',
        'update:own_profile',
        'create:appointments',
        'read:own_appointments'
      ]
    }

    const userPermissions = permissions[profile.role] || []
    return userPermissions.includes(action)
  },

  // Require specific permission (throws error if not authorized)
  requirePermission: async (action: string, resource?: string) => {
    const hasAccess = await rbac.hasPermission(action, resource)
    if (!hasAccess) {
      throw new Error('Insufficient permissions')
    }
  },

  // Check if user can access admin panel
  canAccessAdmin: async (): Promise<boolean> => {
    const user = await auth.getCurrentUser()
    if (!user) return false

    return await userProfile.isAdminOrManager(user.id)
  }
}

// =============================================
// AUTH HOOKS FOR REACT COMPONENTS
// =============================================

export const useAuth = () => {
  // This would be implemented as a React hook
  // For now, providing the structure
  return {
    user: null,
    session: null,
    loading: false,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    resetPassword: auth.resetPassword
  }
}

// =============================================
// PROTECTED ROUTE WRAPPER
// =============================================

export const withAuth = (WrappedComponent: React.ComponentType, requiredRole?: string) => {
  return function AuthenticatedComponent(props: any) {
    // This would check authentication and role
    // Redirect to login if not authenticated
    // Show error if insufficient role
    return <WrappedComponent {...props} />
  }
}

// =============================================
// MIDDLEWARE FOR API ROUTES
// =============================================

export const authMiddleware = {
  // Verify JWT token
  verifyToken: async (token: string) => {
    const { data, error } = await supabase.auth.getUser(token)
    return { user: data.user, error }
  },

  // Require authentication for API route
  requireAuth: (handler: Function) => {
    return async (req: any, res: any) => {
      const token = req.headers.authorization?.replace('Bearer ', '')
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' })
      }

      const { user, error } = await authMiddleware.verifyToken(token)
      
      if (error || !user) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      req.user = user
      return handler(req, res)
    }
  },

  // Require specific role for API route
  requireRole: (role: string, handler: Function) => {
    return authMiddleware.requireAuth(async (req: any, res: any) => {
      const profile = await userProfile.getProfile(req.user.id)
      
      if (!profile || profile.role !== role) {
        return res.status(403).json({ error: 'Insufficient permissions' })
      }

      return handler(req, res)
    })
  }
}
