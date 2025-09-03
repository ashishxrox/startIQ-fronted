import React from 'react'
import Nav from '../NavBar/Nav'
import HeroSection from './HeroSection'
import TrustMarker from './TrustMarker'

const Landing = () => {
  return (
    <div className='h-[140vh] w-full'>   
      <HeroSection/>
      <TrustMarker/>
    </div>
  )
}

export default Landing
