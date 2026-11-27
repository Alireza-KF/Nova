import { useState } from 'react'
import { IconHeart, IconPlus, IconCheck } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { formatPrice, type Product, type ProductSize } from '../data/products'
import { useStore } from '../store/StoreContext'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useStore()
  const [selectedSize, setSelectedSize] = useState<ProductSize>('S')
  const [added, setAdded] = useState(false)
  const isSaved = wishlist.includes(product.id)

  function handleAdd() {
    addToCart(product.id, selectedSize, product.colors[0]?.label ?? 'Sand')
    setAdded(true)
  }

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <Link
          aria-label={'View ' + product.name}
          className="product-card__image-link"
          to={'/product/' + product.id}
        >
          <img
            alt={product.name}
            className="product-card__image"
            loading="lazy"
            src={product.image}
          />
        </Link>
        <button
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isSaved}
          className={'icon-button product-card__favorite' + (isSaved ? ' is-active' : '')}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <IconHeart aria-hidden="true" fill={isSaved ? 'currentColor' : 'none'} size={19} />
        </button>
      </div>

      <div className="product-card__body">
        <Link className="product-card__name" to={'/product/' + product.id}>
          {product.name}
        </Link>
        <div className="product-card__options">
          <div aria-label="Available colors" className="product-card__swatches">
            {product.colors.slice(0, 3).map((color) => (
              <span
                aria-label={color.label}
                className="color-dot"
                key={color.label}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
          <div aria-label="Choose size" className="product-card__sizes">
            {product.sizes.map((size) => (
              <button
                aria-pressed={selectedSize === size}
                className={'size-chip' + (selectedSize === size ? ' is-selected' : '')}
                key={size}
                onClick={() => setSelectedSize(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="product-card__bottom">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <button
            aria-label={'Add ' + product.name + ' to bag'}
            className={'add-button' + (added ? ' is-added' : '')}
            onClick={handleAdd}
            type="button"
          >
            {added ? <IconCheck size={18} /> : <IconPlus size={19} />}
          </button>
        </div>
      </div>
    </article>
  )
}
