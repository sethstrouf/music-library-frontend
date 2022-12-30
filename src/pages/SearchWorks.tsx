import axios from 'axios'
import qs from 'qs'
import { FormEvent, useEffect, useState } from 'react'
import { IWork } from '../common/types'
import AddWorkToLibraryModal from '../components/modals/AddWorkToLibraryModal'
import LibrarySelect from '../components/LibrarySelect'
import WorkSearchBar from '../components/WorkSearchBar'
import WorkSearchResultsList from '../components/WorkSearchResultsList'
import useStore from '../store'

const SearchWorks = () => {
  const accessToken = useStore(state => state.accessToken)
  const showAddWorkToLibraryModal = useStore(state => state.showAddWorkToLibraryModal)
  const setShowAddWorkToLibraryModal = useStore(state => state.setShowAddWorkToLibraryModal)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<IWork[]>([])
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null)
  const [worksAlreadyInLibrary, setWorksAlreadyInLibrary] = useState<number[]>([])

  useEffect(() => {
    document.title = 'SearchWorks'
  }, [])

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

      <h1 className="text-3xl pb-6 font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">Search Works</h1>

      <LibrarySelect />

      <div className='mx-auto pt-12'>
        <form onChange={() => handleSearch()}>
          <WorkSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </form>
      </div>

      <div className='pt-12'>
        <WorkSearchResultsList searchResults={searchResults} setShowAddWorkToLibraryModal={setShowAddWorkToLibraryModal} setSelectedWork={setSelectedWork}
                               worksAlreadyInLibrary={worksAlreadyInLibrary} setWorksAlreadyInLibrary={setWorksAlreadyInLibrary} />
      </div>
    </div>
  )
}

export default SearchWorks
