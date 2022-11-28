import { BrowserRouter } from 'react-router-dom'
import MainRouter from '../routes/MainRouter'
import Footer from './Footer'
import NavBarSignedOut from './NavBarSignedOut'
import NavBarSignedIn from './NavBarSignedIn'
import useStore from '../store';
import { useEffect } from 'react'
import axios from 'axios'

const Root = () => {

  const currentUser = useStore(state => state.currentUser)

  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
      <nav>
        {currentUser ?
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
