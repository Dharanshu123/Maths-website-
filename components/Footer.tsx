import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link href="#" className="footer__policy">Privacy Policy – Terms & Conditions</Link>
        <Link href="/" className="footer__logo logo">
          <Image 
            src="/Mylogo.png" 
            alt="Mathsmastery Logo" 
            width={155} 
            height={62}
            style={{ 
              width: 'auto', 
              height: 'auto',
              maxWidth: '155px',
              maxHeight: '62px',
              background: 'transparent',
              mixBlendMode: 'multiply'
            }}
          />
        </Link>
        <div className="footer__copyright">Copyright © 2025 Mathsmastery – All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer
