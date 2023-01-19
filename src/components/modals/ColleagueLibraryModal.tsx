import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import useStore from '../../store'
import { ILibrary } from '../../common/types'
import qs from 'qs'
import ColleagueLibraryTable from '../ColleagueLibraryTable'
import WorkSearchBar from '../WorkSearchBar'

type Props = {
  libraryId: number
}

const ColleagueLibraryModal = ({ libraryId } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const showColleagueLibraryModal = useStore(state => state.showColleagueLibraryModal)
  const setShowColleagueLibraryModal = useStore(state => state.setShowColleagueLibraryModal)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [library, setLibrary] = useState<ILibrary>()
  const [libraryWorks, setLibraryWorks] = useState<any>()

  useEffect(() => {
    getLibrary()
    getLibraryWorks()
  }, [libraryId])

  const getLibrary = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${libraryId}`,
        headers: { Authorization: `${accessToken}` }
      })
      setLibrary(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setLibraryWorks([])
    if (searchQuery.length === 0) {
      getLibraryWorks()
    }
    if (searchQuery.length > 0) {
      handleSearch()
    }
  }, [searchQuery])

  const handleSearch = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/search_library_works`,
        params: {
          library_work: { library_id: libraryId },
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

  const getLibraryWorks = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/library_works`,
        params: {
          library_work: { library_id: libraryId },
        },
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
        headers: { Authorization: `${accessToken}` }
      })
      setLibraryWorks(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Transition.Root show={showColleagueLibraryModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShowColleagueLibraryModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="mb-4 text-lg font-medium leading-6 text-gray-800">
                      {library?.attributes.name}
                    </Dialog.Title>
                    <WorkSearchBar placeholder='Search library' searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <div className="mt-4">
                      <ColleagueLibraryTable libraryWorks={libraryWorks} />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ColleagueLibraryModal
