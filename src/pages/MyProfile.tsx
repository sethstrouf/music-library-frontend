import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { alertService } from '../services/alert'
import useStore from '../store'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/

const MyProfile = () => {
  const currentUser = useStore(state => state.currentUser)
  const accessToken = useStore(state => state.accessToken)
  const setCurrentUser = useStore(state => state.setCurrentUser)

  const [firstName, setFirstName] = useState(currentUser?.first_name)
  const [lastName, setLastName] = useState(currentUser?.last_name)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [confirmPwd, setConfirmPwd] = useState('')
  const [validConfirmPwd, setValidConfirmPwd] = useState(false)

  useEffect(() => {
    document.title = 'User Profile'
  }, [])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
  }, [pwd])

  useEffect(() => {
    setValidConfirmPwd(PWD_REGEX.test(confirmPwd))
  }, [confirmPwd])

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios({
          method: 'patch',
          url: `${import.meta.env.VITE_API_HOST}/api/signup`,
          data: {user: {first_name: firstName, last_name: lastName}},
          headers: { Authorization: `${accessToken}` }
        })
      alertService.showSuccess('Your profile has updated successfully!')
      setCurrentUser(res.data.data)
    } catch (err: any) {
      alertService.showError('Update failed')
      console.error(err);
    }
  }

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios({
          method: 'patch',
          url: `${import.meta.env.VITE_API_HOST}/api/signup`,
          data: { user: { password: pwd, password_confirmation: confirmPwd } },
          headers: { Authorization: `${accessToken}` }
        })
      alertService.showSuccess('Your password has been changed!')
      setCurrentUser(res.data.data)
    } catch (err: any) {
      alertService.showError('Password change failed')
      console.error(err);
    }
  }

  const handleImageUpload = async (e: any) => {
    const photo = e.target.files[0]
    if (photo.type == 'image/jpeg' || photo.type == 'image/png' ) {
      const formData = new FormData();
      formData.append("photo", photo);
      try {
        await axios({
          method: 'patch',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/users/${currentUser!.id}`,
          data: formData,
          headers: { Authorization: `${accessToken}` }
        })
        updateCurrentUser()
      } catch (err) {
        console.error(err)
      }
    } else {
      alertService.showError('File must be jpg or png')
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
    <div className='mx-auto py-12 w-10/12 md:w-8/12 lg:w-6/12'>
          <div className="p-8 bg-white shadow-md rounded-md">
            <div className='pb-5 border-b border-1 border-gray-200'>
              <h3 className="text-lg font-medium leading-6 text-gray-800">Profile Photo</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This photo wil be visible by all users.
              </p>
            </div>
            <div className='my-4'>
              {currentUser!.profile_photo_url
              ?
                <img className="h-32 w-32 rounded-md" src={currentUser!.profile_photo_url} alt="" />
              :
                <div className='block h-32 w-32 text-center text-2xl rounded-md text-gray-600 font-bold border border-gray-700 bg-gray-200'>
                  <span className='block mt-11'>{currentUser !== null && currentUser.first_name[0] + currentUser.last_name[0]}</span>
                </div>
              }
            </div>
            <input className="pt-2" type="file" name="newImage"accept="image/png, image/jpeg" onChange={(e) => handleImageUpload(e)} />
          </div>

      <form onSubmit={updateUser} className="mt-12 space-y-8 divide-y divide-gray-200 p-8 bg-white shadow-md rounded-md">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-800">Profile</h3>
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={changePassword} className="mt-12 space-y-8 divide-y divide-gray-200 p-8 bg-white shadow-md rounded-md">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-800">Change Password</h3>
              <ul className='mt-1 max-w-2xl text-sm text-gray-500 list-disc ml-6'>
                <li>8 to 25 characters.</li>
                <li>Must include uppercase and lowercase letters, a number, and a special character.</li>
                <li>Allowed special characters:
                  <span aria-label='exclamation mark'> !</span>
                  <span aria-label='at symbol'> @</span>
                  <span aria-label='hashtag'> #</span>
                  <span aria-label='dollar sign'> $</span>
                  <span aria-label='percent'> %</span>
                </li>
              </ul>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Change Password
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
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
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={(!validPwd || !validConfirmPwd) || (pwd !== confirmPwd) || (pwd.length === 0 || confirmPwd.length === 0)}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-gray-400"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MyProfile
