import { useState } from 'react'
import { IconArrowRight, IconMinus, IconPlus, IconTrash } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { formatPrice, products } from '../../data/products'
import { useStore } from '../../store/StoreContext'
import { tw } from '../../styles/tw'

export default function CartPage() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useStore()
  const [checkoutNotice, setCheckoutNotice] = useState('')
  const shipping = cartItems.length > 0 ? 5 : 0
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className={[tw.page, 'max-[800px]:pt-6'].join(' ')}>
        <div className={tw.cartHeading}>
          <span className={tw.eyebrow}>SHOPPING BAG</span>
          <h1 className={tw.cartTitle}>Your cart</h1>
          <p className={tw.cartDescription}>Good things are always worth the wait.</p>
        </div>
        <div className={tw.emptyCart}>
          <span className={tw.emptyCartMark}>N</span>
          <h2 className={tw.emptyCartTitle}>Your bag is taking a little break.</h2>
          <p className={tw.emptyCartDescription}>Discover pieces designed to move with your everyday.</p>
          <Link className={[tw.button, tw.buttonRose].join(' ')} to="/shop">Continue shopping <IconArrowRight size={17} /></Link>
        </div>
      </div>
    )
  }

  return (
    <div className={[tw.page, 'max-[800px]:pt-6'].join(' ')}>
      <div className={tw.cartHeading}>
        <span className={tw.eyebrow}>SHOPPING BAG</span>
        <h1 className={tw.cartTitle}>Your cart</h1>
        <p className={tw.cartDescription}>Good things are always worth the wait.</p>
      </div>
      <div className={tw.cartLayout}>
        <section aria-label="Items in your shopping bag" className={tw.cartItems}>
          {cartItems.map((item) => {
            const product = products.find((candidate) => candidate.id === item.productId)
            if (!product) return null
            return (
              <article className={tw.cartItem} key={item.key}>
                <Link className={tw.cartItemImage} to={'/product/' + product.id}><img alt={product.name} className={tw.cartItemPhoto} loading="lazy" src={product.image} /></Link>
                <div className={tw.cartItemDetails}>
                  <Link className={tw.cartItemName} to={'/product/' + product.id}>{product.name}</Link>
                  <p className={tw.cartItemMeta}><span className={tw.cartItemSwatch} style={{ backgroundColor: product.colors.find((color) => color.label === item.color)?.hex ?? '#d8c8ba' }} />{item.color}</p>
                  <p className={tw.cartItemMeta}>Size: {item.size}</p>
                  <div aria-label="Quantity" className={[tw.quantity, tw.cartItemQuantity].join(' ')}>
                    <button aria-label="Decrease quantity" className={[tw.quantityButton, tw.cartItemQuantityButton].join(' ')} onClick={() => updateQuantity(item.key, item.quantity - 1)} type="button"><IconMinus size={13} /></button>
                    <span className={[tw.quantityValue, tw.cartItemQuantityValue].join(' ')}>{item.quantity}</span>
                    <button aria-label="Increase quantity" className={[tw.quantityButton, tw.cartItemQuantityButton].join(' ')} onClick={() => updateQuantity(item.key, item.quantity + 1)} type="button"><IconPlus size={13} /></button>
                  </div>
                </div>
                <div className={tw.cartItemSide}>
                  <strong className={tw.cartItemPrice}>{formatPrice(product.price * item.quantity)}</strong>
                  <button aria-label={'Remove ' + product.name} className={tw.iconButton} onClick={() => removeFromCart(item.key)} type="button"><IconTrash size={18} /></button>
                </div>
              </article>
            )
          })}
        </section>

        <aside aria-label="Order summary" className={tw.orderSummary}>
          <h2 className={tw.orderSummaryTitle}>Order Summary</h2>
          <div className={tw.orderLine}><span>Subtotal</span><strong className={tw.orderValue}>{formatPrice(subtotal)}</strong></div>
          <div className={tw.orderLine}><span>Discount</span><strong className={tw.orderValue}>{formatPrice(0)}</strong></div>
          <div className={tw.orderLine}><span>Shipping</span><strong className={tw.orderValue}>{formatPrice(shipping)}</strong></div>
          <div className={tw.orderDivider} />
          <div className={[tw.orderLine, tw.orderTotal].join(' ')}><span>Total</span><strong className={[tw.orderValue, tw.orderTotalValue].join(' ')}>{formatPrice(total)}</strong></div>
          <button className={[tw.button, tw.buttonRose, tw.checkoutButton].join(' ')} onClick={() => setCheckoutNotice('Checkout is a front-end preview. Connect a payment provider and order API to accept payments.')} type="button">Check out <IconArrowRight size={18} /></button>
          <p aria-live="polite" className={tw.checkoutNotice}>{checkoutNotice}</p>
        </aside>
      </div>
    </div>
  )
}
