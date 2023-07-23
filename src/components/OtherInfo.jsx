import React, { useEffect, useState } from 'react'
import {IoIosWater} from 'react-icons/io'
import {WiSunrise} from 'react-icons/wi'
import {GiSunset} from 'react-icons/gi'
import {FiWind} from 'react-icons/fi'
import {TiWeatherWindyCloudy} from 'react-icons/ti'



const OtherInfo = ({state}) => {

    const [otherWeatherInfo,setOtherWeatherInfo] = useState([
        {
            info:'humidity',
            infoValue:state.humidity + ' %',
            infoIcon:<IoIosWater/>
        },
        {
            info:'sunrise',
            infoValue:state.sunrise,
            infoIcon:<WiSunrise color='orange'/>
        },
        {
            info:'sunset',
            infoValue:state.sunset,
            infoIcon:<GiSunset color='#dc4e0c'/>
        },
        {
            info:'wind speed',
            infoValue:state.windSpeed + ' Km/h',
            infoIcon:<FiWind color='#91817a'/>
        },
        {
            info:'pressure',
            infoValue:state.pressure + ' hPa',
            infoIcon:<TiWeatherWindyCloudy color='black'/>
        },
    ])


  return (
    <div className='w-[95%] md:w-[97%] p-8 grid grid-cols-1 bg-white shadow-lg m-auto rounded-lg mb-10'>
        {otherWeatherInfo.map((item) => {
            return(
            <div className='relative flex justify-between items-center border-gray-300 border-b-[1px] p-2 font-quickSand text-sky-600'>
                <p className='text-3xl'>{item.infoIcon}</p>
                <p className='absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] font-semibold text-gray-700 capitalize'>{item.info}</p>
                <p>{item.infoValue}</p>
            </div>)
        })}
    </div>
  )
}

export default OtherInfo