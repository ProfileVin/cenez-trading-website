import { useEffect } from 'react'
import { site } from './site'
import type { Product } from './products'
import { isPlaceholder } from './products'

/** Sets title, description and Product JSON-LD for the current view. */
export function useDocumentMeta(title: string, description: string, product?: Product) {
  useEffect(() => {
    document.title = `${title} | ${site.brand}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)

    if (!product) return
    const ld: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.sku,
      category: product.category,
      description: product.tagline,
      image: product.images.map((i) => new URL(i.src, window.location.origin).href),
      brand: { '@type': 'Brand', name: site.brand },
    }
    // Only advertise an offer once the client gives a real price.
    if (!isPlaceholder(product.price)) {
      ld.offers = { '@type': 'Offer', price: product.price.replace(/[^\d.]/g, ''), priceCurrency: 'PHP' }
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(ld)
    document.head.appendChild(script)
    return () => script.remove()
  }, [title, description, product])
}
