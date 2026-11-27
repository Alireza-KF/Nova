import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteFooter from './Components/SiteFooter'
import SiteHeader from './Components/SiteHeader'
import CartPage from './Pages/Cart/Cart'
import CollectionPage from './Pages/Collection/Collection'
import HomePage from './Pages/Home/Home'
import NotFoundPage from './Pages/NotFound/NotFound'
import ProductPage from './Pages/Product/Product'
import ShopPage from './Pages/Shop/Shop'
import WishlistPage from './Pages/Wishlist/Wishlist'
import { StoreProvider } from './store/StoreContext'
import './index.css'
import { tw } from './styles/tw'

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

  return (
    <BrowserRouter basename={basename}>
      <StoreProvider>
        <div className={tw.app}>
          <SiteHeader />
          <main className={tw.main} id="main-content">
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ShopPage />} path="/shop" />
              <Route element={<CollectionPage />} path="/collection" />
              <Route element={<ProductPage />} path="/product/:productId" />
              <Route element={<CartPage />} path="/cart" />
              <Route element={<WishlistPage />} path="/wishlist" />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
