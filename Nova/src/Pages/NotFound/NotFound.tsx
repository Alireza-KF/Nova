import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="page-width empty-state not-found-page">
      <span className="eyebrow">A LITTLE DETOUR</span>
      <h1>That page has wandered off.</h1>
      <p>The link may be old, or the page may have moved.</p>
      <Link className="button button--rose" to="/">Return home</Link>
    </section>
  )
}
