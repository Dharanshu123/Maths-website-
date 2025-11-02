import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import ContactModal from './contact/ContactModal'
import { ContactModalProvider, useContactModal } from '../contexts/ContactModalContext'

interface LayoutProps {
  children: ReactNode
  className?: string
}

const LayoutContent = ({ children, className = '' }: LayoutProps) => {
  const { isContactModalOpen, closeContactModal } = useContactModal()

  return (
    <div className={`wrapper ${className}`}>
      <Header />
      <main className="page">
        {children}
      </main>
      <Footer />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={closeContactModal} 
      />
    </div>
  )
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <ContactModalProvider>
      <LayoutContent className={className}>
        {children}
      </LayoutContent>
    </ContactModalProvider>
  )
}

export default Layout
