import React, { useEffect } from 'react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import Root from "./components/Root"
import {ToastContainer, Slide} from "react-toastify"
import useStore from './store';

const App = () => {

  const getApiToken = useStore(state => state.getApiToken)
  const isApiAuthorized = useStore(state => state.isApiAuthorized)

  useEffect(() => {
    getApiToken()
    // eslint-disable-next-line
  }, [])

  return (
        <>
        {!isApiAuthorized ? (
          <div>Loading...</div>
          ) : (
          <>
            <Root />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              closeOnClick
              draggable
              pauseOnFocusLoss={false}
              pauseOnHover={false}
              transition={Slide}
            />
          </>
        )}
      </>
  )
}

export default App
