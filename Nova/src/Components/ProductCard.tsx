import { useState } from 'react'
import { IconCheck, IconHeart, IconPlus } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { formatPrice, type Product, type ProductSize } from '../data/products'
import { useStore } from '../store/StoreContext'
import { tw } from '../styles/tw'

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
    <article className={tw.productCard}>
      <div className={tw.productCardImageWrap}>
        <Link aria-label={'View ' + product.name} className={tw.productCardImageLink} to={'/product/' + product.id}>
          <img alt={product.name} className={tw.productCardImage} loading="lazy" src={product.image} />
        </Link>
        <button
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isSaved}
          className={[tw.iconButton, tw.productFavorite].join(' ')}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <IconHeart aria-hidden="true" fill={isSaved ? 'currentColor' : 'none'} size={19} />
        </button>
      </div>

      <div className={tw.productCardBody}>
        <Link className={tw.productCardName} to={'/product/' + product.id}>{product.name}</Link>
        <div className={tw.productCardOptions}>
          <div aria-label="Available colors" className={tw.swatches}>
            {product.colors.slice(0, 3).map((color) => (
              <span
                aria-label={color.label}
                className={tw.colorDot}
                key={color.label}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
          <div aria-label="Choose size" className={tw.sizeOptions}>
            {product.sizes.map((size) => (
              <button
                aria-pressed={selectedSize === size}
                className={[tw.sizeChip, selectedSize === size && tw.sizeChipActive].filter(Boolean).join(' ')}
                key={size}
                onClick={() => setSelectedSize(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className={tw.productCardBottom}>
          <span className={tw.productPrice}>{formatPrice(product.price)}</span>
          <button
            aria-label={'Add ' + product.name + ' to bag'}
            className={[tw.addButton, added && tw.addButtonAdded].filter(Boolean).join(' ')}
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
