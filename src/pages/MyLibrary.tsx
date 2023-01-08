import { useEffect, useState } from 'react'
import axios from 'axios'
import useStore from '../store'
import qs from 'qs';
import AddLibraryModal from '../components/modals/AddLibraryModal';
import LibrarySelect from '../components/LibrarySelect';
import ChangeLibraryNameModal from '../components/modals/ChangeLibraryNameModal';
import LibraryTable from '../components/LibraryTable';
import { NavLink } from 'react-router-dom';

const MyLibrary = () => {
  const accessToken = useStore(state => state.accessToken)
  const libraryWorks = useStore(state => state.libraryWorks)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const currentLibrary = useStore(state => state.currentLibrary)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)
  const setCurrentUser = useStore(state => state.setCurrentUser)
  const showChangeLibraryNameModal = useStore(state => state.showChangeLibraryNameModal)
  const setShowChangeLibraryNameModal = useStore(state => state.setShowChangeLibraryNameModal)
  const showAddLibraryModal = useStore(state => state.showAddLibraryModal)
  const setShowAddLibraryModal = useStore(state => state.setShowAddLibraryModal)

  const [selectedLibraryWorks, setSelectedLibraryWorks] = useState<any[]>([])

  useEffect(() => {
    if (currentLibrary) {
      document.title = currentLibrary.attributes.name
    } else {
      document.title = 'My Library'
    }
  }, [currentLibrary])

  useEffect(() => {
    if (!libraryWorks?.length && currentLibrary !== null) {
      getLibraryWorks()
    }
  }, [])

  useEffect(() => {
    setLibraryWorks([])
    if (currentLibrary !== null) {
      getLibraryWorks()
    }
  }, [currentLibrary])

  const getLibraryWorks = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works`,
        params: {
          library_work: { library_id: currentLibrary?.id }
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

  const deleteSelected = () => {
    selectedLibraryWorks.forEach(async selectedWork => {
      try {
        await axios({
          method: 'delete',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works/${selectedWork.id}`,
          headers: { Authorization: `${accessToken}` }
        })
        getCurrentLibrary()
        getLibraryWorks()
        setSelectedLibraryWorks([])
      } catch (error) {
        console.error(error)
      }
    })
  }

  const getCurrentLibrary = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${currentLibrary!.id}`,
        headers: { Authorization: `${accessToken}` }
      })
      localStorage.setItem('currentLibraryId', res.data.id)
      setCurrentLibrary(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteLibrary = async () => {
    if (currentLibrary) {
      try {
        await axios({
          method: 'delete',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${currentLibrary.id}`,
          headers: { Authorization: `${accessToken}` }
        })
        updateCurrentUser()
        setCurrentLibrary(null)
        localStorage.removeItem('currentLibraryId');
      } catch (error) {
        console.error(error)
      }
    }
  }

  const updateCurrentUser = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/current_user`,
        headers: { Authorization: `${accessToken}` }
      })
      setCurrentUser(res.data);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {showAddLibraryModal && <AddLibraryModal />}
      {showChangeLibraryNameModal && <ChangeLibraryNameModal />}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {currentLibrary && <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">{currentLibrary.attributes.name.toString()}</h1>}
          {!currentLibrary && <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">No Current Library</h1>}
          <div className='pt-4 flex flex-col md:flex-row gap-4'>
            <LibrarySelect />
          </div>
          <div className="pt-1 text-sky-600">
            <button
              type="button"
              className="pt-2 pl-2 w-max text-left text-sm font-medium underline hover:text-sky-700"
              onClick={() => setShowAddLibraryModal(true)}
            >
              Add library
            </button>
            &nbsp;&nbsp;&nbsp;|
            <button
              type="button"
              className="pt-2 pl-2 w-max text-left text-sm font-medium underline text-sky-600 hover:text-sky-700"
              onClick={() => setShowChangeLibraryNameModal(true)}
            >
              Change name
            </button>
            &nbsp;&nbsp;&nbsp;|
            <button
              type="button"
              className="pt-2 pl-2 w-max text-left text-sm font-medium underline text-sky-600 hover:text-sky-700"
              onClick={() => deleteLibrary()}
            >
              Delete library
            </button>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <NavLink to={'/searchworks'}>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
              >
              + Add to library
            </button>
          </NavLink>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        {libraryWorks?.length
        ?
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {selectedLibraryWorks.length > 0 && (
                  <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => deleteSelected()}
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <LibraryTable selectedLibraryWorks={selectedLibraryWorks} setSelectedLibraryWorks={setSelectedLibraryWorks} />
              </div>
            </div>
          </div>
        :
          <>
            {currentLibrary && <p className="mt-2 text-sm text-gray-700 font-bold">Your library is empty! Add a work to begin using Songsemble.</p> }
            {!currentLibrary && <p className="mt-2 text-sm text-gray-700 font-bold">Add a new library to begin!</p> }
          </>
        }
      </div>
    </div>
  )
}

export default MyLibrary
