import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full p-5 flex justify-between items-center text-[#40434bff]  font-quickSand bg-[beige]'>
        <p className='text-xs sm:text-sm md:text-base'>Powered By Openweathermap, GeoDB Cities, UnsplashAPI</p>
        <p className='text-xs sm:text-sm md:text-base'>Bajomo David &copy;</p>
    </div>
  )
}

export default Footer