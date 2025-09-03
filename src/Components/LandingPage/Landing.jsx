import React from 'react'
import Nav from '../NavBar/Nav'
import HeroSection from './HeroSection'
import TrustMarker from './TrustMarker'
import Spline from '@splinetool/react-spline';

const Landing = () => {
  return (
    <div className='h-[100vh] w-full relative'>   
      {/* <HeroSection/>
      <TrustMarker/> */}
      <Spline
        scene="https://prod.spline.design/pQvdLh2OB5RpEZ14/scene.splinecode" 
      />
      <div className='absolute h-[60px] w-full bottom-0 bg-white'></div>
    </div>
  )
}

export default Landing
