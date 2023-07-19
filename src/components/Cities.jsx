import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import City from './City';


const Cities = () => {
    
    const [citiesWithInfo, setCitiesWithInfo] = useState([])

    const getCities = async () => {
        const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=city&minPopulation=2000000&limit=4&sort=-population';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e40f407ef8mshd86ba4874a53172p14365bjsn3bd506c84483',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result.data
        } catch (error) {
            console.error(error);
        }
    }

    const getWeather = async (lat,long) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=dcdc4d244bb99171abc7072ad680346c&units=metric`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            return result
        } catch (error) {
            console.error(error);
        }
    }

    const getCityImages = async (cityName) => {

        const unsplashAccessKey = 'geFlg0FE60aBxtP5eRauZXW621f5kzNmuX64hsDEa10'
        const url = `https://api.unsplash.com/search/photos/?query=${encodeURIComponent(cityName)}&client_id=${unsplashAccessKey}`

        try {
            const response = await fetch(url);
            const data = await response.json();
        
            if (data.results.length > 0) {
              const cityImages = {
                smallImage : data.results[0].urls.small,
                bigImage : data.results[0].urls.regular
              }
              return cityImages;
            } 
            
            else {
              throw new Error('No images found for the specified city.');
            }


          } catch (error) {
            throw new Error('Failed to fetch city image: ' + error.message);
          }
    }

    const getWeatherInfoForCities = async (cities) =>{

       const res = await Promise.all(cities.map(async (item)=> {
        const id = item.id
        const lat = item.latitude
        const long = item.longitude
        const cityName = item.city
        const country = item.country
        const weatherDetails = await getWeather(lat,long)
        const cityImages = await getCityImages(cityName)

        return {
            id:id,
            cityName:cityName,
            country:country,
            temperature:weatherDetails.main.temp,
            weatherDescription: weatherDetails.weather[0].description,
            iconUrl:weatherDetails.weather[0].icon,
            cityImages:{
                smallImage: cityImages.smallImage,
                bigImage: cityImages.bigImage
            }
        }
    }))

        return res
    }

    const fetchWeatherDetails = async () => {
        const cities = await getCities()
        const weatherInfoForCities = await getWeatherInfoForCities(cities)
        setCitiesWithInfo(weatherInfoForCities)
    }

    useEffect(() => fetchWeatherDetails,[])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 md:gap-8'>
        {citiesWithInfo.map((item)=>{
            return <City key={item.id} item={item}/>
        })}
    </div>
  )
}

export default Cities