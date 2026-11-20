import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Nova</p>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Home</h1>
      <p className="max-w-xl text-lg text-slate-600">
        Welcome to Nova. Browse the shop or explore the featured product.
      </p>
      <Link
        className="inline-flex rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
        to="/shop"
      >
        Browse the shop
      </Link>
    </section>
  )
}

export default HomePage
