import { IconArrowUpRight, IconBrandInstagram, IconMail, IconRefresh } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/assets'
import { tw } from '../styles/tw'

export default function SiteFooter() {
  return (
    <footer className={tw.footer} id="contact">
      <div>
        <Link aria-label="NOVA home" to="/">
          <img alt="NOVA" className={tw.footerBrandLogo} src={asset('/Images/Header/logo.png')} />
        </Link>
        <p className={tw.footerBrandText}>Minimal pieces<br />for everyday moments.</p>
      </div>

      <div className={tw.footerColumn}>
        <h2 className={tw.footerHeading}>NAVIGATION</h2>
        <Link className={tw.footerLink} to="/">Home</Link>
        <Link className={tw.footerLink} to="/collection">Collection</Link>
        <Link className={tw.footerLink} to="/#about">About</Link>
        <Link className={tw.footerLink} to="/#contact">Contact</Link>
      </div>

      <div className={tw.footerColumn}>
        <h2 className={tw.footerHeading}>CONTACT</h2>
        <a className={[tw.footerLink, tw.footerContactLink].join(' ')} href="https://www.instagram.com/nova.official/" rel="noreferrer" target="_blank">
          <IconBrandInstagram aria-hidden="true" className={tw.footerContactIcon} size={16} />
          @nova.official
        </a>
        <a className={[tw.footerLink, tw.footerContactLink].join(' ')} href="mailto:hello@nova.com">
          <IconMail aria-hidden="true" className={tw.footerContactIcon} size={16} />
          hello@nova.com
        </a>
        <Link className={[tw.footerLink, tw.footerContactLink].join(' ')} to="/shop">
          <IconRefresh aria-hidden="true" className={tw.footerContactIcon} size={16} />
          Returns &amp; Support
        </Link>
      </div>

      <div aria-hidden="true" className={tw.footerOrnament}>
        <IconArrowUpRight size={16} />
      </div>
      <p className={tw.footerCopyright}>© {new Date().getFullYear()} NOVA. All rights reserved.</p>
    </footer>
  )
}
