import { useMemo, useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { products } from '../../data/products'
import { asset } from '../../utils/assets'
import { tw } from '../../styles/tw'

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
    <div className={tw.page}>
      <div aria-label="Breadcrumb" className={tw.breadcrumbs}><Link className={tw.breadcrumbLink} to="/">Home</Link><IconChevronRight size={14} /><span className={tw.breadcrumbCurrent}>Collection</span></div>
      <section aria-label={title + ' collection'} className={[tw.collectionHero, tw.collectionHeroOverlay].join(' ')}>
        <img alt="" className={tw.collectionHeroImage} fetchPriority="high" src={asset('/Images/Design/a287d.png')} />
        <div className={tw.collectionHeroContent}>
          <span className={tw.eyebrow}>THE NOVA COLLECTION</span>
          <h1 className={tw.collectionHeroTitle}>{title}</h1>
          <p className={tw.collectionHeroDescription}>Effortless pieces for every mood,<br />from everyday to special moments.</p>
        </div>
      </section>
      <div className={tw.collectionToolbar}>
        <p className={tw.collectionCount}>{collectionProducts.length} items</p>
        <label className={tw.sortControl}>
          <span>Sort by</span>
          <select className={tw.sortSelect} onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </label>
      </div>
      <div className={tw.productGridCollection}>{collectionProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </div>
  )
}
