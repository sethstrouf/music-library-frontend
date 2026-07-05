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
  const accessToken = useStore((state) => state.accessToken)
  const currentUser = useStore((state) => state.currentUser)
  const showAddWorkToLibraryModal = useStore((state) => state.showAddWorkToLibraryModal)
  const setShowAddWorkToLibraryModal = useStore((state) => state.setShowAddWorkToLibraryModal)
  const showAddWorkModal = useStore((state) => state.showAddWorkModal)
  const setShowAddWorkModal = useStore((state) => state.setShowAddWorkModal)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<IWork[]>([])
  const [selectedWork, setSelectedWork] = useState<IWork | null>(null)
  const [worksAlreadyInLibrary, setWorksAlreadyInLibrary] = useState<number[]>([])

  useEffect(() => {
    document.title = 'Add Music — Songsemble'
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch()
    }
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const handleSearch = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/search_works`,
        params: {
          works_query: { query: searchQuery },
        },
        paramsSerializer: (params) => qs.stringify(params),
        headers: { Authorization: `${accessToken}` },
      })
      setSearchResults(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="page-container">
      {showAddWorkToLibraryModal && (
        <AddWorkToLibraryModal
          selectedWork={selectedWork}
          worksAlreadyInLibrary={worksAlreadyInLibrary}
          setWorksAlreadyInLibrary={setWorksAlreadyInLibrary}
        />
      )}
      {showAddWorkModal && <AddWorkModal />}

      <h1 className="page-title">Add Music</h1>
      <p className="page-subtitle">
        Search the catalog and add works to your library.
      </p>

      <div className="mt-6">
        <LibrarySelect />
      </div>

      {currentUser!.admin && (
        <button type="button" className="btn-secondary mt-4" onClick={() => setShowAddWorkModal(true)}>
          Add work to catalog
        </button>
      )}

      <form className="mt-8" onSubmit={handleSearchSubmit}>
        <WorkSearchBar
          placeholder='Try "Homeward Bound" or "Eric Whitacre"'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </form>

      <div className="mt-8">
        <WorkSearchResultsList
          searchResults={searchResults}
          setShowAddWorkToLibraryModal={setShowAddWorkToLibraryModal}
          setSelectedWork={setSelectedWork}
          selectedWork={selectedWork}
          worksAlreadyInLibrary={worksAlreadyInLibrary}
          setWorksAlreadyInLibrary={setWorksAlreadyInLibrary}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchWorks
