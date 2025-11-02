import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useContactModal } from '../contexts/ContactModalContext'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openContactModal } = useContactModal()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo logo">
          <Image 
            src="/Mylogo-transparent.png" 
            alt="Mathsmastery Logo" 
            width={160} 
            height={64}
            priority
            style={{ 
              width: 'auto', 
              height: '64px',
              maxWidth: '160px',
              maxHeight: '64px',
              marginRight: '8px'
            }}
          />
        </Link>
        <div className="header__navigation">
          <div className="header__menu menu">
            <nav className={`menu__body ${menuOpen ? 'menu-open' : ''}`}>
              <ul className="menu__list">
                <li className="menu__item">
                  <Link href="/" className="menu__link">Home</Link>
                </li>
                <li className="menu__item">
                  <Link href="/about" className="menu__link">About us</Link>
                </li>
                <li className="menu__item">
                  <Link href="/pricing" className="menu__link">Pricing</Link>
                </li>
                <li className="menu__item">
                  <Link href="/testimonial" className="menu__link">Testimonial</Link>
                </li>
                <li className="menu__item">
                  <Link href="/services" className="menu__link">Services</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header__actions actions-header">
            <Link href="tel:+61426913932" className="call-us-btn">Call Us</Link>
            <button 
              onClick={openContactModal}
              className="contact-us-btn"
            >
              Contact Us
            </button>
            <Link href="/pricing" className="enrol-now-btn">Enrol Now!</Link>
            <button 
              type="button" 
              className={`menu__icon icon-menu ${menuOpen ? 'menu-open' : ''}`}
              onClick={toggleMenu}
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
