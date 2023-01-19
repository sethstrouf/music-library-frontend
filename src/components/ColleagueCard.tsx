import axios from "axios"
import qs from "qs"
import { IUser } from "../common/types"
import useStore from "../store"
import ColleagueLibrarySelect from "./ColleagueLibrarySelect"

type Props = {
  user: IUser
  hideLibraries: boolean
  getColleagues: () => void
}

const ColleagueCard = ({ user, hideLibraries, getColleagues } : Props) => {
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
    <div className="border-t border-r border-l rounded-md border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-col flex-wrap items-center justify-between md:flex-row md:flex-nowrap">
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-2">
            {user?.attributes.profile_photo_url
              ?
                <img className="inline -mt-2 -mb-2 h-12 w-12 font-bold border border-gray-700 rounded-full" src={user!.attributes.profile_photo_url} alt="" />
              :
                <span className="p-3 text-gray-600 font-bold border border-gray-700 rounded-full bg-gray-200 group-hover:bg-gray-300">{user !== null && user.attributes.first_name[0] + user.attributes.last_name[0]}</span>
            }
            </div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">{user.attributes.name}</h3>
              <p className="text-sm text-gray-500 hover:text-gray-600">
                <a href={`mailto:${user.attributes.email}`}>{user.attributes.email}</a>
              </p>
            </div>
          </div>
        </div>
        {!hideLibraries
          ?
            <div className="flex flex-col mt-4">
              {user.attributes.libraries.length == 0
              ?
              <p className="text-sm t0ext-gray-800">This colleague does not have a library.</p>
              :
                <ColleagueLibrarySelect user={user} />
              }
            </div>
          :
            <div className="ml-16"></div>
        }
        <div className="ml-4 mt-4 flex flex-shrink-0">
          {isFollowingColleague(user)
          ?
            <button
            type="button"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600"
            onClick={() => unfollow(user)}
          >
            <i className="fa-solid fa-user-minus mt-1 mr-2 h-4 w-4 text-white"></i>
            <span>Unfollow</span>
          </button>

          :
          <button
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600"
          onClick={() => follow(user)}
        >
          <i className="fa-solid fa-user-plus mt-1 mr-2 h-4 w-4 text-white"></i>
          <span>Follow</span>
        </button>
          }


        </div>
      </div>
    </div>
  )
}

export default ColleagueCard
