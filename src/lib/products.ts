// Product schema: spec §5, extended with a photo gallery, colors and customization.
// Each JSON file in src/content/products is one product; filename prefix ("01-") sets catalog order.
export type ProductImage = { src: string; alt: string; caption: string }

export type Product = {
  id: string
  sku: string
  name: string
  category: string
  headline: string
  tagline: string
  highlights: string[]
  images: ProductImage[] // first image is the cover
  status: string
  price: string
  priceNote: string
  length: string
  width: string
  depth: string
  hasPlan: boolean
  customizable: boolean
  colors: string[]
  facts: { label: string; value: string }[]
  features: { n: string; title: string; body: string }[]
  specs: { label: string; value: string }[]
}

const modules = import.meta.glob<Product>('../content/products/*.json', {
  eager: true,
  import: 'default',
})

export const products: Product[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, p]) => p)

export function getProduct(id: string | null | undefined): Product | undefined {
  return products.find((p) => p.id === id)
}

/** True when a value is still an unfilled client placeholder, e.g. "[PRICE]". */
export function isPlaceholder(value: string): boolean {
  return /\[[^\]]+\]/.test(value)
}
