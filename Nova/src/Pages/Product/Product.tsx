import { useState, type FormEvent } from 'react'
import { IconChevronRight, IconHeart, IconMinus, IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { formatPrice, getProduct, products, type ProductSize } from '../../data/products'
import { useStore } from '../../store/StoreContext'
import { asset } from '../../utils/assets'

const relatedImages = [asset('/Images/Design/ecdd8.png'), asset('/Images/Design/65c0f.png'), asset('/Images/Design/5eb79.png')]

export default function ProductPage() {
  const { productId } = useParams()
  const product = getProduct(productId)
  const { addToCart, wishlist, toggleWishlist } = useStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<ProductSize>('S')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.label ?? 'Sand')
  const [quantity, setQuantity] = useState(1)
  const [reviewName, setReviewName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')
  const [addedMessage, setAddedMessage] = useState('')

  if (!product) {
    return <div className="page-width empty-state product-not-found"><h1>We could not find that piece.</h1><Link className="button button--rose" to="/shop">Back to Shop</Link></div>
  }

  const gallery = [product.image, ...relatedImages.filter((image) => image !== product.image)]
  const isSaved = wishlist.includes(product.id)
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)

  function addProduct() {
    addToCart(product.id, selectedSize, selectedColor, quantity)
    setAddedMessage('Added to your bag')
  }

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReviewMessage('Thank you for sharing your experience. Reviews will be published when the store backend is connected.')
    setReviewName('')
    setReviewText('')
  }

  return (
    <div className="page-width product-page">
      <div aria-label="Breadcrumb" className="breadcrumbs"><Link to="/">Home</Link><IconChevronRight size={14} /><Link to="/shop">Shop</Link><IconChevronRight size={14} /><span>{product.name}</span></div>
      <section className="product-detail">
        <div className="product-gallery">
          <div className="product-gallery__main"><img alt={product.name} src={gallery[selectedImage]} /></div>
          <div aria-label="Product images" className="product-gallery__thumbnails">
            {gallery.map((image, index) => (
              <button aria-label={'Show product image ' + (index + 1)} aria-pressed={selectedImage === index} className={selectedImage === index ? 'is-selected' : ''} key={image} onClick={() => setSelectedImage(index)} type="button"><img alt="" loading="lazy" src={image} /></button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <span className="eyebrow">NOVA ESSENTIALS</span>
          <h1>{product.name}</h1>
          <p className="product-info__price">{formatPrice(product.price)}</p>
          <p className="product-info__description">{product.description}</p>

          <div className="product-option">
            <div className="product-option__heading"><span>Color</span><strong>{selectedColor}</strong></div>
            <div className="product-color-options">
              {product.colors.map((color) => (
                <button aria-label={color.label} aria-pressed={selectedColor === color.label} className={'product-color-option' + (selectedColor === color.label ? ' is-selected' : '')} key={color.label} onClick={() => setSelectedColor(color.label)} style={{ backgroundColor: color.hex }} title={color.label} type="button" />
              ))}
            </div>
          </div>

          <div className="product-option">
            <div className="product-option__heading"><span>Size</span><Link to="/shop">Size guide</Link></div>
            <div className="product-size-options">
              {product.sizes.map((size) => <button aria-pressed={selectedSize === size} className={'size-chip' + (selectedSize === size ? ' is-selected' : '')} key={size} onClick={() => setSelectedSize(size)} type="button">{size}</button>)}
            </div>
          </div>

          <div className="product-buy-row">
            <div aria-label="Quantity" className="quantity-control">
              <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button"><IconMinus size={14} /></button>
              <span>{quantity}</span>
              <button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} type="button"><IconPlus size={14} /></button>
            </div>
            <button className="button button--rose product-add-button" onClick={addProduct} type="button">Add to bag</button>
            <button aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={isSaved} className={'icon-button product-wishlist' + (isSaved ? ' is-active' : '')} onClick={() => toggleWishlist(product.id)} type="button"><IconHeart fill={isSaved ? 'currentColor' : 'none'} size={19} /></button>
          </div>
          <p aria-live="polite" className="product-feedback">{addedMessage}</p>
          <div className="product-benefits">{product.details.map((detail) => <p key={detail}>• {detail}</p>)}</div>
        </div>
      </section>

      <section aria-label="Customer reviews" className="review-section">
        <div className="section-heading section-heading--compact">
          <div><span className="eyebrow">KIND WORDS</span><h2>Customer Reviews</h2></div>
          <div className="review-average"><IconStarFilled size={17} /> 4.9 <span>· 2 reviews</span></div>
        </div>
        <div className="review-list">
          <article className="review-card"><div className="review-avatar">S</div><div><h3>Sara.m</h3><div aria-label="5 out of 5 stars" className="review-stars">★★★★★</div><p>“The fabric is soft and stretchy without feeling thin. The neckline sits nicely and the color looks just like the photos.”</p></div></article>
          <article className="review-card"><div className="review-avatar review-avatar--muted">M</div><div><h3>Maryam</h3><div aria-label="4 out of 5 stars" className="review-stars">★★★★☆</div><p>“Really cute and comfortable, and the texture feels high quality. It is one of my favorite pieces this season.”</p></div></article>
        </div>

        <form className="review-form" onSubmit={submitReview}>
          <div><span className="eyebrow">YOUR VOICE MATTERS</span><h2>Share your experience</h2><p>Tell us what you think about this piece.</p></div>
          <div aria-label="Rating" className="review-form__rating">★★★★★</div>
          <label><span className="sr-only">Your name</span><input onChange={(event) => setReviewName(event.target.value)} placeholder="Write your name" required value={reviewName} /></label>
          <label><span className="sr-only">Your review</span><textarea onChange={(event) => setReviewText(event.target.value)} placeholder="Write your review here..." required rows={3} value={reviewText} /></label>
          <button className="button button--rose review-form__submit" type="submit">Submit review</button>
          <p aria-live="polite" className="review-form__message">{reviewMessage}</p>
        </form>
      </section>

      <section aria-labelledby="related-title" className="related-section">
        <div className="section-heading section-heading--compact"><div><span className="eyebrow">COMPLETE THE LOOK</span><h2 id="related-title">You may also like</h2></div><Link className="text-link" to="/shop">View all <span aria-hidden="true">→</span></Link></div>
        <div className="product-grid product-grid--related">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>
    </div>
  )
}
