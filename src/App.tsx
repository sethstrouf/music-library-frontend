import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Root from "./components/Root"
import {ToastContainer, Slide} from "react-toastify";

const App = () => (
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
)

export default App
