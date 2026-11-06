import { Link } from 'react-router-dom'
import { customOptions, customSteps, gelcoatColors } from '../lib/site'
import { track } from '../lib/track'

export function CustomSection() {
  return (
    <section id="custom" aria-labelledby="custom-heading" className="section bg-ink text-white">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="label text-[#8FB5F2]">Made to your size</p>
            <h2 id="custom-heading" className="h2 mt-4 max-w-[16ch]">
              Need a different size or layout?
            </h2>
            <p className="mt-5 max-w-[48ch] text-white/80">
              Every shell is molded in our own workshop, so we can change it to fit your yard. Start from one of our
              models or bring your own idea.
            </p>

            <div className="mt-10">
              <p className="label text-white/60">Gelcoat colors</p>
              <ul className="mt-3 flex flex-wrap gap-4">
                {gelcoatColors.map((c) => (
                  <li key={c.name} className="flex items-center gap-2 text-[14px]">
                    <span aria-hidden="true" className="size-6 rounded-full border border-white/30" style={{ background: c.hex }} />
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="label text-white/60">Options</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {customOptions.map((o) => (
                  <li key={o} className="rounded-sm border border-white/25 px-3 py-1 text-[14px]">
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to={{ search: '?type=customize', hash: '#quote' }}
              onClick={() => track('quote_click', { location: 'custom' })}
              className="btn mt-10 bg-white text-ink hover:bg-tint"
            >
              Start a custom quote <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ol className="grid gap-px self-start overflow-hidden rounded-sm bg-white/15">
            {customSteps.map((s, i) => (
              <li key={s.title} className="flex gap-5 bg-ink p-6">
                <span className="display text-[28px] text-[#8FB5F2]" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="h3 text-[17px]">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-white/75">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
