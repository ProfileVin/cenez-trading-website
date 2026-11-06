import { installSteps } from '../lib/site'

export function InstallSteps() {
  return (
    <section id="install" aria-labelledby="install-heading" className="section">
      <div className="wrap">
        <p className="eyebrow">How installation works</p>
        <h2 id="install-heading" className="h2 mt-4 max-w-[18ch]">
          From delivery truck to first swim
        </h2>
        <p className="mt-5 max-w-[60ch] text-muted">
          The shell is finished before it leaves the workshop, so most of the work on site is digging, plumbing and
          decking.
        </p>

        <ol className="mt-12 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {installSteps.map((step, i) => (
            <li key={step.title} className="rounded-sm border border-line bg-surface p-6">
              <span className="display block text-[28px] text-cobalt" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="h3 mt-5 text-[17px]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
