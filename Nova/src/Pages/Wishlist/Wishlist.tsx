import { Link } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { products } from '../../data/products'
import { useStore } from '../../store/StoreContext'
import { tw } from '../../styles/tw'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const savedProducts = products.filter((product) => wishlist.includes(product.id))
  return (
    <div className={[tw.page, 'max-[800px]:pt-6'].join(' ')}>
      <div className={tw.cartHeading}>
        <span className={tw.eyebrow}>YOUR FAVORITES</span>
        <h1 className={tw.cartTitle}>Wishlist</h1>
        <p className={tw.cartDescription}>Keep the pieces you love close.</p>
      </div>
      {savedProducts.length > 0 ? (
        <div className={tw.wishlistGrid}>{savedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className={tw.emptyState}>
          <h2 className={tw.emptyTitle}>No saved pieces yet.</h2>
          <p className={tw.emptyDescription}>Tap the heart on a product to add it to your wishlist.</p>
          <Link className={[tw.button, tw.buttonRose].join(' ')} to="/shop">Explore the shop</Link>
        </div>
      )}
    </div>
  )
}
