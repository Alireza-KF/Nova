import { useState, type FormEvent } from 'react'
import { IconChevronRight, IconHeart, IconMinus, IconPlus, IconStarFilled } from '@tabler/icons-react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { formatPrice, getProduct, products, type ProductSize } from '../../data/products'
import { useStore } from '../../store/StoreContext'
import { asset } from '../../utils/assets'
import { tw } from '../../styles/tw'

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
    return <div className={[tw.page, tw.emptyState, tw.notFound].join(' ')}><h1 className={tw.emptyTitle}>We could not find that piece.</h1><Link className={[tw.button, tw.buttonRose].join(' ')} to="/shop">Back to Shop</Link></div>
  }

  const currentProduct = product
  const gallery = [product.image, ...relatedImages.filter((image) => image !== product.image)]
  const isSaved = wishlist.includes(product.id)
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)

  function addProduct() {
    addToCart(currentProduct.id, selectedSize, selectedColor, quantity)
    setAddedMessage('Added to your bag')
  }

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReviewMessage('Thank you for sharing your experience. Reviews will be published when the store backend is connected.')
    setReviewName('')
    setReviewText('')
  }

  return (
    <div className={tw.page}>
      <div aria-label="Breadcrumb" className={tw.breadcrumbs}>
        <Link className={tw.breadcrumbLink} to="/">Home</Link><IconChevronRight size={14} />
        <Link className={tw.breadcrumbLink} to="/shop">Shop</Link><IconChevronRight size={14} />
        <span className={tw.breadcrumbCurrent}>{product.name}</span>
      </div>

      <section className={tw.productDetail}>
        <div>
          <div className={tw.productGalleryMain}><img alt={product.name} className={tw.productGalleryPhoto} src={gallery[selectedImage]} /></div>
          <div aria-label="Product images" className={tw.productThumbs}>
            {gallery.map((image, index) => (
              <button
                aria-label={'Show product image ' + (index + 1)}
                aria-pressed={selectedImage === index}
                className={[tw.productThumb, selectedImage === index && tw.productThumbActive].filter(Boolean).join(' ')}
                key={image}
                onClick={() => setSelectedImage(index)}
                type="button"
              >
                <img alt="" className={tw.productThumbPhoto} loading="lazy" src={image} />
              </button>
            ))}
          </div>
        </div>

        <div className={tw.productInfo}>
          <span className={tw.eyebrow}>NOVA ESSENTIALS</span>
          <h1 className={tw.productInfoTitle}>{product.name}</h1>
          <p className={tw.productInfoPrice}>{formatPrice(product.price)}</p>
          <p className={tw.productDescription}>{product.description}</p>

          <div className={tw.productOption}>
            <div className={tw.productOptionHeading}><span className={tw.productOptionMuted}>Color</span><strong className="font-medium">{selectedColor}</strong></div>
            <div className={tw.productColors}>
              {product.colors.map((color) => (
                <button
                  aria-label={color.label}
                  aria-pressed={selectedColor === color.label}
                  className={[tw.productColor, selectedColor === color.label && tw.productColorActive].filter(Boolean).join(' ')}
                  key={color.label}
                  onClick={() => setSelectedColor(color.label)}
                  style={{ backgroundColor: color.hex }}
                  title={color.label}
                  type="button"
                />
              ))}
            </div>
          </div>

          <div className={tw.productOption}>
            <div className={tw.productOptionHeading}><span className={tw.productOptionMuted}>Size</span><Link className={tw.productOptionLink} to="/shop">Size guide</Link></div>
            <div className={tw.productSizes}>
              {product.sizes.map((size) => (
                <button
                  aria-pressed={selectedSize === size}
                  className={[tw.sizeChip, tw.productSizeChip, selectedSize === size && tw.sizeChipActive].filter(Boolean).join(' ')}
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={tw.productBuyRow}>
            <div aria-label="Quantity" className={tw.quantity}>
              <button aria-label="Decrease quantity" className={tw.quantityButton} disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button"><IconMinus size={14} /></button>
              <span className={tw.quantityValue}>{quantity}</span>
              <button aria-label="Increase quantity" className={tw.quantityButton} onClick={() => setQuantity((value) => value + 1)} type="button"><IconPlus size={14} /></button>
            </div>
            <button className={[tw.button, tw.buttonRose, tw.productAdd].join(' ')} onClick={addProduct} type="button">Add to bag</button>
            <button
              aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isSaved}
              className={[tw.iconButton, tw.productWishlist].join(' ')}
              onClick={() => toggleWishlist(product.id)}
              type="button"
            >
              <IconHeart fill={isSaved ? 'currentColor' : 'none'} size={19} />
            </button>
          </div>
          <p aria-live="polite" className={tw.productFeedback}>{addedMessage}</p>
          <div className={tw.productBenefits}>
            {product.details.map((detail) => <p className={tw.productBenefit} key={detail}>• {detail}</p>)}
          </div>
        </div>
      </section>

      <section aria-label="Customer reviews" className={tw.reviewSection}>
        <div className={[tw.sectionHeading, 'mb-[18px]'].join(' ')}>
          <div><span className={tw.eyebrow}>KIND WORDS</span><h2 className={tw.compactSectionTitle}>Customer Reviews</h2></div>
          <div className={tw.reviewAverage}><IconStarFilled size={17} /> 4.9 <span className={tw.reviewAverageMuted}>· 2 reviews</span></div>
        </div>
        <div className={tw.reviewList}>
          <article className={tw.reviewCard}>
            <div className={tw.reviewAvatar}>S</div>
            <div><h3 className="mb-0 text-xs font-medium">Sara.m</h3><div aria-label="5 out of 5 stars" className={tw.reviewStars}>★★★★★</div><p className={tw.reviewText}>“The fabric is soft and stretchy without feeling thin. The neckline sits nicely and the color looks just like the photos.”</p></div>
          </article>
          <article className={tw.reviewCard}>
            <div className={[tw.reviewAvatar, tw.reviewAvatarMuted].join(' ')}>M</div>
            <div><h3 className="mb-0 text-xs font-medium">Maryam</h3><div aria-label="4 out of 5 stars" className={tw.reviewStars}>★★★★☆</div><p className={tw.reviewText}>“Really cute and comfortable, and the texture feels high quality. It is one of my favorite pieces this season.”</p></div>
          </article>
        </div>

        <form className={tw.reviewForm} onSubmit={submitReview}>
          <div>
            <span className={tw.eyebrow}>YOUR VOICE MATTERS</span>
            <h2 className={tw.reviewFormTitle}>Share your experience</h2>
            <p className={tw.reviewFormDescription}>Tell us what you think about this piece.</p>
          </div>
          <div aria-label="Rating" className={tw.reviewFormRating}>★★★★★</div>
          <label className={tw.reviewFormField}><span className={tw.srOnly}>Your name</span><input className={tw.reviewInput} onChange={(event) => setReviewName(event.target.value)} placeholder="Write your name" required value={reviewName} /></label>
          <label className={tw.reviewFormField}><span className={tw.srOnly}>Your review</span><textarea className={tw.reviewTextarea} onChange={(event) => setReviewText(event.target.value)} placeholder="Write your review here..." required rows={3} value={reviewText} /></label>
          <button className={[tw.button, tw.buttonRose, tw.reviewSubmit].join(' ')} type="submit">Submit review</button>
          <p aria-live="polite" className={tw.reviewMessage}>{reviewMessage}</p>
        </form>
      </section>

      <section aria-labelledby="related-title" className={tw.relatedSection}>
        <div className={[tw.sectionHeading, 'mb-[18px]'].join(' ')}>
          <div><span className={tw.eyebrow}>COMPLETE THE LOOK</span><h2 className={tw.compactSectionTitle} id="related-title">You may also like</h2></div>
          <Link className={tw.textLink} to="/shop">View all <span aria-hidden="true">→</span></Link>
        </div>
        <div className={tw.productGridRelated}>{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>
    </div>
  )
}
