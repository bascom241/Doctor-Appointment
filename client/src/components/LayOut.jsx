
import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LayOut = () => {
  return (
    <div>
      <Header/>
      <ToastContainer/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default LayOut
