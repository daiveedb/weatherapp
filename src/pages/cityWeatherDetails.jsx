import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import OtherInfo from '../components/OtherInfo'
import Today from '../components/Today'
import Tomorrow from '../components/Tomorrow'
import PreloaderAnimation from '../components/PreloaderAnimation'
import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const CityWeatherDetails = () => {

  const [isloading,setIsLoading] = useState(true)
  const [hourlyList,setHourlyList] = useState([])
  const state = useLocation().state.item
  const iconUrl = `https://openweathermap.org/img/wn/${state.iconUrl}@2x.png`
  const moment = require('moment')
  
  const navigate = useNavigate()

  const getHourlyWeatherInfo = async () => {
    const key = 'dcdc4d244bb99171abc7072ad680346c'
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${state.lat}&lon=${state.long}&cnt=12&appid=${key}&units=metric`

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
      const datetime = item.dt + state.timezone
      const formattedTime = moment.unix(datetime).format('h A').toLowerCase()
      return {
        time:formattedTime,
        temperature:Math.round(item.main.temp),
        temp_max:Math.round(item.main.temp_min),
        temp_min:Math.round(item.main.temp_max),
        feels_like:Math.round(item.main.feels_like),
        weatherDescription:item.weather[0].description,
        iconId:`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      }
    })
    setIsLoading(false)
    return newHourlyList
  }


  const storeHourlyData = async () => {
    const hourlyResult = await getHourlyWeatherInfo();
    const listToUse = getHourlyList(hourlyResult.list); 
    setHourlyList(listToUse)
  }

  useEffect(() => {
    storeHourlyData()
  },[])
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  })


  return (

  <div className='h-[100vh] relative bg-gradient-to-b from-transparent via-sky-600 to-sky-600'>
    <div className='relative h-[50vh] w-full -z-10'>
      <img className='w-full h-full object-cover' src={state.cityImages.bigImage} alt="" />
      <div className='bg-gradient-to-b from-transparent from-50% to-sky-600 absolute top-0 left-0 right-0 bottom-0'></div>
    </div>
    <div className='absolute top-10 z-20 left-[50%] translate-x-[-50%] w-[80%] m-auto'>
      <div className='text-center pt-16 mb-20'>
        <h1 className='text-4xl sm:text-6xl md:text-8xl lg:tex-9xl text-white drop-shadow-2xl uppercase font-extrabold font-poppins'>{state.cityName}</h1>
      </div>

      {isloading ? 
        <div>
          <h1 className="text-xs">
            <PreloaderAnimation/>
          </h1>
        </div>
        :
        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 mb-5 md:mb-12'>
          <Today iconUrl={iconUrl} state = {state} hourlyList = {hourlyList}/>
          <Tomorrow hourlyList = {hourlyList} state={state}/>
        </div>
      }
          
          <OtherInfo state={state}/>
    </div>
    <div className='absolute left-10 top-5'>
      <h1 onClick={() => navigate('/')} className='text-4xl md:text-7xl cursor-pointer'>
        <BiArrowBack color='white'/>
      </h1>
    </div>
  </div>
   
  )
}

export default CityWeatherDetails


 