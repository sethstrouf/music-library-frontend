import { FormEvent, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import useStore from '../store'
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'qs'
import { alertService } from '../services/alert'

/*eslint no-control-regex: 0*/
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/

const SignInForm = () => {

  const setCurrentUser = useStore(state => state.setCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)
  const getAndSetCurrentLibrary = useStore(state => state.getAndSetCurrentLibrary)

  const navigate = useNavigate()
  const location: any = useLocation()
  const from = location.state?.from?.pathname || '/mylibrary'

  const emailRef = useRef<any>()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  const queryParams = new URLSearchParams(window.location.search)
  const emailParam = queryParams.get("email")
  const passwordParam = queryParams.get("password")

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()
    }
    if (emailParam) {
      setEmail(emailParam)
    }
    if (passwordParam) {
      setPwd(passwordParam)
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
        getAndSetCurrentLibrary(res.data.data.libraries[0].id)
      }
      setEmail('')
      setPwd('')
      navigate(from, { replace: true })
    } catch (err: any) {
      if (err?.response.status === 0) {
        setErrorMsg('Unable to reach the server. Please try again.')
      } else if (err?.response.status === 401) {
        setErrorMsg('Incorrect email or password.')
      } else {
        setErrorMsg('Sign-in failed. Please try again.')
      }
      if (emailRef.current) {
        emailRef.current.focus()
      }
    }
  }

  const sendResetPasswordEmail = async () => {
    if (email != '' && validEmail) {
      try {
        await axios({
          method: 'post',
          url: `${import.meta.env.VITE_API_HOST}/api/v1/reset_password`,
          params: { email: email },
          paramsSerializer: (params) => {
            return qs.stringify(params)
          },
        })
        alertService.showSuccess('Check your email for a password reset link.')
      } catch (error) {
        console.error(error)
      }
    } else {
      setErrorMsg('Enter a valid email address to reset your password.')
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-12">
      <div className="auth-card">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to manage your libraries</p>
        </div>

        {errorMsg && (
          <div className="alert-error" role="alert">
            {errorMsg}
          </div>
        )}

        <form className="space-y-5" onSubmit={signInUser}>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="text"
              id="email"
              className="input-field"
              placeholder="Email address"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              value={email}
            />
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
              value={pwd}
            />
          </div>

          <div className="text-right">
            <button type="button" onClick={() => sendResetPasswordEmail()} className="text-link text-sm">
              Forgot password?
            </button>
          </div>

          <button type="submit" disabled={!validEmail || !validPwd} className="btn-primary w-full py-2.5">
            Sign in
          </button>
        </form>
      </div>
    </section>
  )
}

export default SignInForm
