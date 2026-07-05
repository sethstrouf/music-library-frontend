import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  useEffect(() => {
    document.title = 'Songsemble — Music Library & Networking'
  }, [])

  return (
    <div className="hero-gradient full-bleed">
      <div className="page-container">
        <div className="mx-auto max-w-4xl py-16 text-center sm:py-24">
          <p className="font-display text-5xl text-brand-600 sm:text-6xl lg:text-7xl">Songsemble</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Organize your repertoire. Connect with colleagues.
          </h1>
          <p className="page-subtitle mx-auto mt-6">
            Songsemble helps choir, band, and orchestra directors catalog music, track copies and
            performance history, and discover what others are programming.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NavLink to="/signup" className="btn-primary px-8 py-3 text-base">
              Create a free account
            </NavLink>
            <NavLink to="/features" className="btn-secondary px-8 py-3 text-base">
              Explore features
            </NavLink>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 pb-16 sm:grid-cols-3">
          {[
            { title: 'Multiple libraries', desc: 'Keep choir, band, and orchestra collections separate and easy to manage.' },
            { title: 'Colleague network', desc: 'Follow other directors and browse their libraries for inspiration.' },
            { title: 'Fast search', desc: 'Find works by title, composer, or genre in seconds.' },
          ].map((item) => (
            <div key={item.title} className="card text-left">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
