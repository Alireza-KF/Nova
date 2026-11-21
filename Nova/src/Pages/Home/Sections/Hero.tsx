import { useEffect, useState } from 'react'
import HeroButton from './HeroButton'

type HeroContent = {
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
}

const homePageClassName =
  'ml-[calc(50%_-_50vw)] mt-[43px] w-screen bg-[#e8b8be] max-lg:mt-[-7px] max-lg:bg-transparent'
const homeHeroClassName =
  'relative mx-auto h-[min(586px,40.694444vw)] w-full max-w-[1440px] overflow-hidden bg-[#e8b8be] max-lg:aspect-[350/576] max-lg:h-auto max-lg:w-[min(350px,calc(100vw_-_40px))] max-lg:[container-type:inline-size]'
const homeHeroStateClassName =
  'grid box-border place-items-center p-6 font-inter text-center text-[#1c1c1c]'
const heroModelClassName =
  'pointer-events-none absolute top-[-12.457338%] left-[9.930556%] z-[1] block h-[120.648464%] w-[35.416667%] object-cover max-lg:top-[52cqw] max-lg:left-[-15.428571cqw] max-lg:h-[112.571429cqw] max-lg:w-[81.142857cqw]'
const heroTitleClassName =
  'm-0 font-cormorant text-[clamp(34px,3.333333vw,48px)] leading-[1.166667] font-medium text-[#1c1c1c] max-lg:absolute max-lg:top-[12.571429cqw] max-lg:left-[7.428571cqw] max-lg:w-[84.857143cqw] max-lg:text-[8cqw] max-lg:leading-[9.714286cqw]'
const heroDescriptionClassName =
  'm-0 w-[86.580087%] font-inter text-[clamp(12px,1.111111vw,16px)] leading-[2] font-normal text-[#1c1c1c] max-lg:absolute max-lg:top-[38cqw] max-lg:left-[6cqw] max-lg:w-[88cqw] max-lg:text-[3.428571cqw] max-lg:leading-[5.142857cqw]'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseHeroContent(payload: unknown): HeroContent {
  if (!isRecord(payload) || !isRecord(payload.hero)) {
    throw new Error('The /home response is missing hero content.')
  }

  const { title, subtitle, description, image, imageAlt } = payload.hero
  if (
    typeof title !== 'string' ||
    !title.trim() ||
    typeof subtitle !== 'string' ||
    !subtitle.trim() ||
    typeof description !== 'string' ||
    !description.trim() ||
    typeof image !== 'string' ||
    !image.startsWith('/') ||
    image.startsWith('//') ||
    typeof imageAlt !== 'string' ||
    !imageAlt.trim()
  ) {
    throw new Error('The /home response contains invalid hero content.')
  }

  return {
    title,
    subtitle,
    description,
    image,
    imageAlt,
  }
}

async function fetchHeroContent(signal: AbortSignal): Promise<HeroContent> {
  const response = await fetch('http://localhost:3001/home', { signal })
  if (!response.ok) {
    throw new Error(`The /home request failed with status ${response.status}.`)
  }

  return parseHeroContent(await response.json())
}

function Hero() {
  const [hero, setHero] = useState<HeroContent | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadHero() {
      setIsLoading(true)
      setError(null)
      setHero(null)

      try {
        const content = await fetchHeroContent(controller.signal)
        if (!controller.signal.aborted) {
          setHero(content)
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : 'An unexpected error occurred.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadHero()
    return () => controller.abort()
  }, [retryCount])

  if (isLoading) {
    return (
      <div className={homePageClassName}>
        <section
          aria-busy="true"
          className={`${homeHeroClassName} ${homeHeroStateClassName}`}
        >
          <p className="m-0" role="status">
            Loading home content…
          </p>
        </section>
      </div>
    )
  }

  if (error || !hero) {
    return (
      <div className={homePageClassName}>
        <section className={`${homeHeroClassName} ${homeHeroStateClassName}`}>
          <div className="grid justify-items-center gap-4">
            <p className="m-0" role="alert">
              Unable to load the home hero: {error ?? 'No hero data was returned.'}
            </p>
            <button
              className="cursor-pointer rounded-xl border-0 bg-[#b76e79] px-5 py-[10px] font-inter text-white"
              onClick={() => setRetryCount((count) => count + 1)}
              type="button"
            >
              Try again
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className={homePageClassName}>
      <section aria-labelledby="home-hero-title" className={homeHeroClassName}>
        <div
          aria-hidden="true"
          className="absolute top-0 left-[11.666667%] h-full w-[31.875%] rounded-t-[566px] bg-[#f8f2ea] max-lg:hidden"
        />
        <img
          alt={hero.imageAlt}
          className={heroModelClassName}
          height="707"
          onError={() => {
            setHero(null)
            setError('The hero image could not be loaded.')
          }}
          src={hero.image}
          width="510"
        />
        <div className="absolute top-[19.453925%] left-[53.402778%] z-[2] flex w-[32.083333%] flex-col gap-[2.777778vw] max-lg:contents">
          <h1 className={heroTitleClassName} id="home-hero-title">
            <span className="block">{hero.title}</span>
            <span className="block pl-2 max-lg:pl-[2.285714cqw]">{hero.subtitle}</span>
          </h1>
          <p className={heroDescriptionClassName}>{hero.description}</p>
          <div className="flex items-center gap-[1.666667vw] max-lg:contents">
            <HeroButton to="/collection" variant="secondary">
              Explore Collections
            </HeroButton>
            <HeroButton to="/shop" variant="primary">
              Shop Now
            </HeroButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
