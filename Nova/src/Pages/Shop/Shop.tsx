import { useMemo, useState } from 'react'
import { IconAdjustmentsHorizontal, IconChevronRight, IconX } from '@tabler/icons-react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { products, type ProductSize } from '../../data/products'

const collections = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'modern', label: 'Modern' },
  { value: 'comfortable', label: 'Comfortable' },
]
const categories = [
  { value: 'tops', label: 'Tops' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'outerwear', label: 'Jackets' },
]
const colorChoices = [
  { label: 'Sand', hex: '#d8c8ba' },
  { label: 'Blush', hex: '#c9828b' },
  { label: 'Ivory', hex: '#eee8df' },
  { label: 'Blue', hex: '#7187c0' },
  { label: 'Sage', hex: '#79956d' },
  { label: 'Black', hex: '#252525' },
]

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const searchTerm = (searchParams.get('q') ?? '').trim().toLowerCase()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState<ProductSize | 'all'>('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const [priceMax, setPriceMax] = useState(250)
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm) || product.category.includes(searchTerm) || product.collection.includes(searchTerm)
      const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSize = selectedSize === 'all' || product.sizes.includes(selectedSize)
      const matchesColor = selectedColor === 'all' || product.colors.some((color) => color.label === selectedColor)
      return matchesSearch && matchesCollection && matchesCategory && matchesSize && matchesColor && product.price <= priceMax
    })
    return result.sort((first, second) => {
      if (sortBy === 'price-low') return first.price - second.price
      if (sortBy === 'price-high') return second.price - first.price
      if (sortBy === 'name') return first.name.localeCompare(second.name)
      return products.indexOf(first) - products.indexOf(second)
    })
  }, [searchTerm, selectedCollection, selectedCategory, selectedSize, selectedColor, priceMax, sortBy])

  const pageSize = 6
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const visibleProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize)

  function clearFilters() {
    setSelectedCollection('all')
    setSelectedCategory('all')
    setSelectedSize('all')
    setSelectedColor('all')
    setPriceMax(250)
    setPage(1)
  }

  function updateFilter(update: () => void) {
    update()
    setPage(1)
  }

  const filters = (
    <div className="filter-panel__content">
      <div className="filter-panel__heading"><h2>Filters</h2><button className="filter-clear" onClick={clearFilters} type="button">Clear all</button></div>
      <fieldset className="filter-group">
        <legend>Collection</legend>
        {collections.map((collection) => (
          <label className="filter-option" key={collection.value}>
            <input checked={selectedCollection === collection.value} name="collection" onChange={() => updateFilter(() => setSelectedCollection(collection.value))} type="radio" value={collection.value} />
            <span>{collection.label}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="filter-group">
        <legend>Item Type</legend>
        {categories.map((category) => (
          <label className="filter-option" key={category.value}>
            <input checked={selectedCategory === category.value} name="category" onChange={() => updateFilter(() => setSelectedCategory(category.value))} type="radio" value={category.value} />
            <span>{category.label}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="filter-group">
        <legend>Size</legend>
        <div className="filter-size-row">
          {(['S', 'M', 'L'] as ProductSize[]).map((size) => (
            <button aria-pressed={selectedSize === size} className={'size-chip' + (selectedSize === size ? ' is-selected' : '')} key={size} onClick={() => updateFilter(() => setSelectedSize(selectedSize === size ? 'all' : size))} type="button">{size}</button>
          ))}
        </div>
      </fieldset>
      <fieldset className="filter-group">
        <legend>Color</legend>
        <div className="filter-color-row">
          {colorChoices.map((color) => (
            <button aria-label={color.label} aria-pressed={selectedColor === color.label} className={'filter-color' + (selectedColor === color.label ? ' is-selected' : '')} key={color.label} onClick={() => updateFilter(() => setSelectedColor(selectedColor === color.label ? 'all' : color.label))} style={{ backgroundColor: color.hex }} title={color.label} type="button" />
          ))}
        </div>
      </fieldset>
      <fieldset className="filter-group filter-group--last">
        <legend>Price Range</legend>
        <div className="price-range-labels"><span>$20</span><span>{'$' + priceMax}</span></div>
        <input aria-label="Maximum price" className="price-range" max="250" min="20" onChange={(event) => updateFilter(() => setPriceMax(Number(event.target.value)))} step="5" type="range" value={priceMax} />
      </fieldset>
    </div>
  )

  return (
    <div className="page-width shop-page">
      <div aria-label="Breadcrumb" className="breadcrumbs"><Link to="/">Home</Link><IconChevronRight size={14} /><span>Shop</span></div>
      <div className="shop-layout">
        <aside aria-label="Product filters" className="filter-sidebar">{filters}</aside>
        <div className="shop-results">
          <div className="shop-toolbar">
            <div>
              <h1>All Products</h1>
              <p>{searchTerm ? 'Search results for “' + searchParams.get('q') + '” · ' : ''}showing {filteredProducts.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filteredProducts.length)} of {filteredProducts.length} products</p>
            </div>
            <div className="shop-toolbar__actions">
              <button aria-expanded={filtersOpen} className="filter-mobile-trigger" onClick={() => setFiltersOpen(true)} type="button"><IconAdjustmentsHorizontal size={17} /> Filter</button>
              <label className="sort-control"><span>Sort by</span><select onChange={(event) => setSortBy(event.target.value)} value={sortBy}><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="name">Name</option></select></label>
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          ) : (
            <div className="empty-state"><h2>No pieces found</h2><p>Try changing your search or clearing the filters.</p><button className="button button--rose" onClick={clearFilters} type="button">Clear filters</button></div>
          )}

          {filteredProducts.length > pageSize && (
            <nav aria-label="Product pages" className="pagination">
              <button aria-label="Previous page" disabled={safePage === 1} onClick={() => setPage(safePage - 1)} type="button">←</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <button aria-current={safePage === pageNumber ? 'page' : undefined} className={safePage === pageNumber ? 'is-current' : ''} key={pageNumber} onClick={() => setPage(pageNumber)} type="button">{pageNumber}</button>
              ))}
              <button aria-label="Next page" disabled={safePage === pageCount} onClick={() => setPage(safePage + 1)} type="button">→</button>
            </nav>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="filter-drawer-backdrop" onClick={() => setFiltersOpen(false)} role="presentation">
          <section aria-label="Product filters" aria-modal="true" className="filter-drawer" onClick={(event) => event.stopPropagation()} role="dialog">
            <div className="filter-drawer__header"><h2>Filters</h2><button aria-label="Close filters" className="icon-button" onClick={() => setFiltersOpen(false)} type="button"><IconX size={20} /></button></div>
            {filters}
            <button className="button button--rose filter-drawer__apply" onClick={() => setFiltersOpen(false)} type="button">Show {filteredProducts.length} pieces</button>
          </section>
        </div>
      )}
    </div>
  )
}
