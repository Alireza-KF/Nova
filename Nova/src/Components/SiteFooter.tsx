import { IconArrowUpRight, IconBrandInstagram, IconMail, IconRefresh } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/assets'

export default function SiteFooter() {
  return (
    <footer className="site-footer page-width" id="contact">
      <div className="site-footer__brand">
        <Link aria-label="NOVA home" to="/">
          <img alt="NOVA" className="site-footer__logo" src={asset('/Images/Header/logo.png')} />
        </Link>
        <p>Minimal pieces<br />for everyday moments.</p>
      </div>

      <div className="site-footer__column">
        <h2>NAVIGATION</h2>
        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/#about">About</Link>
        <Link to="/#contact">Contact</Link>
      </div>

      <div className="site-footer__column site-footer__contact">
        <h2>CONTACT</h2>
        <a href="https://www.instagram.com/nova.official/" rel="noreferrer" target="_blank">
          <IconBrandInstagram aria-hidden="true" size={16} />
          @nova.official
        </a>
        <a href="mailto:hello@nova.com">
          <IconMail aria-hidden="true" size={16} />
          hello@nova.com
        </a>
        <Link to="/shop">
          <IconRefresh aria-hidden="true" size={16} />
          Returns &amp; Support
        </Link>
      </div>

      <div aria-hidden="true" className="site-footer__ornament">
        <IconArrowUpRight size={16} />
      </div>
      <p className="site-footer__copyright">© {new Date().getFullYear()} NOVA. All rights reserved.</p>
    </footer>
  )
}
