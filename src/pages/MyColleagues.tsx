import { useEffect, useState } from 'react'
import axios from 'axios'
import useStore from '../store'
import qs from 'qs';
import { IUser } from '../common/types';
import ColleagueCard from '../components/ColleagueCard';
import ColleagueSearchBar from '../components/ColleagueSearchBar';
import SearchColleaguesModal from '../components/modals/SearchColleaguesModal';
import ColleagueLibraryModal from '../components/modals/ColleagueLibraryModal';

const MyColleagues = () => {
  const accessToken = useStore(state => state.accessToken)
  const currentUser = useStore(state => state.currentUser)
  const showSearchColleaguesModal = useStore(state => state.showSearchColleaguesModal)
  const setShowSearchColleaguesModal = useStore(state => state.setShowSearchColleaguesModal)
  const showColleagueLibraryModal = useStore(state => state.showColleagueLibraryModal)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [colleagues, setColleagues] = useState<IUser[]>()

  const [colleagueLibraryId, setColleagueLibraryId] = useState<any>()

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
      {colleagueLibraryId && showColleagueLibraryModal && <ColleagueLibraryModal libraryId={colleagueLibraryId} />}
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
      <div className='flex flex-col pt-4'>
        {colleagues && colleagues.length == 0 && <p className="mt-12 text-center text-sm text-gray-700 font-bold">Not following any colleagues</p>}
        {colleagues && colleagues.map((followedUser: IUser) => (
          <ColleagueCard key={followedUser.id} user={followedUser} hideLibraries={false} getColleagues={getColleagues} setColleagueLibraryId={setColleagueLibraryId} />
        ))}
      </div>
    </div>
  )
}

export default MyColleagues
