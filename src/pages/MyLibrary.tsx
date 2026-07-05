import { useEffect, useState } from 'react'
import axios from 'axios'
import useStore from '../store'
import qs from 'qs';
import AddLibraryModal from '../components/modals/AddLibraryModal';
import LibrarySelect from '../components/LibrarySelect';
import ChangeLibraryNameModal from '../components/modals/ChangeLibraryNameModal';
import LibraryTable from '../components/LibraryTable';
import { NavLink } from 'react-router-dom';
import ConfirmDeleteLibraryModal from '../components/modals/ConfirmDeleteLibraryModal';
import WorkSearchBar from '../components/WorkSearchBar';
import PaginationBar from '../components/PaginationBar';

const MyLibrary = () => {
  const accessToken = useStore(state => state.accessToken)
  const libraryWorks = useStore(state => state.libraryWorks)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const getAndSetLibraryWorks = useStore(state=> state.getAndSetLibraryWorks)
  const currentLibrary = useStore(state => state.currentLibrary)
  const getAndSetCurrentLibrary = useStore(state => state.getAndSetCurrentLibrary)
  const showChangeLibraryNameModal = useStore(state => state.showChangeLibraryNameModal)
  const setShowChangeLibraryNameModal = useStore(state => state.setShowChangeLibraryNameModal)
  const showAddLibraryModal = useStore(state => state.showAddLibraryModal)
  const setShowAddLibraryModal = useStore(state => state.setShowAddLibraryModal)
  const showConfirmDeleteLibraryModal = useStore(state => state.showConfirmDeleteLibraryModal)
  const setShowConfirmDeleteLibraryModal = useStore(state => state.setShowConfirmDeleteLibraryModal)

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(25)
  const [selectedLibraryWorks, setSelectedLibraryWorks] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    if (currentLibrary) {
      document.title = currentLibrary.attributes.name
    } else {
      document.title = 'My Library'
    }
    fetchLibraryWorks()
  }, [currentLibrary])


  useEffect(() => {
    fetchLibraryWorks()
  }, [page, perPage])

  const fetchLibraryWorks = () => {
    getAndSetLibraryWorks(page, perPage)
  }

  const deleteSelected = () => {
    selectedLibraryWorks.forEach(async selectedWork => {
      try {
        await axios({
          method: 'delete',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works/${selectedWork.id}`,
          headers: { Authorization: `${accessToken}` }
        })
        getAndSetCurrentLibrary(currentLibrary!.id)
        fetchLibraryWorks()
        setSelectedLibraryWorks([])
      } catch (error) {
        console.error(error)
      }
    })
  }

  useEffect(() => {
    if (searchQuery.length === 0) {
      fetchLibraryWorks()
    }
    if (searchQuery.length > 0) {
      handleSearch()
    }
  }, [searchQuery])

  const handleSearchSubmit = (e: any) => {
    e.preventDefault()
    handleSearch()
  }

  const handleSearch = async () => {
    if (currentLibrary) {
      try {
        const res = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/search_library_works`,
          params: {
            library_work: { library_id: currentLibrary!.id },
            works_query: { query: searchQuery }
          },
          paramsSerializer: (params) => {
            return qs.stringify(params)
          },
          headers: { Authorization: `${accessToken}` }
        })
        setLibraryWorks(res.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="page-container">
      {showAddLibraryModal && <AddLibraryModal />}
      {showChangeLibraryNameModal && <ChangeLibraryNameModal />}
      {showConfirmDeleteLibraryModal && <ConfirmDeleteLibraryModal />}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="page-title">
            {currentLibrary ? currentLibrary.attributes.name.toString() : 'My Library'}
          </h1>
          <div className="mt-4">
            <LibrarySelect />
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <button type="button" className="text-link-subtle" onClick={() => setShowAddLibraryModal(true)}>
              New library
            </button>
            <button type="button" className="text-link-subtle" onClick={() => setShowChangeLibraryNameModal(true)}>
              Rename library
            </button>
            <button type="button" className="text-link-subtle text-red-600 hover:text-red-700 hover:decoration-red-300" onClick={() => setShowConfirmDeleteLibraryModal(true)}>
              Delete library
            </button>
          </div>
        </div>
        <NavLink to="/searchworks">
          <button type="button" className="btn-primary whitespace-nowrap">
            + Add to library
          </button>
        </NavLink>
      </div>

      <form className="mt-8" onSubmit={(e) => handleSearchSubmit(e)}>
        <WorkSearchBar placeholder="Search by title or composer…" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </form>

      {libraryWorks?.length ? (
        <div className="mt-8">
          <PaginationBar perPage={perPage} setPerPage={setPerPage} setPage={setPage} />
          <div className="table-shell relative rounded-t-none">
            {selectedLibraryWorks.length > 0 && (
              <div className="absolute left-14 top-0 z-10 flex h-12 items-center sm:left-16">
                <button type="button" className="btn-danger px-3 py-1.5 text-xs" onClick={() => deleteSelected()}>
                  Delete selected ({selectedLibraryWorks.length})
                </button>
              </div>
            )}
            <LibraryTable
              selectedLibraryWorks={selectedLibraryWorks}
              setSelectedLibraryWorks={setSelectedLibraryWorks}
              page={page}
              perPage={perPage}
            />
          </div>
        </div>
      ) : (
        <div className="card mt-8 text-center">
          <p className="font-medium text-slate-700">
            {currentLibrary
              ? 'This library is empty. Search for works to add your first piece.'
              : 'Create a library to start building your collection.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default MyLibrary
