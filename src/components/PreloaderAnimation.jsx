import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../preloader/animation_lkfekjeb.json'

const PreloaderAnimation = () => {
  return (
    <div className='flex justify-center items-center w-[20%] m-auto mb-16'>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoPlay={true} 
        width={50} 
        height={50} />
    </div>
    
  )
}

export default PreloaderAnimation