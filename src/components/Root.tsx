import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from '../routes/MainRouter'
import Footer from './Footer'
import NavBarSignedOut from './NavBarSignedOut'
import NavBarSignedIn from './NavBarSignedIn'
import useStore from '../store';

const Root = () => {

  const authUser = useStore(state => state.authUser)

  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
      <nav>
        {authUser ?
          <NavBarSignedIn />
          :
          <NavBarSignedOut />
        }
      </nav>
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
