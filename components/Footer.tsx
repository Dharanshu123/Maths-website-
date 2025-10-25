import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link href="#" className="footer__policy">Privacy Policy – Terms & Conditions</Link>
        <Link href="/" className="footer__logo logo">Mathsmastery</Link>
        <div className="footer__copyright">Copyright © 2025 Mathsmastery – All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer
