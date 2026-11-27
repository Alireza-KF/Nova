import { useState, type FormEvent } from 'react'
import { IconHeart, IconMenu2, IconSearch, IconShoppingBag, IconX } from '@tabler/icons-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import { asset } from '../utils/assets'
import { tw } from '../styles/tw'

const desktopLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/collection', label: 'Collections', end: false },
  { to: '/shop', label: 'Shop', end: false },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount, wishlist } = useStore()

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? '/shop?q=' + encodeURIComponent(value) : '/shop')
    setSearchOpen(false)
    setMenuOpen(false)
  }

  function closeMenus() {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  return (
    <div className={tw.headerShell}>
      <header className={tw.header}>
        <Link aria-label="NOVA home" className={tw.logo} onClick={closeMenus} to="/">
          <img alt="NOVA" className={tw.logoImage} src={asset('/Images/Header/logo.png')} />
        </Link>

        <nav aria-label="Main navigation" className={tw.desktopNav}>
          {desktopLinks.map((item) => (
            <NavLink
              className={({ isActive }) => [tw.navLink, isActive && tw.navLinkActive].filter(Boolean).join(' ')}
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          <Link className={tw.navLink} to="/#about">About</Link>
          <Link className={tw.navLink} to="/#contact">Contact</Link>
        </nav>

        <form aria-label="Search products" className={[tw.headerSearch, tw.headerSearchDesktop].join(' ')} onSubmit={submitSearch} role="search">
          <IconSearch aria-hidden="true" size={18} />
          <input
            aria-label="Search products"
            className={tw.headerSearchInput}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            type="search"
            value={query}
          />
        </form>

        <div className={[tw.headerActions, tw.headerActionsDesktop].join(' ')}>
          <Link aria-label={'Shopping bag, ' + cartCount + ' items'} className={tw.headerIcon} to="/cart">
            <IconShoppingBag aria-hidden="true" size={23} />
            {cartCount > 0 && <span className={tw.headerCount}>{cartCount}</span>}
          </Link>
          <Link aria-label={'Wishlist, ' + wishlist.length + ' saved items'} className={tw.headerIcon} to="/wishlist">
            <IconHeart aria-hidden="true" size={23} />
            {wishlist.length > 0 && <span className={tw.headerCount}>{wishlist.length}</span>}
          </Link>
        </div>

        <div className={[tw.headerActions, tw.headerActionsMobile].join(' ')}>
          <button
            aria-expanded={searchOpen}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            className={tw.headerIcon}
            onClick={() => {
              setSearchOpen((open) => !open)
              setMenuOpen(false)
            }}
            type="button"
          >
            {searchOpen ? <IconX size={20} /> : <IconSearch size={20} />}
          </button>
          <Link aria-label="Shopping bag" className={tw.headerIcon} to="/cart">
            <IconShoppingBag size={20} />
            {cartCount > 0 && <span className={tw.headerCount}>{cartCount}</span>}
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className={tw.headerIcon}
            onClick={() => {
              setMenuOpen((open) => !open)
              setSearchOpen(false)
            }}
            type="button"
          >
            {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>

        {searchOpen && (
          <form aria-label="Search products" className={tw.mobileSearch} onSubmit={submitSearch} role="search">
            <input
              aria-label="Search products"
              autoFocus
              className={tw.headerSearchInput}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              type="search"
              value={query}
            />
            <button aria-label="Search" className={tw.addButton} type="submit">
              <IconSearch size={18} />
            </button>
          </form>
        )}

        {menuOpen && (
          <nav aria-label="Mobile navigation" className={tw.mobileNavigation} id="mobile-navigation">
            {desktopLinks.map((item) => (
              <NavLink
                className={({ isActive }) => [tw.mobileNavLink, isActive && tw.mobileNavLinkActive].filter(Boolean).join(' ')}
                end={item.end}
                key={item.to}
                onClick={closeMenus}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <Link className={tw.mobileNavLink} onClick={closeMenus} to="/#about">About</Link>
            <Link className={tw.mobileNavLink} onClick={closeMenus} to="/#contact">Contact</Link>
            <Link className={tw.mobileNavLink} onClick={closeMenus} to="/wishlist">Wishlist</Link>
          </nav>
        )}
      </header>
    </div>
  )
}
