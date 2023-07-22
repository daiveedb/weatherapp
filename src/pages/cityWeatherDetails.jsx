import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const CityWeatherDetails = () => {

  // var listToUse = []
  const [hourlyList,setHourlyList] = useState([])
  const state = useLocation().state.item
  const iconUrl = `https://openweathermap.org/img/wn/${state.iconUrl}@2x.png`
  const moment = require('moment')
  


  const getHourlyWeatherInfo = async () => {
    const key = 'dcdc4d244bb99171abc7072ad680346c'
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${state.lat}&lon=${state.long}&cnt=8&appid=${key}&units=metric`

    try {
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error);
    }
  }

  const getHourlyList = (hourlyResult) => {
    const newHourlyList = hourlyResult.map((item) => {
      return {
        time:'12 pm',
        temperature:Math.round(item.main.temp),
        temp_max:Math.round(item.main.temp_min),
        temp_min:Math.round(item.main.temp_max),
        feels_lik:Math.round(item.main.feels_like),
        weatherDescriptiom:item.weather[0].description,
        iconId:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      }
    })

    return newHourlyList
  }


  const storeHourlyData = async () => {
    const hourlyResult = await getHourlyWeatherInfo();
    const listToUse = getHourlyList(hourlyResult.list); 
    console.log(listToUse);
    setHourlyList(listToUse)
  }

  useEffect(() => storeHourlyData,[])

  // useEffect(() => {
  //   console.log("$$$$$$$$$$$$",hourlyList);
  // }, [hourlyList])


  return (
    <div className='h-[100vh] relative bg-gradient-to-b from-transparent via-sky-600 to-sky-600'>
      <div className='relative h-[50vh] w-full -z-10'>
        <img className='w-full h-full object-cover' src={state.cityImages.bigImage} alt="" />
        <div className='bg-gradient-to-b from-transparent from-50% to-sky-600 absolute top-0 left-0 right-0 bottom-0'></div>
      </div>
      <div className='absolute top-10 left-[50%] translate-x-[-50%] w-[80%] m-auto'>
        <div className='text-center pt-16 mb-20'>
          <h1 className='text-9xl text-white drop-shadow-2xl uppercase font-extrabold font-poppins'>{state.cityName}</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5'>

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
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[1]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[1]?.iconUrl} alt="" />
                  <p>{hourlyList[1]?.temperature}&deg;</p>
                </div>
              </div>
              {/* single hourly div */}
              <div className='w-[95%] text-center'>
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[2]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[2]?.iconUrl} alt="" />
                  <p>{hourlyList[2]?.temperature}&deg;</p>
                </div>
              </div>
              {/* single hourly div */}
              <div className='w-[95%] text-center'>
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[3]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[3]?.iconUrl} alt="" />
                  <p>{hourlyList[3]?.temperature}&deg;</p>
                </div>
              </div>
              {/* single hourly div */}
              <div className='w-[95%] text-center'>
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[4]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[4]?.iconUrl} alt="" />
                  <p>{hourlyList[4]?.temperature}&deg;</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tomorrow */}

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
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[1]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[1]?.iconUrl} alt="" />
                  <p>{hourlyList[1]?.temperature}&deg;</p>
                </div>
              </div>
              {/* single hourly div */}
              <div className='w-[95%] text-center'>
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[2]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[2]?.iconUrl} alt="" />
                  <p>{hourlyList[2]?.temperature}&deg;</p>
                </div>
              </div>
              {/* single hourly div */}
              <div className='w-[95%] text-center'>
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[3]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[3]?.iconUrl} alt="" />
                  <p>{hourlyList[3]?.temperature}&deg;</p>
                </div>
              </div>
              {/* single hourly div */}
              <div className='w-[95%] text-center'>
                <h5 className='text-sm text-gray-600 pb-1'>{hourlyList[4]?.time}</h5>
                <div className='flex'>
                  <img className='pr-4 w-[30px]' src={hourlyList[4]?.iconUrl} alt="" />
                  <p>{hourlyList[4]?.temperature}&deg;</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CityWeatherDetails