import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from '../routes/MainRouter'
import Footer from './Footer'
import NavBar from './NavBar'
import NavBarUnauth from './NavBarUnauth'

const Root = () => {
  return (
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <BrowserRouter>
      <nav>
        <NavBarUnauth />
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
