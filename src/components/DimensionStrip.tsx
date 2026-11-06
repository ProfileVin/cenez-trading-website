import type { Product } from '../lib/products'
import { isPlaceholder } from '../lib/products'

export function DimensionStrip({ product }: { product: Product }) {
  return (
    <section aria-label="Key dimensions" className="border-y border-line bg-surface">
      <dl className="wrap grid grid-cols-2 md:grid-cols-4">
        {product.facts.map((f, i) => (
          <div
            key={f.label}
            className={`py-8 md:px-8 ${i % 2 ? 'pl-5 border-l border-line' : ''} ${i > 0 ? 'md:border-l md:border-line' : 'md:pl-0'} ${i > 1 ? 'border-t border-line md:border-t-0' : ''}`}
          >
            <dt className="label text-muted">{f.label}</dt>
            <dd
              className={`display mt-2 whitespace-nowrap ${isPlaceholder(f.value) ? 'text-[clamp(18px,2vw,26px)]' : 'text-[clamp(28px,3vw,40px)]'}`}
            >
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
