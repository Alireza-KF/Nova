import { useState } from 'react'
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingBagHeart,
  IconShoppingCart,
} from '@tabler/icons-react'
import { Link, NavLink } from 'react-router-dom'

const sectionLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

const mobileRouteLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/collection', label: 'Collections' },
  { to: '/cart', label: 'Cart' },
]

const headerClassName =
  'relative mx-auto flex h-[90px] w-full max-w-[1280px] items-center overflow-visible rounded-[45px] bg-white py-[9px] pr-[65px] pl-[9px] font-inter max-lg:h-16 max-lg:rounded-none max-lg:py-0 max-lg:pr-[18px] max-lg:pl-1'
const desktopNavLinkClassName =
  'text-[16px] font-normal leading-8 text-[#b76e79] no-underline hover:text-[#9c5661]'
const mobileNavLinkClassName = 'py-2 text-base leading-6 text-[#b76e79] no-underline'
const mobileIconButtonClassName =
  'grid h-[18px] w-[18px] flex-none place-items-center border-0 bg-transparent p-0 text-black'
const desktopIconButtonClassName =
  'grid h-6 w-6 flex-none place-items-center border-0 bg-transparent p-0 text-black'

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="fixed inset-x-0 top-0 z-20">
      <header className={headerClassName}>
        <Link
          aria-label="Nova home"
          className="block h-[66px] w-[198px] flex-none -translate-y-[3px] max-lg:h-[38px] max-lg:w-[114px] max-lg:translate-y-[3px]"
          to="/"
        >
          <img
            alt="Nova"
            className="block h-full w-full object-contain"
            height="66"
            src="/Images/Header/logo.png"
            width="198"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="ml-[65px] flex flex-[0_0_auto] items-center gap-10 whitespace-nowrap max-lg:hidden"
        >
          <NavLink className={desktopNavLinkClassName} end to="/">
            Home
          </NavLink>
          <NavLink className={desktopNavLinkClassName} to="/collection">
            Collections
          </NavLink>
          {sectionLinks.map(({ href, label }) => (
            <a
              className={`${desktopNavLinkClassName} ${label === 'About' ? 'ml-[77px]' : ''}`}
              href={href}
              key={label}
            >
              {label}
            </a>
          ))}
        </nav>

        <form
          action="/shop"
          className="relative ml-auto flex h-10 w-[230px] flex-[0_0_230px] items-center overflow-hidden rounded-full border border-[#e5ddd5] bg-white max-lg:hidden"
          role="search"
        >
          <IconSearch
            aria-hidden="true"
            className="absolute left-[6px] flex-none"
            size={20}
          />
          <input
            aria-label="Search"
            className="h-full w-full border-0 bg-transparent py-0 pr-3 pl-[33px] font-inter text-[14px] text-[#6f6f6f] outline-none placeholder:text-[#6f6f6f]"
            name="q"
            placeholder="Search"
            type="search"
          />
        </form>

        <div className="ml-[50px] flex items-center gap-[46px] max-lg:hidden">
          <Link
            aria-label="Shopping cart"
            className={`${desktopIconButtonClassName} no-underline`}
            to="/cart"
          >
            <IconShoppingCart aria-hidden="true" size={24} />
          </Link>
          <button
            aria-label="Wishlist"
            className={`${desktopIconButtonClassName} cursor-pointer`}
            type="button"
          >
            <IconHeart aria-hidden="true" size={24} />
          </button>
        </div>

        <div className="ml-auto hidden items-center gap-4 max-lg:flex">
          <button
            aria-expanded={searchOpen}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            className={`${mobileIconButtonClassName} cursor-pointer`}
            onClick={() => {
              setSearchOpen((open) => !open)
              setMenuOpen(false)
            }}
            type="button"
          >
            <IconSearch aria-hidden="true" size={18} />
          </button>
          <Link
            aria-label="Shopping cart and wishlist"
            className={`${mobileIconButtonClassName} no-underline`}
            to="/cart"
          >
            <IconShoppingBagHeart aria-hidden="true" size={18} />
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`${mobileIconButtonClassName} cursor-pointer`}
            onClick={() => {
              setMenuOpen((open) => !open)
              setSearchOpen(false)
            }}
            type="button"
          >
            <IconMenu2 aria-hidden="true" size={18} />
          </button>
        </div>

        {searchOpen && (
          <form
            action="/shop"
            className="absolute inset-x-0 top-full hidden h-[52px] border-y border-[#e5ddd5] bg-white max-lg:flex"
            role="search"
          >
            <input
              autoFocus
              aria-label="Search"
              className="h-full w-full border-0 bg-transparent py-0 pr-3 pl-[33px] font-inter text-[14px] text-[#6f6f6f] outline-none placeholder:text-[#6f6f6f]"
              name="q"
              placeholder="Search"
              type="search"
            />
          </form>
        )}

        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full hidden grid-cols-1 gap-1 border-t border-[#e5ddd5] bg-white px-5 pt-3 pb-4 shadow-[0_8px_16px_rgb(0_0_0_/_8%)] max-lg:grid"
            id="mobile-navigation"
          >
            {mobileRouteLinks.map(({ to, label, end }) => (
              <NavLink
                className={mobileNavLinkClassName}
                end={end}
                key={to}
                onClick={() => setMenuOpen(false)}
                to={to}
              >
                {label}
              </NavLink>
            ))}
            {sectionLinks.map(({ href, label }) => (
              <a
                className={mobileNavLinkClassName}
                href={href}
                key={label}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </div>
  )
}

export default SiteHeader
