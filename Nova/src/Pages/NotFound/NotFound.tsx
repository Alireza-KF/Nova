import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Page not found</h1>
      <Link className="font-medium text-indigo-600 hover:text-indigo-800" to="/">
        Return home
      </Link>
    </section>
  )
}

export default NotFoundPage
