import { useState } from 'react'

/** Product photo with a tinted placeholder until the client's photo is in /public/products. */
export function ProductImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const failed = failedSrc === src

  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-tint ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-cover"
          loading="eager"
        />
      ) : (
        <div role="img" aria-label={alt} className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
          <svg viewBox="0 0 120 80" className="w-28 text-cobalt-deep" aria-hidden="true">
            <rect x="6" y="6" width="108" height="68" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <rect x="16" y="16" width="88" height="48" rx="2" fill="#1D63D8" opacity=".25" />
            <path d="M16 46a18 18 0 0 0 18 18M16 34a30 30 0 0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="label text-muted">Product photo coming soon</span>
        </div>
      )}
    </div>
  )
}
