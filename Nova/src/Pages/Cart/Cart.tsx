import { useState } from 'react'
import { IconArrowRight, IconMinus, IconPlus, IconTrash } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { formatPrice, products } from '../../data/products'
import { useStore } from '../../store/StoreContext'

export default function CartPage() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useStore()
  const [checkoutNotice, setCheckoutNotice] = useState('')
  const shipping = cartItems.length > 0 ? 5 : 0
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="page-width cart-page">
        <div className="cart-heading"><span className="eyebrow">SHOPPING BAG</span><h1>Your cart</h1><p>Good things are always worth the wait.</p></div>
        <div className="empty-cart"><span className="empty-cart__mark">N</span><h2>Your bag is taking a little break.</h2><p>Discover pieces designed to move with your everyday.</p><Link className="button button--rose" to="/shop">Continue shopping <IconArrowRight size={17} /></Link></div>
      </div>
    )
  }

  return (
    <div className="page-width cart-page">
      <div className="cart-heading"><span className="eyebrow">SHOPPING BAG</span><h1>Your cart</h1><p>Good things are always worth the wait.</p></div>
      <div className="cart-layout">
        <section aria-label="Items in your shopping bag" className="cart-items">
          {cartItems.map((item) => {
            const product = products.find((candidate) => candidate.id === item.productId)
            if (!product) return null
            return (
              <article className="cart-item" key={item.key}>
                <Link className="cart-item__image" to={'/product/' + product.id}><img alt={product.name} loading="lazy" src={product.image} /></Link>
                <div className="cart-item__details">
                  <Link className="cart-item__name" to={'/product/' + product.id}>{product.name}</Link>
                  <p><span className="cart-item__swatch" style={{ backgroundColor: product.colors.find((color) => color.label === item.color)?.hex ?? '#d8c8ba' }} />{item.color}</p>
                  <p>Size: {item.size}</p>
                  <div aria-label="Quantity" className="quantity-control">
                    <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.key, item.quantity - 1)} type="button"><IconMinus size={13} /></button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQuantity(item.key, item.quantity + 1)} type="button"><IconPlus size={13} /></button>
                  </div>
                </div>
                <div className="cart-item__side"><strong>{formatPrice(product.price * item.quantity)}</strong><button aria-label={'Remove ' + product.name} className="icon-button" onClick={() => removeFromCart(item.key)} type="button"><IconTrash size={18} /></button></div>
              </article>
            )
          })}
        </section>

        <aside aria-label="Order summary" className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-summary__line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          <div className="order-summary__line"><span>Discount</span><strong>{formatPrice(0)}</strong></div>
          <div className="order-summary__line"><span>Shipping</span><strong>{formatPrice(shipping)}</strong></div>
          <div className="order-summary__divider" />
          <div className="order-summary__line order-summary__total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <button className="button button--rose order-summary__checkout" onClick={() => setCheckoutNotice('Checkout is a front-end preview. Connect a payment provider and order API to accept payments.')} type="button">Check out <IconArrowRight size={18} /></button>
          <p aria-live="polite" className="checkout-notice">{checkoutNotice}</p>
        </aside>
      </div>
    </div>
  )
}
