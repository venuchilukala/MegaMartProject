import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>
      <div className='flex-grow pt-16'>
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Main
