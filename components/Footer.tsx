import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link href="#" className="footer__policy">Privacy Policy – Terms & Conditions</Link>
        <Link href="/" className="footer__logo logo">
          <Image 
            src="/Mylogo-transparent.png" 
            alt="Mathsmastery Logo" 
            width={150} 
            height={60}
            style={{ 
              width: 'auto', 
              height: '60px',
              maxWidth: '150px',
              maxHeight: '60px',
              margin: '6px 0'
            }}
          />
        </Link>
        <div className="footer__copyright">Copyright © 2025 Mathsmastery – All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer
