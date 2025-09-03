import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Landing from './Components/LandingPage/Landing'
import Footer from './Components/Footer/Footer'
import Nav from './Components/NavBar/Nav'
import Auth from './Components/AuthPage/Auth'
import RoleSelection from './Components/AuthPage/RoleSelection'
import Registration from './Components/AuthPage/Registration'
import InvestorReg from './Components/AuthPage/InvestorReg'

const App = () => {
  return (
    <div className='w-[100%] overflow-x-hidden'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/role-selection' element={<RoleSelection />} />
          <Route path='/registration/startup' element={<Registration />} />
          <Route path='/registration/investor' element={<InvestorReg />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
