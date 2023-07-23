import React from 'react'

const Today = ({iconUrl,state,hourlyList}) => {

    
  return (
    <div className='bg-white w-[95%] p-6 rounded-xl shadow-lg'>
          {/* today */}
          <div className='flex items-center w-full'>
            <img className='w-[60px] -translate-y-2 mr-3' src="/projectSvgs/cloudImage.svg" alt="" />
            <h3 className='text-2xl font-bold font-quickSand'>Today</h3>
          </div>

          {/* weather and feels like*/}
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center '>
              <img className='w-[30px] sm:w-[50px] md:w-[80px] lg:w-[110px]' src={iconUrl} alt="" />
              <p className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>{state.temperature}&deg;C</p>
            </div>
            <div className='text-xs lg:text-sm font-quickSand font-semibold text-end'>
              <p className='text-gray-600'>{state.weatherDescription}</p>
              <p className='text-gray-600'>{state.temp_max}&deg;/{state.temp_min}&deg;</p>
              <p className='text-gray-600'>feels like {state.feels_like}&deg;C</p>
            </div>
          </div>
          {/* forecast grid */}
          <div className='grid grid-cols-4 justify-items-center pt-8 px-4'>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[0].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[0].iconId} alt="" />
                <p>{hourlyList[0].temperature}&deg;</p>
              </div>
            </div>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[1].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[1].iconId} alt="" />
                <p>{hourlyList[1].temperature}&deg;</p>
              </div>
            </div>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[2].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[2].iconId} alt="" />
                <p>{hourlyList[2].temperature}&deg;</p>
              </div>
            </div>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[3].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[3].iconId} alt="" />
                <p>{hourlyList[3].temperature}&deg;</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Today