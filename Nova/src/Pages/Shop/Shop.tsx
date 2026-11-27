import { useMemo, useState } from 'react'
import { IconAdjustmentsHorizontal, IconChevronRight, IconX } from '@tabler/icons-react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { products, type ProductSize } from '../../data/products'
import { tw } from '../../styles/tw'

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
    <div>
      <div className={tw.filterPanelHeading}>
        <h2 className={tw.filterHeading}>Filters</h2>
        <button className={tw.filterClear} onClick={clearFilters} type="button">Clear all</button>
      </div>
      <fieldset className={tw.filterGroup}>
        <legend className={tw.filterLegend}>Collection</legend>
        {collections.map((collection) => (
          <label className={tw.filterOption} key={collection.value}>
            <input checked={selectedCollection === collection.value} className={tw.filterRadio} name="collection" onChange={() => updateFilter(() => setSelectedCollection(collection.value))} type="radio" value={collection.value} />
            <span>{collection.label}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className={tw.filterGroup}>
        <legend className={tw.filterLegend}>Item Type</legend>
        {categories.map((category) => (
          <label className={tw.filterOption} key={category.value}>
            <input checked={selectedCategory === category.value} className={tw.filterRadio} name="category" onChange={() => updateFilter(() => setSelectedCategory(category.value))} type="radio" value={category.value} />
            <span>{category.label}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className={tw.filterGroup}>
        <legend className={tw.filterLegend}>Size</legend>
        <div className={tw.filterSizeRow}>
          {(['S', 'M', 'L'] as ProductSize[]).map((size) => (
            <button
              aria-pressed={selectedSize === size}
              className={[tw.sizeChip, selectedSize === size && tw.sizeChipActive].filter(Boolean).join(' ')}
              key={size}
              onClick={() => updateFilter(() => setSelectedSize(selectedSize === size ? 'all' : size))}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className={tw.filterGroup}>
        <legend className={tw.filterLegend}>Color</legend>
        <div className={tw.filterColorRow}>
          {colorChoices.map((color) => (
            <button
              aria-label={color.label}
              aria-pressed={selectedColor === color.label}
              className={[tw.filterColor, selectedColor === color.label && tw.filterColorActive].filter(Boolean).join(' ')}
              key={color.label}
              onClick={() => updateFilter(() => setSelectedColor(selectedColor === color.label ? 'all' : color.label))}
              style={{ backgroundColor: color.hex }}
              title={color.label}
              type="button"
            />
          ))}
        </div>
      </fieldset>
      <fieldset className={[tw.filterGroup, tw.filterGroupLast].join(' ')}>
        <legend className={tw.filterLegend}>Price Range</legend>
        <div className={tw.priceRangeLabels}><span>$20</span><span>{'$' + priceMax}</span></div>
        <input aria-label="Maximum price" className={tw.priceRange} max="250" min="20" onChange={(event) => updateFilter(() => setPriceMax(Number(event.target.value)))} step="5" type="range" value={priceMax} />
      </fieldset>
    </div>
  )

  return (
    <div className={tw.page}>
      <div aria-label="Breadcrumb" className={tw.breadcrumbs}>
        <Link className={tw.breadcrumbLink} to="/">Home</Link><IconChevronRight size={14} /><span className={tw.breadcrumbCurrent}>Shop</span>
      </div>
      <div className={tw.shopLayout}>
        <aside aria-label="Product filters" className={tw.filterSidebar}>{filters}</aside>
        <div>
          <div className={tw.shopToolbar}>
            <div>
              <h1 className={tw.shopTitle}>All Products</h1>
              <p className={tw.shopCount}>{searchTerm ? 'Search results for “' + searchParams.get('q') + '” · ' : ''}showing {filteredProducts.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filteredProducts.length)} of {filteredProducts.length} products</p>
            </div>
            <div className={tw.shopToolbarActions}>
              <button aria-expanded={filtersOpen} className={tw.filterMobileTrigger} onClick={() => setFiltersOpen(true)} type="button"><IconAdjustmentsHorizontal size={17} /> Filter</button>
              <label className={tw.sortControl}>
                <span>Sort by</span>
                <select className={tw.sortSelect} onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className={tw.productGrid}>{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          ) : (
            <div className={tw.emptyState}>
              <h2 className={tw.emptyTitle}>No pieces found</h2>
              <p className={tw.emptyDescription}>Try changing your search or clearing the filters.</p>
              <button className={[tw.button, tw.buttonRose].join(' ')} onClick={clearFilters} type="button">Clear filters</button>
            </div>
          )}

          {filteredProducts.length > pageSize && (
            <nav aria-label="Product pages" className={tw.pagination}>
              <button aria-label="Previous page" className={tw.paginationButton} disabled={safePage === 1} onClick={() => setPage(safePage - 1)} type="button">←</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  aria-current={safePage === pageNumber ? 'page' : undefined}
                  className={[tw.paginationButton, safePage === pageNumber && tw.paginationActive].filter(Boolean).join(' ')}
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  type="button"
                >
                  {pageNumber}
                </button>
              ))}
              <button aria-label="Next page" className={tw.paginationButton} disabled={safePage === pageCount} onClick={() => setPage(safePage + 1)} type="button">→</button>
            </nav>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className={tw.filterBackdrop} onClick={() => setFiltersOpen(false)} role="presentation">
          <section aria-label="Product filters" aria-modal="true" className={tw.filterDrawer} onClick={(event) => event.stopPropagation()} role="dialog">
            <div className={tw.filterDrawerHeader}>
              <h2 className={tw.filterHeading}>Filters</h2>
              <button aria-label="Close filters" className={tw.iconButton} onClick={() => setFiltersOpen(false)} type="button"><IconX size={20} /></button>
            </div>
            {filters}
            <button className={[tw.button, tw.buttonRose, tw.filterDrawerApply].join(' ')} onClick={() => setFiltersOpen(false)} type="button">Show {filteredProducts.length} pieces</button>
          </section>
        </div>
      )}
    </div>
  )
}
