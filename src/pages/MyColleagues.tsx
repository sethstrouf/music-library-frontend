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
    <div className="page-container">
      {showSearchColleaguesModal && <SearchColleaguesModal getColleagues={getColleagues} />}
      {colleagueLibraryId && showColleagueLibraryModal && <ColleagueLibraryModal libraryId={colleagueLibraryId} />}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">My Colleagues</h1>
          <p className="page-subtitle">Follow other directors and explore their repertoire.</p>
        </div>
        <button type="button" className="btn-primary whitespace-nowrap" onClick={() => setShowSearchColleaguesModal(true)}>
          Find colleagues
        </button>
      </div>

      <form className="mt-8" onSubmit={(e) => handleSearchSubmit(e)}>
        <ColleagueSearchBar placeholder="Search by name…" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </form>

      <div className="mt-8 space-y-4">
        {colleagues && colleagues.length === 0 && (
          <div className="card text-center">
            <p className="text-slate-600">You&apos;re not following anyone yet. Search for colleagues to connect.</p>
          </div>
        )}
        {colleagues?.map((followedUser: IUser) => (
          <ColleagueCard
            key={followedUser.id}
            user={followedUser}
            hideLibraries={false}
            getColleagues={getColleagues}
            setColleagueLibraryId={setColleagueLibraryId}
          />
        ))}
      </div>
    </div>
  )
}

export default MyColleagues
