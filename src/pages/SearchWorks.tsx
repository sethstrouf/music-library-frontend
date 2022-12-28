import { useEffect } from 'react'

const SearchWorks = () => {

  useEffect(() => {
    document.title = 'SearchWorks'
  }, [])

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">Search Works</h1>
    </div>
  )
}

export default SearchWorks
