import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Root from "./components/Root"
import {ToastContainer} from "react-toastify";

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_API_HOST);

const App = () => (
  <>
    <Root />
    <ToastContainer/>
  </>
)

export default App
