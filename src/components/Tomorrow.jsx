import React from 'react'

const Tomorrow = ({state,hourlyList}) => {
  return (
    <div className='bg-white w-[95%] p-6 rounded-xl shadow-lg'>
          {/* today */}
          <div className='flex items-center w-full'>
            <img className='w-[60px] -translate-y-2 mr-3' src="/projectSvgs/tomorrow.svg" alt="" />
            <h3 className='text-2xl font-bold font-quickSand'>Tomorrow</h3>
          </div>

          {/* weather and feels like*/}
          <div className='flex justify-between items-center w-full'>
            <div className='flex justify-center items-center '>
              <img className='w-[50px] sm:w-[50px] md:w-[80px] lg:w-[110px]' src={hourlyList[7].iconId} alt="" />
              <p className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>{state.temperature}&deg;C</p>
            </div>
            <div className='text-xs lg:text-sm font-quickSand font-semibold text-end'>
              <p className='text-gray-600'>{hourlyList[7].weatherDescription}</p>
              <p className='text-gray-600'>{hourlyList[7].temp_max}&deg;/{hourlyList[7].temp_min}&deg;</p>
              <p className='text-gray-600'> will feel like {hourlyList[7].feels_like}&deg;C</p>
            </div>
          </div>
          {/* forecast grid */}
          <div className='grid grid-cols-4 justify-items-center pt-8 px-4'>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[8].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[8].iconId} alt="" />
                <p>{hourlyList[8].temperature}&deg;</p>
              </div>
            </div>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[9].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[9].iconId} alt="" />
                <p>{hourlyList[9].temperature}&deg;</p>
              </div>
            </div>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[10].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[10].iconId} alt="" />
                <p>{hourlyList[10].temperature}&deg;</p>
              </div>
            </div>
            {/* single hourly div */}
            <div className='w-[95%] text-center'>
              <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[11].time}</h5>
              <div className='flex flex-col justify-center items-center'>
                <img className='w-[60px]' src={hourlyList[11].iconId} alt="" />
                <p>{hourlyList[11].temperature}&deg;</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Tomorrow