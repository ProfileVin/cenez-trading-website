import type { Product } from '../lib/products'

// Top-down plan of a rectangular shell. Geometry is schematic; labels come from product data.
const INNER = { x: 40, y: 34, w: 460, h: 276 } // 4.5 × 2.7 ratio
const FLANGE = 14
const BENCH_TOP = 18
const BENCH_SIDE = 50
const STEP_RADII = [126, 88, 50]

const outer = {
  x: INNER.x - FLANGE,
  y: INNER.y - FLANGE,
  w: INNER.w + FLANGE * 2,
  h: INNER.h + FLANGE * 2,
}
const right = INNER.x + INNER.w
const bottom = INNER.y + INNER.h
const outerRight = outer.x + outer.w
const outerBottom = outer.y + outer.h

const C = {
  ink: '#0E2233',
  muted: '#4A5D6E',
  deep: '#0F4AA8',
  water: '#1D63D8',
  bench: '#5F93E8',
  flange: '#DCE8FA',
  dusk: '#D98A97',
  steps: ['#4F86E3', '#7AA5EC', '#A5C2F3'],
}
const MONO = 'IBM Plex Mono, ui-monospace, monospace'

const ports = [
  { x: INNER.x + 12, y: INNER.y + 196 },
  { x: INNER.x + 170, y: INNER.y + BENCH_TOP + 12 },
  { x: INNER.x + 250, y: INNER.y + BENCH_TOP + 12 },
  { x: right - BENCH_SIDE - 10, y: INNER.y + 110 },
  { x: right - BENCH_SIDE - 10, y: INNER.y + 210 },
]

function Callout({ n, x, y, stroke = C.ink }: { n: string; x: number; y: number; stroke?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill="#fff" stroke={stroke} strokeWidth="1.5" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11.5" fontWeight="500" fill={C.ink} fontFamily={MONO}>
        {n}
      </text>
    </g>
  )
}

function PlanDrawing({ product }: { product: Product }) {
  const dimX = outerRight + 34
  const dimY = outerBottom + 26

  return (
    <svg viewBox="0 0 590 384" role="img" aria-labelledby="plan-title plan-desc" className="h-auto w-full" fontFamily={MONO}>
      <title id="plan-title">Plan view of {product.name}</title>
      <desc id="plan-desc">
        Top-down drawing, {product.length} long by {product.width} wide, showing corner steps, bench ledge on two walls,
        fitting ports, coping flange and exterior ribs.
      </desc>

      {/* 4 · coping flange */}
      <rect x={outer.x} y={outer.y} width={outer.w} height={outer.h} fill={C.flange} stroke={C.ink} strokeWidth="1.5" />

      {/* water */}
      <rect x={INNER.x} y={INNER.y} width={INNER.w} height={INNER.h} fill={C.water} stroke={C.deep} strokeWidth="1.5" />

      {/* 2 · bench ledge: far wall + side wall */}
      <path
        d={`M${INNER.x} ${INNER.y} H${right} V${bottom} H${right - BENCH_SIDE} V${INNER.y + BENCH_TOP} H${INNER.x} Z`}
        fill={C.bench}
        stroke={C.deep}
        strokeWidth="1"
      />

      {/* 1 · curved corner steps, largest first */}
      {STEP_RADII.map((r, i) => (
        <path
          key={r}
          d={`M${INNER.x + r} ${INNER.y} A${r} ${r} 0 0 1 ${INNER.x} ${INNER.y + r} V${INNER.y} Z`}
          fill={C.steps[i]}
          stroke={C.deep}
          strokeWidth="1"
        />
      ))}

      {/* 3 · fitting ports */}
      {ports.map((p) => (
        <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="3.5" fill="#fff" />
      ))}

      {/* length dimension */}
      <g stroke={C.ink} strokeWidth="1">
        <line x1={outer.x} y1={outerBottom + 8} x2={outer.x} y2={dimY + 6} />
        <line x1={outerRight} y1={outerBottom + 8} x2={outerRight} y2={dimY + 6} />
        <line x1={outer.x} y1={dimY} x2={outerRight} y2={dimY} />
      </g>
      <text x={outer.x + outer.w / 2} y={dimY + 18} textAnchor="middle" fontSize="12" fill={C.muted}>
        {product.length}
      </text>

      {/* width dimension */}
      <g stroke={C.ink} strokeWidth="1">
        <line x1={outerRight + 8} y1={outer.y} x2={dimX + 6} y2={outer.y} />
        <line x1={outerRight + 8} y1={outerBottom} x2={dimX + 6} y2={outerBottom} />
        <line x1={dimX} y1={outer.y} x2={dimX} y2={outerBottom} />
      </g>
      <text
        transform={`translate(${dimX + 18} ${outer.y + outer.h / 2}) rotate(90)`}
        textAnchor="middle"
        fontSize="12"
        fill={C.muted}
      >
        {product.width}
      </text>

      {/* callouts */}
      <Callout n="1" x={INNER.x + 58} y={INNER.y + 58} />
      <Callout n="2" x={INNER.x + 300} y={INNER.y + BENCH_TOP / 2} />
      <Callout n="3" x={INNER.x + 210} y={INNER.y + BENCH_TOP + 40} />
      <Callout n="4" x={outer.x + outer.w / 2} y={outerBottom} />
      <Callout n="5" x={outerRight} y={outer.y + outer.h * 0.62} stroke={C.dusk} />
    </svg>
  )
}

export function PlanView({ product }: { product: Product }) {
  return (
    <section id="plan" aria-labelledby="plan-heading" className="section">
      <div className="wrap">
        <p className="eyebrow">{product.hasPlan ? 'Plan view' : 'Features'}</p>
        <h2 id="plan-heading" className="h2 mt-4 max-w-[22ch]">
          Everything is molded in. Nothing is bolted on.
        </h2>

        <div className={`mt-12 grid gap-12 ${product.hasPlan ? 'lg:grid-cols-[1.35fr_1fr] lg:items-start' : ''}`}>
          {product.hasPlan && (
            <figure>
              <PlanDrawing product={product} />
              <figcaption className="mt-4 font-mono text-[12px] text-muted">
                Not to scale. Dimensions approximate; confirm against the factory drawing.
              </figcaption>
            </figure>
          )}

          <ol className={product.hasPlan ? '' : 'grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3'}>
            {product.features.map((f, i) => (
              <li key={f.n} className={`flex gap-4 py-5 ${i > 0 ? 'border-t border-line' : 'pt-0'}`}>
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink font-mono text-[12px]"
                >
                  {f.n}
                </span>
                <div>
                  <h3 className="h3 text-[17px]">
                    <span className="sr-only">{f.n}. </span>
                    {f.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-muted">{f.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
