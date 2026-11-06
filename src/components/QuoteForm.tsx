import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { Product } from '../lib/products'
import type { QuoteErrors, QuoteField, QuoteRequest, QuoteType } from '../lib/quote'
import { emptyQuote, quoteTypes, submitQuote, validateQuote } from '../lib/quote'
import { customOptions, gelcoatColors, site } from '../lib/site'
import { track } from '../lib/track'

type Props = {
  products: Product[]
  selectedId?: string
  type?: QuoteType
}

const fieldOrder: QuoteField[] = ['name', 'mobile', 'location', 'productId', 'length', 'width', 'depth']

export function QuoteForm({ products, selectedId = '', type = 'standard' }: Props) {
  const [values, setValues] = useState<QuoteRequest>({ ...emptyQuote, productId: selectedId, type })
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  // Follow the model / request type chosen elsewhere on the page, without clearing what was typed.
  const [last, setLast] = useState({ selectedId, type })
  if (selectedId !== last.selectedId || type !== last.type) {
    setLast({ selectedId, type })
    setValues((v) => ({
      ...v,
      productId: selectedId !== last.selectedId ? selectedId : v.productId,
      type: type !== last.type ? type : v.type,
    }))
  }

  const set = (key: QuoteField) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const toggleFeature = (feature: string) =>
    setValues((v) => ({
      ...v,
      features: v.features.includes(feature) ? v.features.filter((f) => f !== feature) : [...v.features, feature],
    }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validateQuote(values)
    setErrors(found)
    const first = fieldOrder.find((k) => found[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      await submitQuote(values)
      track('quote_submit', { product: values.productId, type: values.type })
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const product = products.find((p) => p.id === values.productId)
  const isCustom = values.type !== 'standard'
  const err = (key: QuoteField) => ({
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `q-${key}-err` : undefined,
  })

  return (
    <section id="quote" aria-labelledby="quote-heading" className="section bg-cobalt text-white">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 id="quote-heading" className="h2 max-w-[12ch]">
            Get a price for your yard
          </h2>
          <p className="mt-5 max-w-[44ch] text-white/90">
            Tell us where the pool is going, or what you'd like changed. We will reply with the shell price, delivery
            cost and an installation estimate for your site.
          </p>
          <ul className="mt-8 space-y-1 font-mono text-[13px] text-white/90">
            <li>
              Call or message:{' '}
              <a
                href={site.phoneHref}
                onClick={() => track('phone_click', { location: 'quote' })}
                className="underline underline-offset-4 hover:text-white"
              >
                {site.phone}
              </a>
            </li>
            <li>Email: {site.email}</li>
            <li>Showroom: {site.address}</li>
          </ul>
        </div>

        <div className="rounded-sm bg-surface p-6 text-ink sm:p-8">
          {status === 'sent' ? (
            <div role="status" aria-live="polite">
              <p className="eyebrow">Request received</p>
              <p className="h3 mt-3 text-[24px]">Thanks, {values.name.split(' ')[0]}.</p>
              <p className="mt-3 text-muted">
                We'll contact you on {values.mobile} about{' '}
                {values.type === 'custom' ? 'your custom pool' : `the ${product?.name ?? 'pool'}`}.
              </p>
              <button
                type="button"
                className="btn-secondary mt-8"
                onClick={() => {
                  setValues({ ...emptyQuote, productId: selectedId, type })
                  setStatus('idle')
                }}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-[14px] font-medium">What do you need?</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {quoteTypes.map((t) => (
                    <label
                      key={t.value}
                      className={`flex cursor-pointer flex-col rounded-sm border p-3 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-cobalt ${
                        values.type === t.value ? 'border-2 border-cobalt bg-tint/50 p-[11px]' : 'border-line'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={t.value}
                        checked={values.type === t.value}
                        onChange={() => setValues((v) => ({ ...v, type: t.value }))}
                        className="sr-only"
                      />
                      <span className="text-[15px] font-semibold">{t.label}</span>
                      <span className="mt-0.5 text-[13px] text-muted">{t.hint}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field id="q-name" label="Full name" error={errors.name}>
                <input id="q-name" name="name" autoComplete="name" className="field" value={values.name} onChange={set('name')} {...err('name')} />
              </Field>

              <Field id="q-mobile" label="Mobile number" error={errors.mobile}>
                <input
                  id="q-mobile"
                  name="mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0917 123 4567"
                  className="field"
                  value={values.mobile}
                  onChange={set('mobile')}
                  {...err('mobile')}
                />
              </Field>

              <Field id="q-location" label="Site location (town or city)" error={errors.location}>
                <input
                  id="q-location"
                  name="location"
                  autoComplete="address-level2"
                  className="field"
                  value={values.location}
                  onChange={set('location')}
                  {...err('location')}
                />
              </Field>

              <Field
                id="q-productId"
                label={values.type === 'custom' ? 'Closest model (optional)' : values.type === 'customize' ? 'Model to start from' : 'Model'}
                error={errors.productId}
              >
                <select id="q-productId" name="productId" className="field" value={values.productId} onChange={set('productId')} {...err('productId')}>
                  <option value="">{values.type === 'custom' ? 'None, my own design' : 'Choose a model'}</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>

              {isCustom && (
                <div className="grid gap-5 rounded-sm border border-line bg-ground p-4 sm:col-span-2 sm:grid-cols-2 sm:p-5">
                  <fieldset className="sm:col-span-2">
                    <legend className="mb-2 text-[14px] font-medium">Approximate size (metres, optional)</legend>
                    <div className="grid grid-cols-3 gap-3">
                      {(['length', 'width', 'depth'] as const).map((key) => (
                        <div key={key}>
                          <label htmlFor={`q-${key}`} className="mb-1 block font-mono text-[12px] text-muted capitalize">
                            {key}
                          </label>
                          <input
                            id={`q-${key}`}
                            name={key}
                            inputMode="decimal"
                            placeholder={key === 'length' ? '4.5' : key === 'width' ? '2.7' : '1.3'}
                            className="field"
                            value={values[key]}
                            onChange={set(key)}
                            {...err(key)}
                          />
                          {errors[key] && (
                            <p id={`q-${key}-err`} className="mt-1 text-[13px] text-error">
                              {errors[key]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <Field id="q-color" label="Gelcoat color" wide>
                    <select id="q-color" name="color" className="field" value={values.color} onChange={set('color')}>
                      <option value="">Not sure yet</option>
                      {gelcoatColors.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      <option value="Other">Other (tell us in the notes)</option>
                    </select>
                  </Field>

                  <fieldset className="sm:col-span-2">
                    <legend className="mb-2 text-[14px] font-medium">Features you want</legend>
                    <div className="flex flex-wrap gap-2">
                      {customOptions.map((opt) => {
                        const on = values.features.includes(opt)
                        return (
                          <label
                            key={opt}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-[14px] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-cobalt ${
                              on ? 'border-cobalt bg-cobalt text-white' : 'border-line bg-surface'
                            }`}
                          >
                            <input type="checkbox" checked={on} onChange={() => toggleFeature(opt)} className="sr-only" />
                            <span aria-hidden="true">{on ? '✓' : '+'}</span>
                            {opt}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>
                </div>
              )}

              <Field id="q-notes" label="Anything we should know? (access, soil, timeline)" wide>
                <textarea id="q-notes" name="notes" rows={4} className="field py-3" value={values.notes} onChange={set('notes')} />
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                <p className="font-mono text-[12px] text-muted">We only use your details to prepare this quote.</p>
                <button type="submit" className="btn-ink min-h-[48px] w-full sm:w-auto" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send quote request'}
                </button>
                {status === 'failed' && (
                  <p role="alert" className="w-full text-[15px] text-error">
                    Something went wrong. Please try again or call {site.phone}.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  error,
  wide,
  children,
}: {
  id: string
  label: string
  error?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-[14px] text-error">
          {error}
        </p>
      )}
    </div>
  )
}
