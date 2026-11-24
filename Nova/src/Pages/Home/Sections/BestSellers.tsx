const bestSellerProducts = [
  {
    id: 'soft-knit-sweater',
    name: 'Soft Knit Sweater',
    image: '/Images/Home/BestSellers/soft-knit-sweater.png',
    price: '$48',
    mobileSwatches: '/Images/Home/BestSellers/swatches-sweater-mobile.svg',
    desktopSwatches: '/Images/Home/BestSellers/swatches-sweater-desktop.svg',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'satin-midi-dress',
    name: 'Satin Midi Dress',
    image: '/Images/Home/BestSellers/satin-midi-dress.png',
    price: '$72',
    mobileSwatches: '/Images/Home/BestSellers/swatches-dress-mobile.svg',
    desktopSwatches: '/Images/Home/BestSellers/swatches-dress-desktop.svg',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'relaxed-wide-leg-pants',
    name: 'Relaxed Wide-Leg Pants',
    image: '/Images/Home/BestSellers/wide-leg-pants.png',
    price: '$56',
    mobileSwatches: '/Images/Home/BestSellers/swatches-pants-mobile.svg',
    desktopSwatches: '/Images/Home/BestSellers/swatches-pants-desktop.svg',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'minimal-blazer',
    name: 'Minimal Blazer',
    image: '/Images/Home/BestSellers/minimal-blazer.png',
    price: '$84',
    mobileSwatches: '/Images/Home/BestSellers/swatches-blazer-mobile.svg',
    desktopSwatches: '/Images/Home/BestSellers/swatches-blazer-desktop.svg',
    sizes: ['S', 'M', 'L'],
  },
]

function BestSellerProductCard({
  product,
}: {
  product: (typeof bestSellerProducts)[number]
}) {
  return (
    <article className="relative h-[270px] overflow-hidden rounded-xl border-2 border-[#e5ddd5] bg-white lg:h-[440px]">
      <div className="absolute top-[10px] left-1/2 h-[145px] w-[68.5%] -translate-x-1/2 overflow-hidden rounded-lg bg-[#f8f2ea] lg:top-[10px] lg:right-[21px] lg:left-[16px] lg:h-[267px] lg:w-auto lg:translate-x-0 lg:rounded-t-xl">
        <img
          alt={product.name}
          className="h-full w-full object-cover"
          src={product.image}
        />
        <img
          alt="Add to wishlist"
          className="absolute top-0 right-[5px] h-[15px] w-[15px] lg:hidden"
          src="/Images/Home/BestSellers/heart-mobile.svg"
        />
        <img
          alt="Add to wishlist"
          className="absolute top-[8px] right-[8px] hidden h-6 w-6 lg:block"
          src="/Images/Home/BestSellers/heart.svg"
        />
      </div>

      <h3 className="absolute top-[163px] left-[9px] max-w-[calc(100%-18px)] truncate font-inter text-[10px] leading-[14px] text-black lg:top-[287px] lg:left-[16px] lg:text-base lg:leading-8">
        {product.name}
      </h3>

      <img
        alt="Available colors"
        className="absolute top-[191px] left-[9px] h-[10px] w-10 lg:hidden"
        src={product.mobileSwatches}
      />
      <img
        alt="Available colors"
        className="absolute top-[349px] left-[16px] hidden h-4 w-16 lg:block"
        src={product.desktopSwatches}
      />

      <div
        aria-label="Available sizes"
        className="absolute top-[187px] right-[12px] flex gap-1 lg:top-[341px] lg:right-[27px] lg:gap-2"
      >
        {product.sizes.map((size) => (
          <span
            className="grid size-5 place-items-center rounded-lg border border-[#e5ddd5] bg-white font-inter text-xs leading-5 text-[#1c1c1c] lg:size-8 lg:text-sm"
            key={size}
          >
            {size}
          </span>
        ))}
      </div>

      <p className="absolute top-[213px] left-[9px] font-inter text-[11px] leading-8 text-[#1c1c1c] lg:top-[381px] lg:left-[26px] lg:text-base">
        {product.price}
      </p>

      <span
        aria-hidden="true"
        className="absolute top-[220px] right-[9px] grid size-6 place-items-center rounded-lg bg-[#b76e79] lg:top-[381px] lg:right-[21px] lg:size-11 lg:rounded-xl"
      >
        <img
          alt=""
          className="size-5 lg:size-5"
          src="/Images/Home/BestSellers/plus.svg"
        />
      </span>
    </article>
  )
}

export default function BestSellers() {
  return (
    <section
      aria-labelledby="best-sellers-heading"
      className="relative left-1/2 mt-[50px] w-[calc(100%+3rem)] max-w-[1280px] -translate-x-1/2 xl:w-[calc(100%+11rem)]"
    >
      <h2
        className="font-cormorant text-[40px] leading-12 font-medium text-[#b76e79]"
        id="best-sellers-heading"
      >
        Best Sellers
      </h2>
      <p className="mt-2 font-inter text-[10px] leading-[15px] text-black lg:mt-6 lg:text-base lg:leading-8">
        Our most-loved pieces, chosen for everyday style and comfort
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4 lg:gap-6">
        {bestSellerProducts.map((product) => (
          <BestSellerProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
