import { useEffect } from 'react'
import MultipleLibrariesImage from '../images/multiplelibraries.png'
import LibraryImage from '../images/library.png'
import SearchImage from '../images/search.png'
import ColleaguesImage from '../images/colleagues.png'

const Demo = () => {

  useEffect(() => {
    document.title = 'Features'
  }, [])

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-800 sm:leading-none lg:text-6xl">Features</h1>

      <div className='mt-12 flex flex-col'>
        <div className='p-4 border rounded-md shadow-md border-gray-300'>
          <h2 className='mb-12 text-2xl sm:text-3xl text-center'>Connect with colleagues and view their libraries</h2>
          <img src={ColleaguesImage} className='mx-auto' />
        </div>
      </div>

      <div className='mt-12 flex flex-col'>
        <div className='p-4 border rounded-md shadow-md border-gray-300'>
          <h2 className='mb-12 text-2xl sm:text-3xl text-center'>Maintain multiple libraries</h2>
          <img src={MultipleLibrariesImage} className='mx-auto' />
        </div>
      </div>

      <div className='mt-12 flex flex-col'>
        <div className='p-4 border rounded-md shadow-md border-gray-300'>
          <h2 className='mb-12 text-2xl sm:text-3xl text-center'>Track index, quantity, performance dates, and inventory</h2>
          <img src={LibraryImage} className='mx-auto' />
        </div>
      </div>

      <div className='mt-12 flex flex-col'>
        <div className='p-4 border rounded-md shadow-md border-gray-300'>
          <h2 className='mb-12 text-2xl sm:text-3xl text-center'>Easily search music to add to your library</h2>
          <img src={SearchImage} className='mx-auto' />
        </div>
      </div>
    </div>
  )
}

export default Demo
