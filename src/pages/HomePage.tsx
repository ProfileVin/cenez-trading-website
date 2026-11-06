import { useSearchParams } from 'react-router-dom'
import { BeforeYouBuy } from '../components/BeforeYouBuy'
import { CompanyHero } from '../components/CompanyHero'
import { CustomSection } from '../components/CustomSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { InstallSteps } from '../components/InstallSteps'
import { ModelsGrid } from '../components/ModelsGrid'
import { ProjectsGallery } from '../components/ProjectsGallery'
import { QuoteForm } from '../components/QuoteForm'
import { SkipLink } from '../components/SkipLink'
import { projects } from '../content/projects'
import { products } from '../lib/products'
import { parseQuoteType } from '../lib/quote'
import { useDocumentMeta } from '../lib/useDocumentMeta'

/** `/`: company home with all models, customization, projects and the quote form. */
export function HomePage() {
  const [params] = useSearchParams()
  useDocumentMeta(
    'Fiberglass pools, built to your size',
    'One-piece fiberglass pool shells, ready models or custom-made, delivered and installed. Request a quote.',
  )

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <CompanyHero />
        <ModelsGrid
          products={products}
          intro="Ready models you can order as shown, or use as a starting point for your own size and layout."
        />
        <CustomSection />
        <ProjectsGallery photos={projects} />
        <InstallSteps />
        <BeforeYouBuy />
        <QuoteForm products={products} selectedId={params.get('product') ?? ''} type={parseQuoteType(params.get('type'))} />
      </main>
      <Footer />
    </>
  )
}
