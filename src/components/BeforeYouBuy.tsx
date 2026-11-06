import { beforeYouBuy } from '../lib/site'

export function BeforeYouBuy() {
  return (
    <section aria-labelledby="before-heading" className="section border-y border-line bg-surface">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_2.2fr]">
        <div>
          <p className="eyebrow">Before you buy</p>
          <h2 id="before-heading" className="h2 mt-4 max-w-[12ch]">
            Three things to check on your site
          </h2>
        </div>
        <ul className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {beforeYouBuy.map((item) => (
            <li key={item.title}>
              <span className={`label inline-block rounded-sm px-2 py-0.5 text-[11px] ${item.highlight ? 'bg-dusk text-ink' : 'bg-tint text-cobalt-deep'}`}>
                {item.tag}
              </span>
              <h3 className="h3 mt-4 text-[17px]">{item.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
