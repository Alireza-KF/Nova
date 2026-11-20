import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import CartPage from './Pages/Cart/Cart'
import CollectionPage from './Pages/Collection/Collection'
import HomePage from './Pages/Home/Home'
import NotFoundPage from './Pages/NotFound/NotFound'
import ProductPage from './Pages/Product/Product'
import ShopPage from './Pages/Shop/Shop'
import './index.css'

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/collection', label: 'Collection' },
  { to: '/cart', label: 'Cart' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
            <Link className="text-xl font-bold tracking-tight text-slate-900" to="/">
              Nova
            </Link>
            <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2">
              {navigation.map(({ to, label, end }) => (
                <NavLink
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                  end={end}
                  key={to}
                  to={to}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-12">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<ShopPage />} path="/shop" />
            <Route element={<CollectionPage />} path="/collection" />
            <Route element={<ProductPage />} path="/product/:productId" />
            <Route element={<CartPage />} path="/cart" />
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
