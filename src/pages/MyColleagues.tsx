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
import { IUser } from '../common/types';
import ColleagueCard from '../components/ColleagueCard';
import ColleagueSearchBar from '../components/ColleagueSearchBar';
import SearchColleaguesModal from '../components/modals/SearchColleaguesModal';

const MyColleagues = () => {
  const accessToken = useStore(state => state.accessToken)
  const currentUser = useStore(state => state.currentUser)
  const libraryWorks = useStore(state => state.libraryWorks)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const libraryWorksMeta = useStore(state => state.libraryWorksMeta)
  const getAndSetLibraryWorks = useStore(state=> state.getAndSetLibraryWorks)
  const currentLibrary = useStore(state => state.currentLibrary)
  const getAndSetCurrentLibrary = useStore(state => state.getAndSetCurrentLibrary)
  const showChangeLibraryNameModal = useStore(state => state.showChangeLibraryNameModal)
  const setShowChangeLibraryNameModal = useStore(state => state.setShowChangeLibraryNameModal)
  const showAddLibraryModal = useStore(state => state.showAddLibraryModal)
  const setShowAddLibraryModal = useStore(state => state.setShowAddLibraryModal)
  const showSearchColleaguesModal = useStore(state => state.showSearchColleaguesModal)
  const setShowSearchColleaguesModal = useStore(state => state.setShowSearchColleaguesModal)

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(25)
  const [selectedLibraryWorks, setSelectedLibraryWorks] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [colleagues, setColleagues] = useState<IUser[]>()

  useEffect(() => {
    document.title = 'My Colleagues'
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchColleagues()
    } else {
      getColleagues()
    }
  }, [searchQuery])

  const getColleagues = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/users/${currentUser?.id}/following`,
        headers: { Authorization: `${localStorage.getItem('accessToken')}` }
      })
      setColleagues(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const searchColleagues = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/search_following_colleagues`,
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
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {showSearchColleaguesModal && <SearchColleaguesModal getColleagues={getColleagues} />}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">My Colleagues</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setShowSearchColleaguesModal(true)}
            >
            + Search for colleagues
          </button>
        </div>
      </div>
      <div className='pt-8'>
        <form className='text-center' onSubmit={(e) => handleSearchSubmit(e)}>
          <ColleagueSearchBar placeholder='Search your colleagues' searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </form>
      </div>
      <div className='pt-8'>
        <PaginationBar perPage={perPage} setPerPage={setPerPage} setPage={setPage} />
      </div>
      <div className='flex flex-col'>
        {colleagues && colleagues.length == 0 && <p className="mt-12 text-center text-sm text-gray-700 font-bold">Not following any colleagues</p>}
        {colleagues && colleagues.map((followedUser: IUser) => (
          <ColleagueCard key={followedUser.id} user={followedUser} hideLibraries={false} getColleagues={getColleagues} />
        ))}
      </div>
    </div>
  )
}

export default MyColleagues
