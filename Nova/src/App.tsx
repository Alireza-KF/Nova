import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartPage from './Pages/Cart/Cart'
import CollectionPage from './Pages/Collection/Collection'
import HomePage from './Pages/Home/Home'
import NotFoundPage from './Pages/NotFound/NotFound'
import ProductPage from './Pages/Product/Product'
import ShopPage from './Pages/Shop/Shop'
import SiteHeader from './Components/SiteHeader'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F2EA]">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-6 pt-34.5 pb-12 max-lg:pt-28">
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
