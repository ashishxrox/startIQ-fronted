import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from './Components/LandingPage/Landing'
import Footer from './Components/Footer/Footer'
import Nav from './Components/NavBar/Nav'
import Auth from './Components/AuthPage/Auth'

const App = () => {
  return (
    <div className='w-[100%] overflow-x-hidden'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
