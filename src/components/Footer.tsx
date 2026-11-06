import { site } from '../lib/site'
import { track } from '../lib/track'

export function Footer() {
  return (
    <footer className="bg-ink py-8 text-white/70">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[12.5px]">
        <a href="#top" className="display text-[16px] text-white">
          {site.brand}
        </a>
        <p>
          {site.address} ·{' '}
          <a href={site.phoneHref} onClick={() => track('phone_click', { location: 'footer' })} className="hover:text-white">
            {site.phone}
          </a>{' '}
          · {site.email}
        </p>
        <p>
          © {new Date().getFullYear()} {site.brand}
        </p>
      </div>
    </footer>
  )
}
