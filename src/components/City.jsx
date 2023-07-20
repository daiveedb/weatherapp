import React, { useEffect, useState } from 'react'

const City = ({item}) => {

    const iconUrl = `https://openweathermap.org/img/wn/${item.iconUrl}@2x.png`
    const cityImageSmall = item.cityImages.smallImage 

  return (
    <div className='w-[90%] cursor-pointer rounded-lg flex justify-between items-center shadow-md bg-white  hover:border-black border hover:scale-[1.02] transition-all'>
        <div className='flex-1 relative w-full h-full'>
            <img className='w-full h-full top-0 bottom-0 right-0 left-0 absolute rounded-l-lg' src={cityImageSmall} alt="" />
        </div>

        <div className='flex-[3] flex items-center justify-between px-4 py-3'>
            <div className='flex-[3]'>
                <h3 className='font-extrabold text-base sm:text-lg py-[2px] tracking-wide'>{item.cityName}</h3>
                <p className='text-xs font-extralight tracking-tighter'>{item.country}</p>
                <p className='text-xs sm:text-sm font-semibold text-gray-500 capitalize'>{item.weatherDescription}</p>
                <p className='text-xs'>{item.population}</p>
            </div>
            <div className='flex flex-1 justify-end items-center'>
                <img className='w-[50%] sm:w-[70%] pr-2 sm:pr-3 rounded-l-lg' src={iconUrl} alt="" /> 
                <p className='text-sm sm:text-base'>{item.temperature}&deg;C</p>  
            </div>
        </div>
        
    </div>
  )
}

export default City