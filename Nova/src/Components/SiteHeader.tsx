import { useState, type FormEvent } from 'react'
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
  IconX,
} from '@tabler/icons-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useStore } from '../store/StoreContext'

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
    <div className="site-header-shell">
      <header className="site-header">
        <Link aria-label="NOVA home" className="site-logo" onClick={closeMenus} to="/">
          <img alt="NOVA" src="/Images/Header/logo.png" />
        </Link>

        <nav aria-label="Main navigation" className="site-nav site-nav--desktop">
          {desktopLinks.map((item) => (
            <NavLink
              className={({ isActive }) => 'site-nav__link' + (isActive ? ' is-active' : '')}
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="site-nav__link" to="/#about">
            About
          </Link>
          <Link className="site-nav__link" to="/#contact">
            Contact
          </Link>
        </nav>

        <form aria-label="Search products" className="header-search header-search--desktop" onSubmit={submitSearch} role="search">
          <IconSearch aria-hidden="true" size={18} />
          <input
            aria-label="Search products"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            type="search"
            value={query}
          />
        </form>

        <div className="site-header__actions site-header__actions--desktop">
          <Link aria-label={'Shopping bag, ' + cartCount + ' items'} className="header-icon-link" to="/cart">
            <IconShoppingBag aria-hidden="true" size={23} />
            {cartCount > 0 && <span className="header-count">{cartCount}</span>}
          </Link>
          <Link aria-label={'Wishlist, ' + wishlist.length + ' saved items'} className="header-icon-link" to="/wishlist">
            <IconHeart aria-hidden="true" size={23} />
            {wishlist.length > 0 && <span className="header-count">{wishlist.length}</span>}
          </Link>
        </div>

        <div className="site-header__actions site-header__actions--mobile">
          <button
            aria-expanded={searchOpen}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            className="header-icon-link"
            onClick={() => {
              setSearchOpen((open) => !open)
              setMenuOpen(false)
            }}
            type="button"
          >
            {searchOpen ? <IconX size={20} /> : <IconSearch size={20} />}
          </button>
          <Link aria-label="Shopping bag" className="header-icon-link" to="/cart">
            <IconShoppingBag size={20} />
            {cartCount > 0 && <span className="header-count">{cartCount}</span>}
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="header-icon-link"
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
          <form aria-label="Search products" className="header-search--mobile" onSubmit={submitSearch} role="search">
            <input
              aria-label="Search products"
              autoFocus
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              type="search"
              value={query}
            />
            <button aria-label="Search" className="add-button" type="submit">
              <IconSearch size={18} />
            </button>
          </form>
        )}

        {menuOpen && (
          <nav aria-label="Mobile navigation" className="mobile-navigation" id="mobile-navigation">
            {desktopLinks.map((item) => (
              <NavLink
                className={({ isActive }) => 'mobile-navigation__link' + (isActive ? ' is-active' : '')}
                end={item.end}
                key={item.to}
                onClick={closeMenus}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <Link className="mobile-navigation__link" onClick={closeMenus} to="/#about">About</Link>
            <Link className="mobile-navigation__link" onClick={closeMenus} to="/#contact">Contact</Link>
            <Link className="mobile-navigation__link" onClick={closeMenus} to="/wishlist">Wishlist</Link>
          </nav>
        )}
      </header>
    </div>
  )
}
