import { FormEvent, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import useStore from '../store'
import { useLocation, useNavigate } from 'react-router-dom'

/*eslint no-control-regex: 0*/
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/

const SignInForm = () => {

  const setCurrentUser = useStore(state => state.setCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)

  const navigate = useNavigate()
  const location: any = useLocation()
  const from = location.state?.from?.pathname || '/mylibrary'

  const emailRef = useRef<any>()
  const errorRef = useRef<any>()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
  }, [pwd])

  useEffect(() => {
    setErrorMsg('')
  }, [email, pwd])

  const signInUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_HOST}/api/login`, {user: {email: email, password: pwd}})
      localStorage.setItem('accessToken', res.headers.authorization)
      setCurrentUser(res.data.data)
      setAccessToken(res.headers.authorization)
      if(res.data.data.libraries.length) {
        fetchAndSetCurrentLibrary(res.data.data.libraries[0].id)
      }
      setEmail('')
      setPwd('')
      navigate(from, { replace: true })
    } catch (err: any) {
      if (err?.response.status === 0) {
        setErrorMsg('No Server Response')
      } else if (err?.response.status === 401) {
        setErrorMsg('Invalid Email or Password')
      } else {
        setErrorMsg('Sign In Failed')
      }
      if (emailRef.current) {
        emailRef.current.focus()
      }
    }
  }

  const fetchAndSetCurrentLibrary = async (libraryId: number) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${libraryId}`,
        headers: { Authorization: `${localStorage.getItem('accessToken')}` }
      })
      localStorage.setItem('currentLibraryId', libraryId.toString())
      setCurrentLibrary(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <section className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='md:w-96 w-72 space-y-8'>
          <div>
            <h1 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-700'>
              Sign in to your account
            </h1>
          </div>

          <div>
            <div className={`p-1 bg-red-300 border rounded-md font-medium ${!errorMsg && 'hidden'}`}>
              <i className='fa-regular fa-circle-xmark px-2' />
              <span>{errorMsg}</span>
            </div>
          </div>

          <form className='mt-8 space-y-6' onSubmit={signInUser}>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email:
              </label>
              <input
                type='text'
                id='email'
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
                placeholder='Email address'
                ref={emailRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                aria-invalid={validEmail ? 'false' : 'true'}
                />
            </div>

            <div>
              <label htmlFor='password' className='sr-only'>
                Password:
              </label>
              <input
                type='password'
                id='password'
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
                placeholder='Password'
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
              />
            </div>

            <div className='text-sm text-right'>
              <p className='cursor-pointer font-medium text-sky-600 hover:text-sky-500'>
                Forgot your password?
              </p>
            </div>
            <div>
              <button
                disabled={!validEmail || !validPwd}
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:bg-gray-400'>
                  Sign In
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignInForm
