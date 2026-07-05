import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found — Songsemble'
  }, [])

  return (
    <div className="page-container flex min-h-[50vh] items-center justify-center">
      <div className="text-center sm:text-left">
        <div className="sm:flex sm:items-start sm:gap-6">
          <p className="text-6xl font-bold text-brand-600 sm:text-7xl">404</p>
          <div className="mt-4 sm:mt-0 sm:border-l sm:border-slate-200 sm:pl-6">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Page not found</h1>
            <p className="mt-2 text-slate-600">
              Check the URL or head back to the homepage.
            </p>
            <div className="mt-8">
              <NavLink to="/" className="btn-primary">
                Back to home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
