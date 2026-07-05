import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { alertService } from '../services/alert'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/

const ResetPassword = () => {
  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [confirmPwd, setConfirmPwd] = useState('')
  const [validConfirmPwd, setValidConfirmPwd] = useState(false)

  const queryParams = new URLSearchParams(window.location.search)
  const token = queryParams.get("token")

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Reset Password — Songsemble'
  }, [])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
  }, [pwd])

  useEffect(() => {
    setValidConfirmPwd(PWD_REGEX.test(confirmPwd))
  }, [confirmPwd])

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (pwd == confirmPwd) {
      try {
        const res = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_HOST}/api/v1/update_password`,
            data: { reset_token: token, password: pwd },
          })
        alertService.showSuccess('Password reset. You can sign in with your new password.')
        navigate(`/signin?email=${res.data.data.attributes.email}`)
      } catch (err: any) {
        console.error(err);
        alertService.showError('This reset link has expired. Request a new one from the sign-in page.')
      }
    }
  }

  return (
    <>
      <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <form onSubmit={changePassword} className="mt-12 space-y-8 divide-y divide-gray-200 p-8 bg-white shadow-md rounded-md">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Choose a new password</h3>
                  <ul className="mt-2 ml-6 list-disc text-sm text-slate-500">
                    <li>8 to 25 characters</li>
                    <li>Include uppercase and lowercase letters, a number, and a special character</li>
                    <li>Allowed special characters: ! @ # $ %</li>
                  </ul>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    New password
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
                    Confirm password
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
                    Reset password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
