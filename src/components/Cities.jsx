import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import City from './City';
import Filter from './Filter';
import Search from './Search';


const Cities = ({isSorted}) => {
    
    const [isFiltered, setIsFiltered]= useState({
        isFiltered:false,
        filterBy:""
    })
    const [initialCities, setInitialCities] = useState([])
    const [citiesWithInfo, setCitiesWithInfo] = useState([])

    const getCities = async () => {
        const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=city&minPopulation=2000000&limit=10&sort=name';
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
        const population = item.population

        const weatherDetails = await getWeather(lat,long)
        const cityImages = await getCityImages(cityName)

        return {
            id:id,
            cityName:cityName,
            country:country,
            temperature:weatherDetails.main.temp,
            population:population,
            
            weatherId:weatherDetails.weather[0].id,
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

    const sortWeatherInfoForCities = (sortBy) =>{

        switch (sortBy) {
            case 'temperature':
                var key = 'temperature'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return a[key] - b[key]
                })
                setCitiesWithInfo(listCopy)
                break;

            case 'temperature reversed':
                var key = 'temperature'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return  b[key] - a[key]
                })
                setCitiesWithInfo(listCopy)
                break;

            case 'population':
                var key = 'population'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return   a[key] - b[key]
                })
                setCitiesWithInfo(listCopy)
                break;

            case 'population reversed':
                var key = 'population'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return  b[key] - a[key]
                })
                setCitiesWithInfo(listCopy)
                break;
            default:
                break;
        }
    }

    const updateFiltered = (bool,string) =>{
        setIsFiltered({
            isFiltered:bool,
            filterBy:string
        })

    }

    const filterWeatherInfoForCities = (filterBy) => {

        switch (filterBy) {
            case 'clear sky' :
                var listCopy = [...initialCities].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '8'     
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'rain' :
                var listCopy = [...initialCities].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '5'     
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'thunderstorm' :
                var listCopy = [...initialCities].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '2'      
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'snow' :
                var listCopy = [...initialCities].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '6'      
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'other' :
                var listCopy = [...initialCities].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '7' 
                })
                setCitiesWithInfo(listCopy)
                break;
            default:
                break;
        }
    }

    const fetchWeatherDetails = async () => {
        const cities = await getCities()
        const weatherInfoForCities = await getWeatherInfoForCities(cities)
        setInitialCities(weatherInfoForCities)
        setCitiesWithInfo(weatherInfoForCities)
       
    }

    useEffect(() => fetchWeatherDetails,[])

    useEffect(() => { 
        if (isSorted.isSorted == false){
            setCitiesWithInfo(initialCities)
        }
        else{
            sortWeatherInfoForCities(isSorted.sortBy)
        }
       
    }, [isSorted])

    useEffect(() => {
        if(isFiltered.isFiltered == false){
            setCitiesWithInfo(initialCities)
        }else{
            filterWeatherInfoForCities(isFiltered.filterBy)
        }
    },[isFiltered])

  return (
    <div>
        <div className='flex justify-between items-center w-full mb-16 px-16'>
            <Search/>
            <Filter updateFiltered={updateFiltered}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 md:gap-8 mb-16'>
            {citiesWithInfo.map((item)=>{
                return <City key={item.id} item={item}/>
            })}
        </div>
    </div>
  )
}
// || item[firstDigitOfWeatherId] == '3'
export default Cities