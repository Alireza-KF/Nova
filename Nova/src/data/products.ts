export type ProductSize = 'S' | 'M' | 'L'

export type ProductColor = {
  label: string
  hex: string
}

export type Product = {
  id: string
  name: string
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear'
  collection: 'minimal' | 'modern' | 'comfortable'
  price: number
  image: string
  colors: ProductColor[]
  sizes: ProductSize[]
  description: string
  details: string[]
  featured?: boolean
}

const sizes: ProductSize[] = ['S', 'M', 'L']

const neutrals: ProductColor[] = [
  { label: 'Sand', hex: '#d8c8ba' },
  { label: 'Taupe', hex: '#9b8574' },
  { label: 'Black', hex: '#252525' },
]

export const products: Product[] = [
  {
    id: 'soft-knit-sweater',
    name: 'Soft Knit Sweater',
    category: 'tops',
    collection: 'comfortable',
    price: 59,
    image: '/Images/Home/BestSellers/soft-knit-sweater.png',
    colors: [
      { label: 'Blush', hex: '#c9828b' },
      { label: 'Oat', hex: '#d8c8ba' },
      { label: 'Black', hex: '#252525' },
    ],
    sizes,
    description: 'A soft, everyday knit with a relaxed shape and a beautifully simple finish.',
    details: ['Soft-touch knit fabric', 'Relaxed everyday fit', 'Model is 170 cm and wears size S'],
    featured: true,
  },
  {
    id: 'linen-relaxed-shirt',
    name: 'Linen Relaxed Shirt',
    category: 'tops',
    collection: 'minimal',
    price: 64,
    image: '/Images/Design/f3a0a.png',
    colors: neutrals,
    sizes,
    description: 'An easy linen layer with a relaxed silhouette, made for effortless everyday styling.',
    details: ['Lightweight linen blend', 'Button-front closure', 'Relaxed fit'],
    featured: true,
  },
  {
    id: 'linen-tailored-blazer',
    name: 'Linen Tailored Blazer',
    category: 'outerwear',
    collection: 'modern',
    price: 84,
    image: '/Images/Design/8e382.png',
    colors: neutrals,
    sizes,
    description: 'A clean, softly structured blazer that brings a polished finish to everyday looks.',
    details: ['Lightweight tailored construction', 'Single-button front', 'Designed for layering'],
    featured: true,
  },
  {
    id: 'linen-oversized-shirt',
    name: 'Linen Oversized Shirt',
    category: 'tops',
    collection: 'comfortable',
    price: 84,
    image: '/Images/Design/7659c.png',
    colors: [
      { label: 'Blue', hex: '#9eabc4' },
      { label: 'Ivory', hex: '#e8dfd3' },
      { label: 'Black', hex: '#252525' },
    ],
    sizes,
    description: 'A versatile oversized shirt with a breezy feel and timeless proportions.',
    details: ['Airy linen blend', 'Dropped shoulder seams', 'Easy oversized fit'],
    featured: true,
  },
  {
    id: 'soft-pleated-midi-skirt',
    name: 'Soft Pleated Midi Skirt',
    category: 'bottoms',
    collection: 'modern',
    price: 72,
    image: '/Images/Design/eaed6.png',
    colors: [
      { label: 'Blush', hex: '#c9828b' },
      { label: 'Stone', hex: '#c7b9aa' },
      { label: 'Black', hex: '#252525' },
    ],
    sizes,
    description: 'A fluid midi skirt with soft movement and a flattering, easy-to-style silhouette.',
    details: ['Soft woven fabric', 'Midi length', 'Elasticated waist'],
    featured: true,
  },
  {
    id: 'relaxed-wide-leg-cargo-pants',
    name: 'Relaxed Wide-Leg Cargo Pants',
    category: 'bottoms',
    collection: 'comfortable',
    price: 76,
    image: '/Images/Design/78640.png',
    colors: neutrals,
    sizes,
    description: 'Comfort-first wide-leg trousers with practical details and a clean, modern profile.',
    details: ['Soft structured fabric', 'Functional side pockets', 'Relaxed wide-leg shape'],
    featured: true,
  },
  {
    id: 'ribbed-everyday-tank',
    name: 'Ribbed Everyday Tank',
    category: 'tops',
    collection: 'minimal',
    price: 39,
    image: '/Images/Design/ecdd8.png',
    colors: [
      { label: 'Ivory', hex: '#e8dfd3' },
      { label: 'Taupe', hex: '#9b8574' },
      { label: 'Sage', hex: '#79956d' },
    ],
    sizes,
    description: 'A versatile ribbed tank designed to work as a layer or a standalone essential.',
    details: ['Stretch ribbed cotton blend', 'Comfortable close fit', 'Everyday wardrobe staple'],
  },
  {
    id: 'floral-peplum-cami',
    name: 'Floral Peplum Cami',
    category: 'tops',
    collection: 'modern',
    price: 49,
    image: '/Images/Design/65c0f.png',
    colors: [
      { label: 'Ivory', hex: '#eee8df' },
      { label: 'Blue', hex: '#7187c0' },
      { label: 'Berry', hex: '#a62f3d' },
    ],
    sizes,
    description: 'A light floral cami with a softly shaped peplum hem and delicate details.',
    details: ['Lightweight printed fabric', 'Adjustable shoulder straps', 'Flared peplum hem'],
  },
  {
    id: 'soft-halter-top',
    name: 'Soft Halter Top',
    category: 'tops',
    collection: 'minimal',
    price: 45,
    image: '/Images/Design/c5115.png',
    colors: [
      { label: 'Blush', hex: '#d9aaa7' },
      { label: 'Lilac', hex: '#9542b9' },
      { label: 'Teal', hex: '#356e69' },
    ],
    sizes,
    description: 'A soft and elegant halter top with a clean, modern silhouette and a comfortable fit.',
    details: ['Soft ribbed fabric', 'Halter neckline', 'Model is 170 cm and wears size S'],
  },
  {
    id: 'square-neck-tank',
    name: 'Square Neck Tank',
    category: 'tops',
    collection: 'minimal',
    price: 42,
    image: '/Images/Design/a2abb.png',
    colors: [
      { label: 'Black', hex: '#252525' },
      { label: 'Oat', hex: '#d8c8ba' },
      { label: 'Olive', hex: '#456650' },
    ],
    sizes,
    description: 'A simple square-neck tank with a clean line and an easy, flattering fit.',
    details: ['Stretch jersey fabric', 'Square neckline', 'Easy everyday layering'],
  },
  {
    id: 'lace-detail-cami',
    name: 'Lace Detail Cami',
    category: 'tops',
    collection: 'modern',
    price: 45,
    image: '/Images/Design/140c8.png',
    colors: [
      { label: 'Ivory', hex: '#eee8df' },
      { label: 'Taupe', hex: '#9b8574' },
      { label: 'Gold', hex: '#d5a82f' },
    ],
    sizes,
    description: 'A delicate cami finished with subtle lace detailing for a soft, considered look.',
    details: ['Lightweight fabric', 'Lace-trimmed neckline', 'Adjustable straps'],
  },
  {
    id: 'off-shoulder-knit-top',
    name: 'Off-Shoulder Knit Top',
    category: 'tops',
    collection: 'comfortable',
    price: 55,
    image: '/Images/Design/9e469.png',
    colors: [
      { label: 'Stone', hex: '#a69a8c' },
      { label: 'Grey', hex: '#a9a9a9' },
      { label: 'Blue', hex: '#62a8d1' },
    ],
    sizes,
    description: 'A soft off-shoulder knit that adds an effortless statement to simple outfits.',
    details: ['Soft stretch knit', 'Off-shoulder neckline', 'Comfortable close fit'],
  },
  {
    id: 'soft-halter-top-cream',
    name: 'Soft Halter Top',
    category: 'tops',
    collection: 'comfortable',
    price: 59,
    image: '/Images/Design/8673d.png',
    colors: [
      { label: 'Cream', hex: '#e9dfd2' },
      { label: 'Sage', hex: '#a8ad67' },
      { label: 'Black', hex: '#252525' },
    ],
    sizes,
    description: 'A refined halter shape in a soft neutral tone, ready for day-to-night styling.',
    details: ['Soft-touch fabric', 'Clean halter neckline', 'Easy-to-style neutral shade'],
  },
  {
    id: 'satin-bandeau-top',
    name: 'Satin Bandeau Top',
    category: 'tops',
    collection: 'modern',
    price: 68,
    image: '/Images/Home/BestSellers/satin-midi-dress.png',
    colors: [
      { label: 'Blue', hex: '#9eabc4' },
      { label: 'Ivory', hex: '#e8dfd3' },
      { label: 'Blush', hex: '#d9aaa7' },
    ],
    sizes,
    description: 'A minimal satin-inspired piece with a smooth finish and a simple, elegant shape.',
    details: ['Smooth satin-touch finish', 'Clean bandeau neckline', 'Designed for occasion styling'],
  },
]

export const featuredProducts = products.filter((product) => product.featured)
export const topProducts = products.filter((product) => product.category === 'tops')

export function getProduct(productId: string | undefined) {
  return products.find((product) => product.id === productId)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}
