import { FormEvent, useState, useRef, useEffect } from 'react'
import { alertService } from '../services/alert'
import axios from 'axios'
import useStore from '../store'
import { useNavigate } from 'react-router-dom'

/*eslint no-control-regex: 0*/
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/

const SubscribeForm = () => {

  const setCurrentUser = useStore(state => state.setCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)

  const navigate = useNavigate()

  const emailRef = useRef<any>()
  const errorRef = useRef<any>()

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

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

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_HOST}/api/signup`, {user: {email: email, password: pwd, first_name: firstName, last_name: lastName}}, {withCredentials: true})
      alertService.showSuccess('Subscribed! Welcome!')
      localStorage.setItem('accessToken', res.headers.authorization)
      setCurrentUser(res.data.data)
      setAccessToken(res.headers.authorization)
      setEmail('')
      setPwd('')
      navigate('/mylibrary', { replace: true })
    } catch (err: any) {
      if (err?.response.status === 0) {
        setErrorMsg('No Server Response')
      } else if (err?.response.status === 400) {
        setErrorMsg('Email Already Used')
      } else {
        setErrorMsg('Registration Failed')
      }
      errorRef.current.focus()
    }
  }

  return (
    <>
      <section className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='md:w-96 w-72 space-y-8'>
          <div>
            <h1 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-700'>
              Register your account
            </h1>
          </div>

          <div>
            <div className={`p-1 bg-red-300 border rounded-md font-medium ${!errorMsg && 'hidden'}`}>
              <i className='fa-regular fa-circle-xmark px-2' />
              <span>{errorMsg}</span>
            </div>
          </div>

          <form className='mt-8 space-y-6' onSubmit={registerUser}>
            <div>
              <label htmlFor='firstName' className='sr-only'>
                First Name:
              </label>
              <input
                type='text'
                id='firstName'
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
                placeholder='First name'
                autoComplete='off'
                onChange={(e) => setFirstName(e.target.value)}
                required
                />
            </div>

            <div>
              <label htmlFor='lastName' className='sr-only'>
                Last Name:
              </label>
              <input
                type='text'
                id='lastName'
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
                placeholder='Last name'
                autoComplete='off'
                onChange={(e) => setLastName(e.target.value)}
                required
                />
            </div>

            <div>
              <label htmlFor='email' className='sr-only'>
                Email:
              </label>
              <input
                type='text'
                id='email'
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none sm:text-sm'
                placeholder='Email address'
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                aria-invalid={validEmail ? 'false' : 'true'}
                aria-describedby='emailidnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                />
              <p id='emailidnote' className={`max-w-fit min-w-full border rounded-md p-1 pl-2 mt-1 text-sm bg-gray-700 text-gray-50 ${(!emailFocus || validEmail || !email) && 'hidden'}`}>
                Enter a valid email address.
              </p>
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
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <div id='pwdnote' className={`max-w-fit min-w-full border rounded-md p-1 mt-1 text-sm bg-gray-700 text-gray-50 ${(!pwdFocus || validPwd) && 'hidden'}`}>
                <ul className='list-disc ml-6'>
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
            </div>

            <div>
              <button
                disabled={!validEmail || !validPwd}
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:bg-gray-400'>
                  Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default SubscribeForm
