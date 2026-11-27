import { useState, type FormEvent } from 'react'
import { IconArrowRight, IconArrowUpRight, IconDiamond, IconHeart, IconLeaf, IconRefresh } from '@tabler/icons-react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Link } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { featuredProducts } from '../../data/products'
import { asset } from '../../utils/assets'

const collectionCards = [
  { name: 'Tops', image: asset('/Images/Collection/tops.png'), category: 'tops', description: 'Everyday essentials' },
  { name: 'Dresses', image: asset('/Images/Collection/dresses.png'), category: 'dresses', description: 'Effortless silhouettes' },
  { name: 'Bottoms', image: asset('/Images/Collection/bottoms.png'), category: 'bottoms', description: 'Easy movement' },
  { name: 'Outerwear', image: asset('/Images/Collection/outerwear.png'), category: 'outerwear', description: 'Layers with purpose' },
]

const storeFeatures = [
  { title: 'Everyday Comfort', Icon: IconHeart, description: 'Pieces that feel as good as they look.' },
  { title: 'Easy Returns', Icon: IconRefresh, description: 'A simple, considered return experience.' },
  { title: 'Quality Pieces', Icon: IconDiamond, description: 'Made to be worn and loved again.' },
  { title: 'Thoughtful Style', Icon: IconLeaf, description: 'Minimal design for everyday moments.' },
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'snap',
    slides: { perView: 1.7, spacing: 12 },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 2.5, spacing: 16 } },
      '(min-width: 900px)': { slides: { perView: 3.5, spacing: 18 } },
      '(min-width: 1200px)': { slides: { perView: 4, spacing: 20 } },
    },
  })

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    setNewsletterMessage('Thanks for joining NOVA. Newsletter delivery will be available once an email service is connected.')
    setEmail('')
  }

  return (
    <div className="home-page">
      <section aria-labelledby="hero-title" className="home-hero page-width">
        <div className="home-hero__image-frame">
          <img alt="Model wearing a soft neutral everyday look" className="home-hero__image" fetchPriority="high" src={asset('/Images/Home/hero-model.png')} />
        </div>
        <div className="home-hero__content">
          <span className="eyebrow">THE NOVA EDIT · NEW SEASON</span>
          <h1 id="hero-title">More than clothes.<br /><span>Made for your everyday.</span></h1>
          <p>Discover modern, minimal pieces designed to move with you, feel comfortable, and become part of your everyday story.</p>
          <div className="home-hero__actions">
            <Link className="button button--light" to="/collection">Explore Collections <IconArrowUpRight size={17} /></Link>
            <Link className="button button--rose" to="/shop">Shop Now <IconArrowRight size={17} /></Link>
          </div>
          <div className="home-hero__note">Thoughtfully chosen. Effortlessly worn.</div>
        </div>
        <span aria-hidden="true" className="home-hero__stamp">NOVA · EST. 2026</span>
      </section>

      <section aria-labelledby="bestsellers-title" className="page-width section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE PIECES YOU LOVE</span>
            <h2 id="bestsellers-title">Best Sellers</h2>
            <p>Our most-loved pieces, chosen for everyday style and comfort.</p>
          </div>
          <div className="slider-controls">
            <button aria-label="Previous products" className="slider-arrow" onClick={() => slider.current?.prev()} type="button">←</button>
            <button aria-label="Next products" className="slider-arrow" onClick={() => slider.current?.next()} type="button">→</button>
            <Link className="text-link" to="/shop">View all <IconArrowUpRight size={16} /></Link>
          </div>
        </div>
        <div className="keen-slider product-rail" ref={sliderRef}>
          {featuredProducts.map((product) => (
            <div className="keen-slider__slide" key={product.id}><ProductCard product={product} /></div>
          ))}
        </div>
      </section>

      <section aria-labelledby="collections-title" className="page-width collection-showcase section-block">
        <div className="collection-showcase__intro">
          <span className="eyebrow">CURATED FOR YOU</span>
          <h2 id="collections-title">Find Your<br />Style</h2>
          <p>Explore pieces designed for every side of your everyday style.</p>
          <Link className="text-link" to="/collection">View All Collections <IconArrowRight size={18} /></Link>
        </div>
        <div className="collection-showcase__grid">
          {collectionCards.map((collection) => (
            <Link className="collection-tile" key={collection.name} to={'/collection?category=' + collection.category}>
              <div className="collection-tile__image">
                <img alt={collection.name + ' collection'} loading="lazy" src={collection.image} />
                <span className="collection-tile__arrow"><IconArrowUpRight size={20} /></span>
              </div>
              <span className="collection-tile__name">{collection.name}</span>
              <span className="collection-tile__description">{collection.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="NOVA shopping benefits" className="page-width feature-strip">
        {storeFeatures.map(({ title, Icon, description }) => (
          <div className="feature-card" key={title}>
            <Icon aria-hidden="true" size={29} stroke={1.35} />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="about-title" className="page-width about-story" id="about">
        <div className="about-story__image">
          <img alt="NOVA's neutral, timeless fashion direction" loading="lazy" src={asset('/Images/Home/hero-model.png')} />
          <span className="about-story__seal">N<br />O<br />V<br />A</span>
        </div>
        <div className="about-story__copy">
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <h2 id="about-title">Pieces made to move with your everyday life.</h2>
          <p>Minimal pieces designed for comfort, simplicity, and timeless style — made to move with your everyday life. At NOVA, we believe the best wardrobe is the one that feels like you.</p>
          <Link className="text-link" to="/collection">Discover the NOVA point of view <IconArrowRight size={18} /></Link>
        </div>
      </section>

      <section aria-labelledby="newsletter-title" className="page-width newsletter">
        <div className="newsletter__art"><img alt="" loading="lazy" src={asset('/Images/Design/06891.png')} /></div>
        <div className="newsletter__content">
          <span className="eyebrow">NEWSLETTER</span>
          <h2 id="newsletter-title">Stay connected with NOVA</h2>
          <p>Get a note when something new arrives.</p>
          <form className="newsletter__form" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
            <input autoComplete="email" id="newsletter-email" onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required type="email" value={email} />
            <button aria-label="Subscribe to newsletter" className="newsletter__submit" type="submit"><IconArrowRight size={22} /></button>
          </form>
          <p aria-live="polite" className="newsletter__message">{newsletterMessage}</p>
        </div>
      </section>
    </div>
  )
}
