import HeroButton from './HeroButton'

const heroClassName =
  'relative left-1/2 aspect-[1440/586] w-screen max-w-[1440px] -translate-x-1/2 overflow-hidden bg-[#e8b8be] max-lg:aspect-auto max-lg:h-[min(164.571429vw,576px)]'

export default function Hero() {
  return (
    <section aria-label="Nova's everyday collection" className={heroClassName}>
      <div className="@container relative mx-auto h-full w-full max-w-360 max-lg:max-w-87.5">
        <div
          aria-hidden="true"
          className="absolute top-0 left-[11.666667%] h-full w-[31.875%] rounded-t-full bg-[#f8f2ea] max-lg:hidden"
        />

        <img
          alt="Model wearing a neutral tailored outfit"
          className="pointer-events-none absolute top-[-12.457%] left-[9.930556%] h-[120.648%] w-[35.416667%] object-cover max-lg:top-[52cqw] max-lg:left-[-15.428571cqw] max-lg:h-[112.571429cqw] max-lg:w-[81.142857cqw]"
          src="/Images/Home/hero-model.png"
        />

        <div className="absolute top-[19.453925%] left-[53.402778%] flex w-[32.083333%] flex-col gap-10 max-lg:hidden">
          <h1 className="font-cormorant text-[clamp(32px,3.333333vw,48px)] leading-[1.166667] font-medium text-[#1c1c1c]">
            More than clothes.
            <br />
            <span className="inline-block pl-[0.285714em]">Made for your everyday.</span>
          </h1>
          <p className="w-[86.580087%] font-inter text-[clamp(14px,1.111111vw,16px)] leading-loose text-black">
            Discover modern, minimal pieces designed to move with you, feel
            comfortable, and become part of your everyday story.
          </p>
          <div className="flex items-center gap-6 min-[1024px]:max-[1100px]:-mt-5">
            <HeroButton to="/collection" variant="secondary">
              Explore Collections
            </HeroButton>
            <HeroButton to="/shop" variant="primary">
              Shop Now
            </HeroButton>
          </div>
        </div>

        <h1 className="absolute top-[6.875%] left-[7.428571%] hidden w-[84.857143%] font-cormorant text-[28px] leading-8.5 font-medium text-[#1c1c1c] max-lg:block">
          More than clothes.
          <br />
          <span className="inline-block pl-[0.285714em]">Made for your everyday.</span>
        </h1>
        <p className="absolute top-[20.78125%] left-[6%] hidden w-[88%] font-inter text-[12px] leading-4.5 text-black max-lg:block">
          Discover modern, minimal pieces designed to move with you, feel
          comfortable, and become part of your everyday story.
        </p>
        <div className="hidden max-lg:block">
          <HeroButton to="/collection" variant="secondary">
            Explore Collections
          </HeroButton>
          <HeroButton to="/shop" variant="primary">
            Shop Now
          </HeroButton>
        </div>
      </div>
    </section>
  )
}
