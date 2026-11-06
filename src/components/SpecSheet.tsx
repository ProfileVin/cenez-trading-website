import type { Product } from '../lib/products'
import { isPlaceholder } from '../lib/products'
import { gelcoatColors } from '../lib/site'

export function SpecSheet({ product }: { product: Product }) {
  return (
    <section id="specs" aria-labelledby="specs-heading" className="section bg-ink text-white">
      <div className="wrap">
        <p className="label text-[#8FB5F2]">Specification sheet</p>
        <h2 id="specs-heading" className="h2 mt-4">
          {product.name}
        </h2>
        <p className="mt-3 font-mono text-[13px] text-white/60">{product.sku}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[15px]">
          <span className="label text-white/60">Shown in</span>
          {product.colors.map((name) => {
            const hex = gelcoatColors.find((c) => c.name === name)?.hex ?? '#ccc'
            return (
              <span key={name} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-5 rounded-full border border-white/30" style={{ background: hex }} />
                {name}
              </span>
            )
          })}
          {product.customizable && <span className="text-white/60">Other gelcoat colors on request.</span>}
        </div>

        <dl className="mt-12 grid gap-x-10 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {product.specs.map((s) => (
            <div key={s.label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/15 py-4">
              <dt className="font-mono text-[12.5px] text-white/60">{s.label}</dt>
              <dd className={`text-[15px] font-medium ${isPlaceholder(s.value) ? 'text-[#F4D3D8]' : ''}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
