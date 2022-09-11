import React, { FormEvent, useState, useRef, useEffect } from 'react'
import { alertService } from '../services/alert'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/

const SubscribeForm = () => {

  const emailRef = useRef<any>()
  const errorRef = useRef<any>()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_HOST}/api/signup`, {user: {email: email, password: pwd}}, {withCredentials: true})
      alertService.showSuccess('Subscribed! Welcome!')
      localStorage.setItem('user', JSON.stringify(res.data.data))
    } catch (err: any) {
      if (err?.response.status === 0) {
        setErrorMsg('No Server Response')
      } else if (err?.response.data['email'][0] === 'has already been taken') {
        setErrorMsg('Email Already Used')
      } else {
        setErrorMsg('Registration Failed')
      }
      errorRef.current.focus()
    }
  }

  return (
    <>
      <section>
        <h1 className='text-2xl text-center'>Register</h1>
        <p ref={errorRef} className={errorMsg ? 'text-red-600 font-bold text-lg text-center' : 'hidden'} aria-live='assertive'>
          {errorMsg}
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>
              Email:
              <i className={validEmail ? 'fa-solid fa-check px-1 text-green-600' : 'hidden'}></i>
              <i className={!validEmail && email ? 'fa-solid fa-circle-xmark px-1 text-red-600' : 'hidden'}></i>
            </label>
            <input
              type='text'
              id='email'
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby='emailidnote'
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              />
            <p id='emailidnote' className={emailFocus && email && !validEmail ? '' : 'hidden'} >
              <i className='fa-solid fa-circle-info pr-1' />
              Enter a valid email address.
            </p>
          </div>

          <div>
            <label htmlFor='password'>
              Password:
              <i className={validPwd ? 'fa-solid fa-check px-1 text-green-600' : 'hidden'}></i>
              <i className={!validPwd && pwd ? 'fa-solid fa-circle-xmark px-1 text-red-600' : 'hidden'}></i>
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              />
            <p id='emailidnote' className={pwdFocus && !validPwd ? '' : 'hidden'} >
              <i className='fa-solid fa-circle-info pr-1' />
              8 to 25 characters.<br />
              Must include uppercase and lowercase letters, a number, and a special character.<br />
              Allowed special characters:
              <span aria-label='exclamation mark'> !</span>
              <span aria-label='at symbol'> @</span>
              <span aria-label='hashtag'> #</span>
              <span aria-label='dollar sign'> $</span>
              <span aria-label='percent'> %</span>
            </p>
          </div>

          <button disabled={!validEmail || !validPwd} className='py-1 px-2 border rounded-lg bg-blue-300 disabled:bg-gray-300'>Sign Up</button>
        </form>

        <p>Already registered?</p>
        <NavLink to={'/signin'} className='underline hover:text-gray-600'>Sign In</NavLink>
      </section>
    </>
  )
}

export default SubscribeForm
