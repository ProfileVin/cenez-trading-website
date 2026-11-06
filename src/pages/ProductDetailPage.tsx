import { useParams, useSearchParams } from 'react-router-dom'
import { DimensionStrip } from '../components/DimensionStrip'
import { Footer } from '../components/Footer'
import type { NavItem } from '../components/Header'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { ModelsGrid } from '../components/ModelsGrid'
import { PlanView } from '../components/PlanView'
import { QuoteForm } from '../components/QuoteForm'
import { SkipLink } from '../components/SkipLink'
import { SpecSheet } from '../components/SpecSheet'
import { getProduct, products } from '../lib/products'
import { parseQuoteType } from '../lib/quote'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import { NotFound } from './NotFound'

const productNav: NavItem[] = [
  { href: '#plan', label: 'Features' },
  { href: '#specs', label: 'Specifications' },
  { href: '/#models', label: 'All models' },
  { href: '/#projects', label: 'Projects' },
]

/** `/products/:id`: one model with gallery, plan, specs and a preselected quote form. */
export function ProductDetailPage() {
  const { id } = useParams()
  const product = getProduct(id)
  if (!product) return <NotFound message="We couldn't find that model." />
  return <ProductDetail key={product.id} productId={product.id} />
}

function ProductDetail({ productId }: { productId: string }) {
  const product = getProduct(productId)!
  const [params] = useSearchParams()
  useDocumentMeta(product.name, product.tagline, product)

  return (
    <>
      <SkipLink />
      <Header nav={productNav} />
      <main id="main">
        <Hero product={product} />
        <DimensionStrip product={product} />
        <PlanView product={product} />
        <SpecSheet product={product} />
        <ModelsGrid products={products.filter((p) => p.id !== product.id)} eyebrow="More models" title="Other pool shells" />
        <QuoteForm products={products} selectedId={product.id} type={parseQuoteType(params.get('type'))} />
      </main>
      <Footer />
    </>
  )
}
