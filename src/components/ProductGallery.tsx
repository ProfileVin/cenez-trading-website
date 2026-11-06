import { useState } from 'react'
import type { ProductImage as Img } from '../lib/products'
import { ProductImage } from './ProductImage'

/** Main photo with thumbnail buttons underneath when a product has more than one photo. */
export function ProductGallery({ images, status }: { images: Img[]; status: string }) {
  const [state, setState] = useState({ images, index: 0 })
  // Reset to the cover when navigating to another product.
  const index = state.images === images ? state.index : 0
  const current = images[index] ?? images[0]
  if (!current) return null

  return (
    <figure>
      <ProductImage src={current.src} alt={current.alt} />
      <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[12px] text-muted">
        <span>{current.caption}</span>
        <span className="shrink-0">{status}</span>
      </figcaption>

      {images.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="More photos">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setState({ images, index: i })}
                aria-label={`Show photo ${i + 1}: ${img.caption}`}
                aria-current={i === index}
                className={`block w-full overflow-hidden rounded-sm ${i === index ? 'ring-2 ring-cobalt ring-offset-2 ring-offset-ground' : 'opacity-80 hover:opacity-100'}`}
              >
                <img src={img.src} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </figure>
  )
}
