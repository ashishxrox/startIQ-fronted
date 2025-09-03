import React from 'react'

const HeroSection = () => {
  return (
    <div className='h-[95vh] w-full flex justify-evenly items-center flex-col'>
      <div className='h-[8%] w-[20%] bg-[#808080]'></div>
      <div className='h-[40%] w-[50%] bg-[#808080]'></div>
      <div className='h-[8%] w-[50%] bg-[#808080]'></div>
      <div className='h-[15%] w-[40%]  flex justify-between items-center flex-row'>
        <div className='basis-[40%] h-[70%] w-full bg-[#808080] rounded-[8px]'></div>
        <div className='basis-[40%] h-[70%] w-full bg-[#808080] rounded-[8px]'></div>
      </div>
    </div>
  )
}

export default HeroSection
