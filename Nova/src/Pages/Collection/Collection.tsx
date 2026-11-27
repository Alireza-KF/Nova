import { useMemo, useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { products } from '../../data/products'

const categoryLabels: Record<string, string> = { tops: 'Tops', dresses: 'Dresses', bottoms: 'Bottoms', outerwear: 'Outerwear' }

export default function CollectionPage() {
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') ?? 'tops'
  const title = categoryLabels[selectedCategory] ?? 'Tops'
  const [sortBy, setSortBy] = useState('newest')

  const collectionProducts = useMemo(() => {
    const selected = products.filter((product) => selectedCategory in categoryLabels ? product.category === selectedCategory : product.category === 'tops')
    if (sortBy === 'price-low') return [...selected].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') return [...selected].sort((a, b) => b.price - a.price)
    return selected
  }, [selectedCategory, sortBy])

  return (
    <div className="page-width collection-page">
      <div aria-label="Breadcrumb" className="breadcrumbs"><Link to="/">Home</Link><IconChevronRight size={14} /><span>Collection</span></div>
      <section aria-label={title + ' collection'} className="collection-hero">
        <img alt="" fetchPriority="high" src="/Images/Design/a287d.png" />
        <div className="collection-hero__content"><span className="eyebrow">THE NOVA COLLECTION</span><h1>{title}</h1><p>Effortless pieces for every mood,<br />from everyday to special moments.</p></div>
      </section>
      <div className="collection-toolbar">
        <p>{collectionProducts.length} items</p>
        <label className="sort-control"><span>Sort by</span><select onChange={(event) => setSortBy(event.target.value)} value={sortBy}><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select></label>
      </div>
      <div className="product-grid product-grid--collection">{collectionProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </div>
  )
}
