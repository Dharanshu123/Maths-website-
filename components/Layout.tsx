import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  className?: string
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div className={`wrapper ${className}`}>
      <Header />
      <main className="page">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
