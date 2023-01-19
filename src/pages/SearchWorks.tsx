import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { IWork } from '../common/types'
import AddWorkToLibraryModal from '../components/modals/AddWorkToLibraryModal'
import LibrarySelect from '../components/LibrarySelect'
import WorkSearchBar from '../components/WorkSearchBar'
import WorkSearchResultsList from '../components/WorkSearchResultsList'
import useStore from '../store'
import AddWorkModal from '../components/modals/AddWorkModal'

const SearchWorks = () => {
  const accessToken = useStore(state => state.accessToken)
  const currentUser = useStore(state => state.currentUser)
  const showAddWorkToLibraryModal = useStore(state => state.showAddWorkToLibraryModal)
  const setShowAddWorkToLibraryModal = useStore(state => state.setShowAddWorkToLibraryModal)
  const showAddWorkModal = useStore(state => state.showAddWorkModal)
  const setShowAddWorkModal = useStore(state => state.setShowAddWorkModal)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<IWork[]>([])
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null)
  const [worksAlreadyInLibrary, setWorksAlreadyInLibrary] = useState<number[]>([])

  useEffect(() => {
    document.title = 'SearchWorks'
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch()
    }
  }, [searchQuery])

  const handleSearchSubmit = (e: any) => {
    e.preventDefault()
    handleSearch()
  }

  const handleSearch = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/search_works`,
        params: {
          works_query: { query: searchQuery }
        },
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
        headers: { Authorization: `${accessToken}` }
      })
      setSearchResults(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {showAddWorkToLibraryModal && <AddWorkToLibraryModal selectedWork={selectedWork} worksAlreadyInLibrary={worksAlreadyInLibrary} setWorksAlreadyInLibrary={setWorksAlreadyInLibrary} />}
      {showAddWorkModal && <AddWorkModal />}

      <h1 className="text-3xl pb-6 font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">Search Works</h1>

      <LibrarySelect />

      {currentUser!.admin &&
        <button
        type="button"
        className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
        onClick={() => setShowAddWorkModal(true)}
        >
          + Add New Work
        </button>
      }

      <div className='mx-auto pt-12'>
        <form onSubmit={(e) => handleSearchSubmit(e)}>
          <WorkSearchBar placeholder='Search titles like "Homeward Bound" or composers like "Eric Whitacre"' searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </form>
      </div>

      <div className='pt-12'>
        <WorkSearchResultsList searchResults={searchResults} setShowAddWorkToLibraryModal={setShowAddWorkToLibraryModal} setSelectedWork={setSelectedWork} selectedWork={selectedWork}
                               worksAlreadyInLibrary={worksAlreadyInLibrary} setWorksAlreadyInLibrary={setWorksAlreadyInLibrary} handleSearch={handleSearch} />
      </div>
    </div>
  )
}

export default SearchWorks
