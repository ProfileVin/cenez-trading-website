import { Link } from 'react-router-dom'
import type { Product } from '../lib/products'
import { track } from '../lib/track'
import { ProductGallery } from './ProductGallery'

export function Hero({ product }: { product: Product }) {
  return (
    <section id="overview" aria-labelledby="hero-title" className="wrap pt-10 pb-16 md:pt-12">
      <nav aria-label="Breadcrumb" className="font-mono text-[12.5px] text-muted">
        <Link to="/#models" className="hover:text-ink">
          All models
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <p className="label mt-8 flex items-center gap-3 text-muted">
        <span>{product.category}</span>
        <span aria-hidden="true" className="h-px w-8 bg-muted" />
        <span>{product.sku}</span>
      </p>

      <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <h1 id="hero-title" tabIndex={-1} className="h1 text-balance focus:outline-none">
            {product.headline}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[17px] text-muted">{product.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
            {product.highlights.map((h) => (
              <li key={h} className="inline-flex items-center rounded-sm border border-line bg-surface px-3 py-1 text-[14px]">
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <p className="label text-muted">Price</p>
            <p className="display mt-1 text-[32px]">{product.price}</p>
            <p className="mt-1 text-[14px] text-muted">{product.priceNote}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={{ search: '', hash: '#quote' }}
              onClick={() => track('quote_click', { location: 'hero', product: product.id })}
              className="btn-primary"
            >
              Request a quote <span aria-hidden="true">→</span>
            </Link>
            {product.customizable && (
              <Link
                to={{ search: '?type=customize', hash: '#quote' }}
                onClick={() => track('quote_click', { location: 'hero-customize', product: product.id })}
                className="btn-secondary"
              >
                Customize this model
              </Link>
            )}
          </div>
          {product.customizable && (
            <p className="mt-4 text-[14px] text-muted">Need it longer, shallower or in another color? We mold it to your size.</p>
          )}
        </div>

        <ProductGallery images={product.images} status={product.status} />
      </div>
    </section>
  )
}
