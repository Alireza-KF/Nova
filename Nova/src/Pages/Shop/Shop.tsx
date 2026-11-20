import { Link } from 'react-router-dom'

function ShopPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Shop</h1>
      <p className="text-slate-600">Browse products available in the shop.</p>
      <Link className="font-medium text-indigo-600 hover:text-indigo-800" to="/product/sample-product">
        View a product
      </Link>
    </section>
  )
}

export default ShopPage
