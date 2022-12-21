import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import axios from 'axios'
import useStore from '../store'
import { IUser } from '../common/types'

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

const MyLibrary = () => {

  const accessToken = useStore(state => state.accessToken)
  const users = useStore(state => state.users)
  const setUsers = useStore(state => state.setUsers)

  const checkbox = useRef<any>();
  const [checked, setChecked] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any[]>([])


  useEffect(() => {
    document.title = 'My Library'
  }, [])

  const getUsers = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/users`,
        headers: { Authorization: `${accessToken}` }
      })
      setUsers(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!users?.length) {
      getUsers()
    }
    // eslint-disable-next-line
  }, [])

  useLayoutEffect(() => {
    const isIndeterminate = users !== null && selectedUser.length > 0 && selectedUser.length < users.length
    users !== null && setChecked(selectedUser.length === users.length)
    setIndeterminate(isIndeterminate)
    if(checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedUser])

  function toggleAll() {
    users !== null && setSelectedUser(checked || indeterminate ? [] : users)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">My Library</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all works currently in your library.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
        <div className="mt-8 flex flex-col">
      {users?.length
      ?
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {selectedUser.length > 0 && (
                  <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Bulk edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 sm:left-6"
                          ref={checkbox}
                          checked={checked}
                          onChange={toggleAll}
                        />
                      </th>
                      <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users?.map((user) => (
                      <tr key={user.id} className={selectedUser.includes(user) ? 'bg-gray-50' : undefined}>
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedUser.includes(user) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-sky-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 sm:left-6"
                            value={user.email}
                            checked={selectedUser.includes(user)}
                            onChange={(e) =>
                              setSelectedUser(
                                e.target.checked
                                  ? [...selectedUser, user]
                                  : selectedUser.filter((p) => p !== user)
                              )
                            }
                          />
                        </td>
                        <td
                          className={classNames(
                            'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                            selectedUser.includes(user) ? 'text-sky-600' : 'text-gray-900'
                          )}
                        >
                          {user.attributes.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.attributes.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.attributes.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.id}</td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-sky-600 hover:text-sky-900">
                            Edit<span className="sr-only">, {user.attributes.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      :
        <p className="mt-2 text-sm text-gray-700 font-bold">
          Your library is empty! Add a work to begin using Songsemble.
        </p>
      }
        </div>
    </div>
  )
}

export default MyLibrary
