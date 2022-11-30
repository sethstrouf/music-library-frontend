import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { alertService } from '../services/alert'
import useStore from '../store'

const MyProfile = () => {
  const currentUser = useStore(state => state.currentUser)
  const accessToken = useStore(state => state.accessToken)
  const setCurrentUser = useStore(state => state.setCurrentUser)

  const [firstName, setFirstName] = useState(currentUser?.first_name)
  const [lastName, setLastName] = useState(currentUser?.last_name)

  useEffect(() => {
    document.title = 'User Profile'
  }, [])

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios({
          method: 'patch',
          url: `${import.meta.env.VITE_API_HOST}/api/signup`,
          data: {user: {first_name: firstName, last_name: lastName}},
          headers: { Authorization: `${accessToken}` },
          withCredentials: true
        })
      alertService.showSuccess('Your profile has updated successfully!')
      setCurrentUser(res.data.data)
    } catch (err: any) {
      alertService.showError('Update failed')
      console.error(err);
    }
  }

return (
    <form onSubmit={updateUser} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Email Address
            </label>
            <div className="mt-2 sm:mt-0">
              <div className="mt-2 flex rounded-md">
                <span>
                  {currentUser?.email}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              First name
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Last name
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Change Password
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="password"
                id="password"
                autoComplete="family-name"
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Confirm Password
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="confirm-password"
                id="confirm-password"
                autoComplete="family-name"
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default MyProfile
