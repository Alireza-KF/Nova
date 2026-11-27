import { Link } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { products } from '../../data/products'
import { useStore } from '../../store/StoreContext'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const savedProducts = products.filter((product) => wishlist.includes(product.id))
  return (
    <div className="page-width wishlist-page">
      <div className="cart-heading"><span className="eyebrow">YOUR FAVORITES</span><h1>Wishlist</h1><p>Keep the pieces you love close.</p></div>
      {savedProducts.length > 0 ? (
        <div className="product-grid">{savedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="empty-state"><h2>No saved pieces yet.</h2><p>Tap the heart on a product to add it to your wishlist.</p><Link className="button button--rose" to="/shop">Explore the shop</Link></div>
      )}
    </div>
  )
}
