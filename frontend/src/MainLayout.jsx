import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='flex-1'>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout