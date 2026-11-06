import { useSearchParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { QuoteForm } from '../components/QuoteForm'
import { getProduct, products } from '../lib/products'
import { parseQuoteType } from '../lib/quote'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** `/quote?product=id&type=customize`: standalone quote form, e.g. for ads or chat links. */
export function QuotePage() {
  const [params] = useSearchParams()
  const selected = getProduct(params.get('product'))
  useDocumentMeta('Request a quote', 'Get a price for a fiberglass pool shell, standard or custom-made, delivered to your site.')

  return (
    <>
      <Header nav={[{ href: '/#models', label: 'All models' }]} />
      <main id="main">
        <QuoteForm products={products} selectedId={selected?.id} type={parseQuoteType(params.get('type'))} />
      </main>
      <Footer />
    </>
  )
}
