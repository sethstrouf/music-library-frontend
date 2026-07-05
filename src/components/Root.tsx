import { BrowserRouter } from 'react-router-dom'
import MainRouter from '../routes/MainRouter'
import Footer from './Footer'
import NavBarSignedOut from './NavBarSignedOut'
import NavBarSignedIn from './NavBarSignedIn'
import useStore from '../store'

const Root = () => {
  const currentUser = useStore((state) => state.currentUser)

  return (
    <div className="flex min-h-screen flex-col">
      <BrowserRouter>
        <nav>{currentUser ? <NavBarSignedIn /> : <NavBarSignedOut />}</nav>
        <main className="mx-auto w-full max-w-7xl flex-grow px-4 sm:px-6 lg:px-8">
          <MainRouter />
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default Root
