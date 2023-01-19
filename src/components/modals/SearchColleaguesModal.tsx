import { FormEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import useStore from '../../store'
import ColleagueSearchBar from '../ColleagueSearchBar'
import { IUser } from '../../common/types'
import qs from 'qs'
import ColleagueCard from '../ColleagueCard'

type Props = {
  getColleagues: () => void
}

const SearchColleaguesModal = ({ getColleagues } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)
  const getAndSetCurrentUser = useStore(state => state.getAndSetCurrentUser)
  const showSearchColleaguesModal = useStore(state => state.showSearchColleaguesModal)
  const setShowSearchColleaguesModal = useStore(state => state.setShowSearchColleaguesModal)

  const [colleagues, setColleagues] = useState<IUser[]>()
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    searchColleagues()
  }, [searchQuery])

  const searchColleagues = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/search_all_colleagues`,
        params: {
          works_query: { query: searchQuery }
        },
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
        headers: { Authorization: `${accessToken}` }
      })
      setColleagues(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchSubmit = (e: any) => {
    e.preventDefault()
    searchColleagues()
  }

  return (
    <Transition.Root show={showSearchColleaguesModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShowSearchColleaguesModal(false)}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-800">
                      Search Colleagues
                    </Dialog.Title>
                    <div className="mt-2">
                      <form className='text-center' onSubmit={(e) => handleSearchSubmit(e)}>
                        <ColleagueSearchBar placeholder='Search your colleagues' searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                {colleagues && colleagues.map((followedUser: IUser) => (
                  <ColleagueCard key={followedUser.id} user={followedUser} hideLibraries={true} getColleagues={getColleagues} />
                ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SearchColleaguesModal
