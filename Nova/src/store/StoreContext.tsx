import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ProductSize } from '../data/products'
import { products } from '../data/products'

export type CartItem = {
  key: string
  productId: string
  quantity: number
  size: ProductSize
  color: string
}

type StoreContextValue = {
  cartItems: CartItem[]
  wishlist: string[]
  cartCount: number
  subtotal: number
  addToCart: (productId: string, size: ProductSize, color: string, quantity?: number) => void
  updateQuantity: (key: string, quantity: number) => void
  removeFromCart: (key: string) => void
  toggleWishlist: (productId: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)
const CART_STORAGE_KEY = 'nova-store-cart-v1'
const WISHLIST_STORAGE_KEY = 'nova-store-wishlist-v1'

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(CART_STORAGE_KEY, []),
  )
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(WISHLIST_STORAGE_KEY, []),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // The cart remains usable for the current session when storage is unavailable.
    }
  }, [cartItems])

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
    } catch {
      // The wishlist remains usable for the current session when storage is unavailable.
    }
  }, [wishlist])

  const addToCart = useCallback(
    (productId: string, size: ProductSize, color: string, quantity = 1) => {
      const key = [productId, size, color].join(':')
      setCartItems((current) => {
        const existing = current.find((item) => item.key === key)
        if (existing) {
          return current.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
          )
        }
        return [...current, { key, productId, size, color, quantity }]
      })
    },
    [],
  )

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((current) => current.filter((item) => item.key !== key))
      return
    }

    setCartItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity } : item)),
    )
  }, [])

  const removeFromCart = useCallback((key: string) => {
    setCartItems((current) => current.filter((item) => item.key !== key))
  }, [])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((item) => item !== productId)
        : [...current, productId],
    )
  }, [])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const product = products.find((candidate) => candidate.id === item.productId)
        return total + (product?.price ?? 0) * item.quantity
      }, 0),
    [cartItems],
  )

  const value = useMemo(
    () => ({
      cartItems,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
    }),
    [
      cartItems,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}
