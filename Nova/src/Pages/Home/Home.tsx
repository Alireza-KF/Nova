import { useState, type FormEvent } from 'react'
import { IconArrowRight, IconArrowUpRight, IconDiamond, IconHeart, IconLeaf, IconRefresh } from '@tabler/icons-react'
import { useKeenSlider } from 'keen-slider/react'
import { Link } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard'
import { featuredProducts } from '../../data/products'
import { asset } from '../../utils/assets'
import { tw } from '../../styles/tw'

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
    <div>
      <section aria-labelledby="hero-title" className={tw.homeHero}>
        <div className={tw.heroImageFrame}>
          <div aria-hidden="true" className={tw.heroArch} />
          <img alt="Model wearing a soft neutral everyday look" className={tw.heroImage} fetchPriority="high" src={asset('/Images/Home/hero-model.png')} />
        </div>
        <div className={tw.heroContent}>
          <span className={tw.eyebrow}>THE NOVA EDIT · NEW SEASON</span>
          <h1 className={tw.heroTitle} id="hero-title">More than clothes.<br /><span className={tw.heroTitleSecond}>Made for your everyday.</span></h1>
          <p className={tw.heroDescription}>Discover modern, minimal pieces designed to move with you, feel comfortable, and become part of your everyday story.</p>
          <div className={tw.heroActions}>
            <Link className={[tw.button, tw.buttonLight, tw.heroButton].join(' ')} to="/collection">Explore Collections <IconArrowUpRight size={17} /></Link>
            <Link className={[tw.button, tw.buttonRose, tw.heroButton].join(' ')} to="/shop">Shop Now <IconArrowRight size={17} /></Link>
          </div>
          <div className={tw.heroNote}>Thoughtfully chosen. Effortlessly worn.</div>
        </div>
        <span aria-hidden="true" className={tw.heroStamp}>NOVA · EST. 2026</span>
      </section>

      <section aria-labelledby="bestsellers-title" className={[tw.page, tw.section].join(' ')}>
        <div className={tw.sectionHeading}>
          <div>
            <span className={tw.eyebrow}>THE PIECES YOU LOVE</span>
            <h2 className={tw.sectionTitle} id="bestsellers-title">Best Sellers</h2>
            <p className={tw.sectionDescription}>Our most-loved pieces, chosen for everyday style and comfort.</p>
          </div>
          <div className={tw.sliderControls}>
            <button aria-label="Previous products" className={tw.sliderArrow} onClick={() => slider.current?.prev()} type="button">←</button>
            <button aria-label="Next products" className={tw.sliderArrow} onClick={() => slider.current?.next()} type="button">→</button>
            <Link className={[tw.textLink, 'max-[800px]:hidden'].join(' ')} to="/shop">View all <IconArrowUpRight size={16} /></Link>
          </div>
        </div>
        <div className={['keen-slider', tw.productRail].join(' ')} ref={sliderRef}>
          {featuredProducts.map((product) => (
            <div className={tw.productSlide} key={product.id}><ProductCard product={product} /></div>
          ))}
        </div>
      </section>

      <section aria-labelledby="collections-title" className={[tw.page, tw.collectionShowcase].join(' ')}>
        <div className={tw.collectionIntro}>
          <span className={[tw.eyebrow, tw.collectionIntroEyebrow].join(' ')}>CURATED FOR YOU</span>
          <h2 className={tw.collectionIntroTitle} id="collections-title">Find Your<br />Style</h2>
          <p className={tw.collectionIntroDescription}>Explore pieces designed for every side of your everyday style.</p>
          <Link className={[tw.textLink, tw.collectionIntroLink].join(' ')} to="/collection">View All Collections <IconArrowRight size={18} /></Link>
        </div>
        <div className={tw.collectionShowcaseGrid}>
          {collectionCards.map((collection) => (
            <Link className={tw.collectionTile} key={collection.name} to={'/collection?category=' + collection.category}>
              <div className={tw.collectionTileImage}>
                <img alt={collection.name + ' collection'} className={tw.collectionTilePhoto} loading="lazy" src={collection.image} />
                <span className={tw.collectionTileArrow}><IconArrowUpRight size={20} /></span>
              </div>
              <span className={tw.collectionTileName}>{collection.name}</span>
              <span className={tw.collectionTileDescription}>{collection.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="NOVA shopping benefits" className={[tw.page, tw.featureStrip].join(' ')}>
        {storeFeatures.map(({ title, Icon, description }) => (
          <div className={tw.featureCard} key={title}>
            <Icon aria-hidden="true" className={tw.featureIcon} size={29} stroke={1.35} />
            <h3 className={tw.featureTitle}>{title}</h3>
            <p className={tw.featureDescription}>{description}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="about-title" className={[tw.page, tw.aboutStory].join(' ')} id="about">
        <div className={tw.aboutImage}>
          <img alt="NOVA's neutral, timeless fashion direction" className={tw.aboutImagePhoto} loading="lazy" src={asset('/Images/Home/hero-model.png')} />
          <span className={tw.aboutSeal}>N<br />O<br />V<br />A</span>
        </div>
        <div>
          <span className={[tw.eyebrow, tw.aboutCopyEyebrow].join(' ')}>A LITTLE ABOUT US</span>
          <h2 className={tw.aboutCopyTitle} id="about-title">Pieces made to move with your everyday life.</h2>
          <p className={tw.aboutCopyDescription}>Minimal pieces designed for comfort, simplicity, and timeless style — made to move with your everyday life. At NOVA, we believe the best wardrobe is the one that feels like you.</p>
          <Link className={[tw.textLink, tw.aboutCopyLink].join(' ')} to="/collection">Discover the NOVA point of view <IconArrowRight size={18} /></Link>
        </div>
      </section>

      <section aria-labelledby="newsletter-title" className={[tw.page, tw.newsletter].join(' ')}>
        <div className={tw.newsletterArt}><img alt="" className="h-full w-full object-cover" loading="lazy" src={asset('/Images/Design/06891.png')} /></div>
        <div className={tw.newsletterContent}>
          <span className={tw.eyebrow}>NEWSLETTER</span>
          <h2 className={tw.newsletterTitle} id="newsletter-title">Stay connected with NOVA</h2>
          <p className={tw.newsletterDescription}>Get a note when something new arrives.</p>
          <form className={tw.newsletterForm} onSubmit={subscribe}>
            <label className={tw.srOnly} htmlFor="newsletter-email">Your email address</label>
            <input autoComplete="email" className={tw.newsletterInput} id="newsletter-email" onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required type="email" value={email} />
            <button aria-label="Subscribe to newsletter" className={tw.newsletterSubmit} type="submit"><IconArrowRight size={22} /></button>
          </form>
          <p aria-live="polite" className={tw.newsletterMessage}>{newsletterMessage}</p>
        </div>
      </section>
    </div>
  )
}
