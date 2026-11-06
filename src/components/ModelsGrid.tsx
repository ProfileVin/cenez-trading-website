import { Link } from 'react-router-dom'
import type { Product } from '../lib/products'
import { isPlaceholder } from '../lib/products'
import { track } from '../lib/track'
import { ProductImage } from './ProductImage'

type Props = {
  products: Product[]
  eyebrow?: string
  title?: string
  intro?: string
}

function sizeLabel(p: Product) {
  const dims = [p.length, p.width, p.depth]
  return dims.some(isPlaceholder) ? 'Size on request' : `${p.length} × ${p.width} × ${p.depth} deep`
}

export function ModelsGrid({ products, eyebrow = 'Models', title = 'Our pool shells', intro }: Props) {
  if (products.length === 0) return null

  return (
    <section id="models" aria-labelledby="models-heading" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="models-heading" className="h2 mt-4">
              {title}
            </h2>
            {intro && <p className="mt-4 max-w-[58ch] text-muted">{intro}</p>}
          </div>
          <p className="label text-muted">
            {products.length} {products.length === 1 ? 'model' : 'models'}
          </p>
        </div>

        <ul className="mt-12 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {products.map((p) => (
            <li key={p.id} className="group relative flex flex-col rounded-sm border border-line bg-surface p-4 hover:border-cobalt">
              <ProductImage src={p.images[0]?.src ?? ''} alt={p.images[0]?.alt ?? p.name} />
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="label text-cobalt">{p.category}</p>
                {p.customizable && <span className="label rounded-sm bg-dusk px-2 py-0.5 text-[11px]">Customizable</span>}
              </div>
              <h3 className="h3 mt-2">
                {/* Stretched link: the whole card is clickable, one link for screen readers. */}
                <Link
                  to={`/products/${p.id}`}
                  onClick={() => track('catalog_view_product', { product: p.id })}
                  className="after:absolute after:inset-0 focus:outline-none"
                >
                  {p.name}
                </Link>
              </h3>
              <p className="mt-2 font-mono text-[12.5px] text-muted">{sizeLabel(p)}</p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <span className="display text-[20px]">{p.price}</span>
                <span aria-hidden="true" className="text-[15px] font-semibold text-cobalt-deep group-hover:underline">
                  View model →
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
