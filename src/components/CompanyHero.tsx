import { Link } from 'react-router-dom'
import { site } from '../lib/site'
import { track } from '../lib/track'
import { ProductImage } from './ProductImage'

const values = [
  { label: 'Construction', value: 'One-piece FRP shells' },
  { label: 'Sizing', value: 'Made to your size' },
  { label: 'Service', value: 'Delivered & installed' },
  { label: 'Finish', value: 'Choice of gelcoat colors' },
]

export function CompanyHero() {
  return (
    <>
      <section aria-labelledby="hero-title" className="wrap pt-14 pb-16 md:pt-16">
        <p className="label flex items-center gap-3 text-muted">
          <span>{site.brand}</span>
          <span aria-hidden="true" className="h-px w-8 bg-muted" />
          <span>Fiberglass pools</span>
        </p>

        <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <h1 id="hero-title" className="h1 text-balance">
              Fiberglass pools, built to your size.
            </h1>
            <p className="mt-6 max-w-[50ch] text-[17px] text-muted">
              We mold one-piece fiberglass pool shells in our own workshop, from ready models to fully custom shapes,
              then deliver and set them into your ground.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#models" className="btn-primary">
                Browse models <span aria-hidden="true">→</span>
              </a>
              <Link
                to={{ search: '?type=custom', hash: '#quote' }}
                onClick={() => track('quote_click', { location: 'home-hero-custom' })}
                className="btn-secondary"
              >
                Request a custom quote
              </Link>
            </div>
          </div>

          <figure>
            <ProductImage
              src="/products/2.jpg"
              alt="Blue fiberglass pool with a built-in spa section being set into a hillside site at sunset, with palm trees and a mountain behind."
            />
            <figcaption className="mt-3 font-mono text-[12px] text-muted">Pool with built-in spa, hillside installation</figcaption>
          </figure>
        </div>
      </section>

      <section aria-label="Why fiberglass" className="border-y border-line bg-surface">
        <dl className="wrap grid grid-cols-2 md:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v.label}
              className={`py-7 md:px-8 ${i % 2 ? 'border-l border-line pl-5' : ''} ${i > 0 ? 'md:border-l md:border-line' : 'md:pl-0'} ${i > 1 ? 'border-t border-line md:border-t-0' : ''}`}
            >
              <dt className="label text-muted">{v.label}</dt>
              <dd className="display mt-2 text-[clamp(18px,1.8vw,24px)] leading-tight">{v.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
