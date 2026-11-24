import { Link } from 'react-router-dom'

const collectionCategories = [
  {
    id: 'tops',
    name: 'Tops',
    image: '/Images/Collection/tops.png',
    alt: 'Neutral everyday tops',
  },
  {
    id: 'dresses',
    name: 'Dresses',
    image: '/Images/Collection/dresses.png',
    alt: 'Minimal dresses for everyday style',
  },
  {
    id: 'bottoms',
    name: 'Bottoms',
    image: '/Images/Collection/bottoms.png',
    alt: 'Relaxed everyday bottoms',
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    image: '/Images/Collection/outerwear.png',
    alt: 'Timeless neutral outerwear',
  },
]

function CollectionsSection() {
  return (
    <section
      aria-labelledby="collections-title"
      className="relative left-1/2 mt-[50px] w-[calc(100%+3rem)] -translate-x-1/2 bg-[#f8f2ea] xl:min-h-[512px] xl:w-[calc(100%+11rem)] xl:max-w-[1280px] xl:border xl:border-[#e5ddd5] xl:shadow-[0_4px_8px_3px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.3)]"
    >
      <p className="px-[7px] font-inter text-base leading-8 text-[#1c1c1c] xl:absolute xl:top-[80px] xl:left-[80px] xl:px-0">
        Collections
      </p>
      <h2
        className="-mt-1 px-[7px] font-cormorant text-[28px] leading-[56px] font-medium text-[#1c1c1c] xl:absolute xl:top-[138px] xl:left-[80px] xl:mt-0 xl:px-0 xl:text-[65px]"
        id="collections-title"
      >
        Find Your<span className="xl:block"> Style</span>
      </h2>
      <p className="mt-[-3px] px-[7px] font-inter text-xs leading-[18px] text-[#1c1c1c] xl:absolute xl:top-[270px] xl:left-[80px] xl:mt-0 xl:px-0 xl:text-base xl:leading-8">
        <span className="block">Explore pieces designed for every side</span>
        <span className="block">of your everyday style.</span>
      </p>

      <div
        className="mt-6 grid grid-cols-2 gap-x-7 gap-y-4 xl:absolute xl:top-[147px] xl:right-[79px] xl:left-[418px] xl:mt-0 xl:flex xl:justify-between xl:gap-0"
        id="collection-categories"
      >
        {collectionCategories.map((category) => (
          <figure className="min-w-0" key={category.id}>
            <div className="aspect-[160/205] overflow-hidden rounded-lg xl:h-[205px] xl:w-[160px]">
              <img
                alt={category.alt}
                className="h-full w-full rounded-lg object-cover"
                src={category.image}
              />
            </div>
            <figcaption className="mt-1 text-center font-inter text-sm leading-5 font-medium text-[#1c1c1c] xl:mt-3">
              {category.name}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-[18px] flex items-center justify-center gap-1 xl:absolute xl:top-[366px] xl:left-[80px] xl:mt-0 xl:justify-start">
        <img
          alt=""
          aria-hidden="true"
          className="hidden h-[2px] w-[55.5px] xl:block"
          src="/Images/Collection/collection-divider.svg"
        />
        <Link
          className="font-inter text-sm leading-5 font-medium text-[#b76e79] transition-opacity hover:opacity-80"
          to="/collection"
        >
          View All Collections
        </Link>
        <img
          alt=""
          aria-hidden="true"
          className="h-6 w-[41px]"
          src="/Images/Collection/arrow-narrow-right.svg"
        />
      </div>
    </section>
  )
}

export default CollectionsSection
