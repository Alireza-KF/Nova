import { Link } from 'react-router-dom'
import { tw } from '../../styles/tw'

export default function NotFoundPage() {
  return (
    <section className={[tw.page, tw.emptyState, tw.notFound].join(' ')}>
      <span className={tw.eyebrow}>A LITTLE DETOUR</span>
      <h1 className={tw.emptyTitle}>That page has wandered off.</h1>
      <p className={tw.emptyDescription}>The link may be old, or the page may have moved.</p>
      <Link className={[tw.button, tw.buttonRose].join(' ')} to="/">Return home</Link>
    </section>
  )
}
