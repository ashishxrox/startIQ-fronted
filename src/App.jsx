import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ToastProvider } from "./context/ContextToast";
import Landing from './Components/LandingPage/Landing'
import Footer from './Components/Footer/Footer'
import Nav from './Components/NavBar/Nav'
import Auth from './Components/AuthPage/Auth'
import RoleSelection from './Components/AuthPage/RoleSelection'
import Registration from './Components/AuthPage/Registration'
import InvestorReg from './Components/AuthPage/InvestorReg'
import DocumentUpload from './Components/AuthPage/DocumentUpload'
import DashboardLayout from './Components/Dashboard/DasboardLayout'
import StartupListingPage from './Components/ListingPage/StartupListingPage'

const App = () => {
  return (
    <div className='w-[100%] overflow-x-hidden'>
      <BrowserRouter>
        <ToastProvider>
          <Nav />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/role-selection' element={<RoleSelection />} />
            <Route path='/registration/startup' element={<Registration />} />
            <Route path='/registration/investor' element={<InvestorReg />} />
            <Route path='/registration/startup/docs' element={<DocumentUpload />} />
            <Route path='/dashboard/startup/' element={<DashboardLayout />} />
            <Route path='/dashboard/:uid' element={<DashboardLayout />} />
            <Route path='/listing-page' element={<StartupListingPage />} />
          </Routes>
          <Footer />
        </ToastProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
