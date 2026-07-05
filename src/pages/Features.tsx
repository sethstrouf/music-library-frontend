import { useEffect } from 'react'
import MultipleLibrariesImage from '../images/multiplelibraries.png'
import LibraryImage from '../images/library.png'
import SearchImage from '../images/search.png'
import ColleaguesImage from '../images/colleagues.png'

const FEATURES = [
  {
    title: 'Connect with colleagues',
    description: 'Follow other directors and explore their libraries to find new repertoire.',
    image: ColleaguesImage,
  },
  {
    title: 'Manage multiple libraries',
    description: 'Run several ensembles? Keep each library organized in one place.',
    image: MultipleLibrariesImage,
  },
  {
    title: 'Track your inventory',
    description: 'Record catalog numbers, copy counts, last performed dates, and checkout status.',
    image: LibraryImage,
  },
  {
    title: 'Search and add music',
    description: 'Find works in the shared catalog and add them to your library in a few clicks.',
    image: SearchImage,
  },
]

const Features = () => {
  useEffect(() => {
    document.title = 'Features — Songsemble'
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Features</h1>
      <p className="page-subtitle">
        Built for music directors who need more than a spreadsheet.
      </p>

      <div className="mt-12 space-y-8">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h2 className="text-center text-xl font-semibold text-slate-900 sm:text-2xl">
              {feature.title}
            </h2>
            <p className="mb-8 mt-2 text-center text-slate-600">{feature.description}</p>
            <img src={feature.image} alt="" className="mx-auto max-w-full rounded-lg" />
          </article>
        ))}
      </div>
    </div>
  )
}

export default Features
