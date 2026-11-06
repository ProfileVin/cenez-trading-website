import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export function NotFound({ message = 'Page not found.' }: { message?: string }) {
  return (
    <>
      <Header nav={[]} quoteHref="/quote" />
      <main className="wrap section">
        <p className="eyebrow">404</p>
        <h1 className="h2 mt-4">{message}</h1>
        <Link to="/#models" className="btn-primary mt-8">
          See all models
        </Link>
      </main>
    </>
  )
}
