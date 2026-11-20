import { useParams } from 'react-router-dom'

function ProductPage() {
  const { productId } = useParams()

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Product</h1>
      <p className="text-slate-600">Product ID: {productId}</p>
    </section>
  )
}

export default ProductPage
