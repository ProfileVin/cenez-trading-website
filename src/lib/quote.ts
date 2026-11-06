export type QuoteType = 'standard' | 'customize' | 'custom'

export const quoteTypes: { value: QuoteType; label: string; hint: string }[] = [
  { value: 'standard', label: 'Standard model', hint: 'A model as shown in our catalog' },
  { value: 'customize', label: 'Customize a model', hint: 'Change the size, color or features of a model' },
  { value: 'custom', label: 'Fully custom design', hint: 'Your own shape and size' },
]

export function parseQuoteType(value: string | null): QuoteType {
  return quoteTypes.some((t) => t.value === value) ? (value as QuoteType) : 'standard'
}

export type QuoteRequest = {
  type: QuoteType
  name: string
  mobile: string
  location: string
  productId: string
  length: string
  width: string
  depth: string
  color: string
  features: string[]
  notes: string
}

export type QuoteField = Exclude<keyof QuoteRequest, 'features'>
export type QuoteErrors = Partial<Record<QuoteField, string>>

export const emptyQuote: QuoteRequest = {
  type: 'standard',
  name: '',
  mobile: '',
  location: '',
  productId: '',
  length: '',
  width: '',
  depth: '',
  color: '',
  features: [],
  notes: '',
}

/** Strip spaces, dashes and brackets so "0917 123-4567" validates. */
export function normalizeMobile(value: string): string {
  return value.replace(/[\s\-().]/g, '')
}

// PH mobile: 09XXXXXXXXX or +639XXXXXXXXX
const PH_MOBILE = /^(\+63|0)9\d{9}$/

function invalidMeters(value: string): boolean {
  if (!value.trim()) return false // optional
  const n = Number(value)
  return !Number.isFinite(n) || n <= 0 || n > 50
}

export function validateQuote(q: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {}
  if (!q.name.trim()) errors.name = 'Please enter your name.'
  if (!q.mobile.trim()) errors.mobile = 'Please enter your mobile number.'
  else if (!PH_MOBILE.test(normalizeMobile(q.mobile)))
    errors.mobile = 'Use a PH mobile number, e.g. 0917 123 4567 or +63 917 123 4567.'
  if (!q.location.trim()) errors.location = 'Please enter your town or city.'
  if (q.type !== 'custom' && !q.productId) errors.productId = 'Please choose a model.'
  if (q.type !== 'standard') {
    for (const key of ['length', 'width', 'depth'] as const) {
      if (invalidMeters(q[key])) errors[key] = 'Enter a size in metres, e.g. 4.5'
    }
  }
  return errors
}

const STORAGE_KEY = 'quote-requests'

/**
 * Sends a quote request. Posts JSON to VITE_QUOTE_ENDPOINT when set; otherwise keeps
 * it in localStorage so the flow can be demoed without a backend.
 * TODO(production): real endpoint that stores to DB and notifies the client by email/SMS,
 * plus spam protection (Turnstile / hCaptcha).
 */
export async function submitQuote(q: QuoteRequest): Promise<void> {
  // Standard requests don't carry custom fields, even if the visitor toggled back.
  const custom = q.type === 'standard' ? { length: '', width: '', depth: '', color: '', features: [] } : {}
  const payload = { ...q, ...custom, mobile: normalizeMobile(q.mobile), submittedAt: new Date().toISOString() }
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT as string | undefined

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Quote request failed (${res.status})`)
    return
  }

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown[]
  saved.push(payload)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  console.info('[quote] stored locally (no VITE_QUOTE_ENDPOINT set)', payload)
}
