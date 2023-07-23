import React from 'react'
import { useNavigate } from 'react-router-dom'

const City = ({item}) => {

    const iconUrl = `https://openweathermap.org/img/wn/${item.iconUrl}@2x.png`
    const cityImageSmall = item.cityImages.smallImage 


    const navigate = useNavigate();
    

  return (
    <div onClick={() => navigate(`/${item.cityName}`, {state:{item}})} className='w-[90%] cursor-pointer rounded-lg flex justify-between items-center shadow-md bg-white  hover:border-black border hover:scale-[1.02] transition-all'>
        <div className='flex-1 relative w-full h-full'>
            <img className='w-full h-full top-0 bottom-0 right-0 left-0 absolute rounded-l-lg' src={cityImageSmall} alt="" />
        </div>

        <div className='flex-[3] flex items-center justify-between px-4 py-3'>
            <div className='flex-[3]'>
                <h3 className='font-extrabold text-base sm:text-lg py-[2px] tracking-wide'>{item.cityName}</h3>
                <p className='text-xs font-extralight tracking-tighter'>{item.country}</p>
                <p className='text-xs sm:text-sm font-semibold text-gray-500 capitalize'>{item.weatherDescription}</p>
            </div>
            <div className='items-end'>
                <div className='flex flex-1 justify-end items-center'>
                    <img className='w-[50%] sm:w-[50%] pr-2 sm:pr-3 rounded-l-lg' src={iconUrl} alt="" /> 
                    <p className='text-sm sm:text-base'>{item.temperature}&deg;C</p>  
                </div>
                <p className='tracking-wide font-light text-end text-gray-600'>{item.time}</p>
            </div>
        </div>
        
    </div>
  )
}

export default City