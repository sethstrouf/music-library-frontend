import axios from "axios"
import qs from "qs"
import { IUser } from "../common/types"
import useStore from "../store"
import ColleagueLibrarySelect from "./ColleagueLibrarySelect"

type Props = {
  user: IUser
  hideLibraries: boolean
  getColleagues: () => void
  setColleagueLibraryId: (active: any) => void
}

const ColleagueCard = ({ user, hideLibraries, getColleagues, setColleagueLibraryId } : Props) => {
  const accessToken = useStore(state => state.accessToken)
  const currentUser = useStore(state => state.currentUser)
  const getAndSetCurrentUser = useStore(state => state.getAndSetCurrentUser)

  const isFollowingColleague = (colleage: IUser) => {
    let found = false
    currentUser?.following.forEach((follow) => {
      if (follow.id == colleage.id) {
        found = true
        return
      }
    })

    if (found) {
      return true
    } else {
      return false
    }
  }

  const unfollow = async (user: IUser) => {
    try {
      await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/relationships/${user.id}`,
        headers: { Authorization: `${accessToken}` },
        withCredentials: true
      })
      getAndSetCurrentUser()
      getColleagues()
    } catch (error) {
      console.error(error)
    }
  }

  const follow = async (user: IUser) => {
    try {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/relationships`,
        params: { followed_id: user.id },
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
        headers: { Authorization: `${accessToken}` },
        withCredentials: true
      })
      getAndSetCurrentUser()
      getColleagues()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="card">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {user?.attributes.profile_photo_url ? (
            <img
              className="h-12 w-12 rounded-full border-2 border-slate-200 object-cover"
              src={user.attributes.profile_photo_url}
              alt=""
            />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
              {user.attributes.first_name[0]}
              {user.attributes.last_name[0]}
            </span>
          )}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{user.attributes.name}</h3>
            <a href={`mailto:${user.attributes.email}`} className="text-sm text-slate-500 hover:text-brand-600">
              {user.attributes.email}
            </a>
          </div>
        </div>

        {!hideLibraries && (
          <div className="md:mx-4">
            {user.attributes.libraries.length === 0 ? (
              <p className="text-sm text-slate-500">No libraries yet.</p>
            ) : (
              <ColleagueLibrarySelect user={user} setColleagueLibraryId={setColleagueLibraryId} />
            )}
          </div>
        )}

        <div>
          {isFollowingColleague(user) ? (
            <button type="button" className="btn-danger" onClick={() => unfollow(user)}>
              Unfollow
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={() => follow(user)}>
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ColleagueCard
