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
      alertService.showSuccess('Welcome to Songsemble!')
      localStorage.setItem('accessToken', res.headers.authorization)
      setCurrentUser(res.data.data)
      setAccessToken(res.headers.authorization)
      setEmail('')
      setPwd('')
      navigate('/mylibrary', { replace: true })
    } catch (err: any) {
      if (err?.response.status === 0) {
        setErrorMsg('Unable to reach the server. Please try again.')
      } else if (err?.response.status === 400) {
        setErrorMsg('That email is already registered.')
      } else {
        setErrorMsg('Registration failed. Please try again.')
      }
      errorRef.current.focus()
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="auth-card">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600">Free to start — no credit card required</p>
        </div>

        {errorMsg && (
          <div className="alert-error" role="alert" ref={errorRef} tabIndex={-1}>
            {errorMsg}
          </div>
        )}

        <form className="space-y-4" onSubmit={registerUser}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="sr-only">First name</label>
              <input
                type="text"
                id="firstName"
                className="input-field"
                placeholder="First name"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last name</label>
              <input
                type="text"
                id="lastName"
                className="input-field"
                placeholder="Last name"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="text"
              id="email"
              className="input-field"
              placeholder="Email address"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="emailidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            {emailFocus && !validEmail && email && (
              <p id="emailidnote" className="alert-hint">Enter a valid email address.</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {pwdFocus && !validPwd && (
              <div id="pwdnote" className="alert-hint">
                <ul className="ml-4 list-disc space-y-1">
                  <li>8 to 25 characters</li>
                  <li>Uppercase, lowercase, number, and special character (! @ # $ %)</li>
                </ul>
              </div>
            )}
          </div>

          <button type="submit" disabled={!validEmail || !validPwd} className="btn-primary w-full py-2.5">
            Create account
          </button>
        </form>
      </div>
    </section>
  )
}

export default SubscribeForm
