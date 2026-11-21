import { Link } from 'react-router-dom'

type HeroButtonProps = {
  children: string
  to: '/collection' | '/shop'
  variant: 'primary' | 'secondary'
}

const baseClassName =
  'box-border inline-flex h-[clamp(36px,3.055556vw,44px)] flex-none items-center justify-center rounded-[clamp(8px,0.833333vw,12px)] font-inter text-[clamp(12px,0.972222vw,14px)] leading-5 font-medium no-underline transition-[filter] whitespace-nowrap hover:brightness-[.96] max-lg:absolute max-lg:left-[48.285714cqw] max-lg:h-[12.571429cqw] max-lg:rounded-[3.428571cqw] max-lg:text-[4cqw] max-lg:leading-[5.714286cqw]'
const variantClassNames = {
  primary:
    'w-[8.125vw] max-w-[117px] min-w-[94px] bg-[#b76e79] px-4 text-white max-lg:top-[78cqw] max-lg:w-[33.428571cqw] max-lg:max-w-none max-lg:min-w-0 max-lg:px-[6.857143cqw]',
  secondary:
    'w-[11.111111vw] max-w-[160px] min-w-[128px] bg-white px-5 text-[#b76e79] max-lg:top-[59.428571cqw] max-lg:w-[45.714286cqw] max-lg:max-w-none max-lg:min-w-0 max-lg:px-[5.714286cqw]',
}

function HeroButton({ children, to, variant }: HeroButtonProps) {
  return (
    <Link className={`${baseClassName} ${variantClassNames[variant]}`} to={to}>
      {children}
    </Link>
  )
}

export default HeroButton
