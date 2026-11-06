import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NotFound } from './pages/NotFound'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { QuotePage } from './pages/QuotePage'

/** Router links don't scroll on their own: jump to #hash targets, or to the top on a new page. */
function ScrollManager() {
  const { pathname, search, hash } = useLocation()
  const lastPath = useRef(pathname)

  useEffect(() => {
    const pageChanged = lastPath.current !== pathname
    lastPath.current = pathname
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    } else if (pageChanged) {
      window.scrollTo(0, 0)
    }
  }, [pathname, search, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
