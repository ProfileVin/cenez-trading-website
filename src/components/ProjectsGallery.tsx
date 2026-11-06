import { useEffect, useRef, useState } from 'react'
import type { ProjectPhoto } from '../content/projects'

const stageStyle: Record<ProjectPhoto['stage'], string> = {
  Workshop: 'bg-tint text-cobalt-deep',
  Installation: 'bg-dusk text-ink',
  Finished: 'bg-ink text-white',
}

export function ProjectsGallery({ photos }: { photos: ProjectPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const current = open === null ? null : photos[open]

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open !== null && !d.open) d.showModal()
    if (open === null && d.open) d.close()
  }, [open])

  const step = (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length))

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section border-y border-line bg-surface">
      <div className="wrap">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-heading" className="h2 mt-4 max-w-[20ch]">
          From our workshop to your yard
        </h2>
        <p className="mt-5 max-w-[58ch] text-muted">Real photos of shells we've built and installed.</p>

        <ul className="mt-12 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
          {photos.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left"
                aria-label={`Open photo: ${p.caption}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-tint">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className={`label absolute top-3 left-3 rounded-sm px-2 py-0.5 text-[11px] ${stageStyle[p.stage]}`}>
                    {p.stage}
                  </span>
                </div>
                <p className="mt-2 text-[14px] text-muted group-hover:text-ink">{p.caption}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        aria-label={current?.caption ?? 'Photo'}
        className="m-auto max-h-[92vh] w-[min(1100px,94vw)] bg-transparent p-0 backdrop:bg-ink/85"
      >
        {current && (
          <figure className="rounded-sm bg-surface p-3">
            <img src={current.src} alt={current.alt} className="max-h-[76vh] w-full rounded-sm object-contain" />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 px-1 pt-3">
              <span className="text-[15px]">
                <span className={`label mr-2 rounded-sm px-2 py-0.5 text-[11px] ${stageStyle[current.stage]}`}>{current.stage}</span>
                {current.caption}
              </span>
              <span className="flex gap-2">
                <button type="button" className="btn-ink min-h-[40px]" onClick={() => step(-1)} aria-label="Previous photo">
                  ←
                </button>
                <button type="button" className="btn-ink min-h-[40px]" onClick={() => step(1)} aria-label="Next photo">
                  →
                </button>
                <button type="button" className="btn-secondary min-h-[40px] px-4" onClick={() => setOpen(null)}>
                  Close
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  )
}
