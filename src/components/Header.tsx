import { Link } from 'react-router-dom'
import { site } from '../lib/site'
import { track } from '../lib/track'

export type NavItem = { href: string; label: string }

const homeNav: NavItem[] = [
  { href: '#models', label: 'Models' },
  { href: '#custom', label: 'Custom' },
  { href: '#projects', label: 'Projects' },
  { href: '#install', label: 'Installation' },
]

function NavLink({ item, className }: { item: NavItem; className: string }) {
  // In-page anchors stay plain links; cross-page links go through the router.
  return item.href.startsWith('#') ? (
    <a href={item.href} className={className}>
      {item.label}
    </a>
  ) : (
    <Link to={item.href} className={className}>
      {item.label}
    </Link>
  )
}

export function Header({ nav = homeNav, quoteHref = '#quote' }: { nav?: NavItem[]; quoteHref?: string }) {
  return (
    <header id="top" className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link to="/" className="display text-[22px] tracking-tight" aria-label={`${site.brand} home`}>
          {site.brand}
        </Link>

        {nav.length > 0 && (
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} className="text-[15px] font-medium text-muted hover:text-ink" />
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="flex items-center gap-5">
          <a
            href={site.phoneHref}
            onClick={() => track('phone_click', { location: 'header' })}
            className="label hidden text-ink hover:text-cobalt sm:inline"
          >
            {site.phone}
          </a>
          <NavLink item={{ href: quoteHref, label: 'Get a quote' }} className="btn-ink" />
        </div>
      </div>
    </header>
  )
}
