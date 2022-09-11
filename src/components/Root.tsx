import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from '../routes/MainRouter'
import Footer from './Footer'
import NavBarSignedOut from './NavBarSignedOut'
import NavBarSignedIn from './NavBarSignedIn'
import useStore from '../store';

const Root = () => {

  const getCurrentUser = useStore(state => state.getCurrentUser)
  const currentUser = useStore(state => state.currentUser)

  useEffect(() => {
    getCurrentUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <BrowserRouter>
      {currentUser ?
        <p className='text-center text-3xl font-bold text-pink-600'>{currentUser.email}</p>
        :
        <p className='text-center text-3xl font-bold text-pink-600'>No current user</p>
      }
      <nav>
        {currentUser ?
          <NavBarSignedIn />
          :
          <NavBarSignedOut />
        }
      </nav>
        {/* <NavBar /> */}
      <main className='flex-grow max-w-7xl mx-auto'>
        <MainRouter />
      </main>
      <footer className='p-8 md:mt-0 md:order-1'>
        <Footer />
      </footer>
      </BrowserRouter>
    </div>
  )
}

export default Root
