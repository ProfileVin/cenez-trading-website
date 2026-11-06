// Analytics stub (spec §7). Wire GA4 / Plausible by loading their script; events land in dataLayer.
export type TrackEvent = 'quote_click' | 'quote_submit' | 'phone_click' | 'catalog_view_product'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: TrackEvent, props: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...props })
  if (import.meta.env.DEV) console.debug('[track]', event, props)
}
