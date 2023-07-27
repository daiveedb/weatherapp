import React, { useEffect, useState } from 'react'
import City from './City';
import Filter from './Filter';
import Search from './Search';
import PreloaderAnimation from './PreloaderAnimation';
import Footer from '../components/Footer'


const Cities = ({isSorted}) => {

    const moment = require('moment')
    const [searchValue, setSearchValue] = useState('')
    const [isFiltered, setIsFiltered]= useState({
        isFiltered:false,
        filterBy:""
    })
    const [initialCities, setInitialCities] = useState([])
    const [citiesWithInfo, setCitiesWithInfo] = useState([])
    const [isloading,setIsLoading] = useState(true)

    // getting alist of popular cities

    

    const getCities = async () => {

        let totalCities = []

        const urls = [
            {
                url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=city&maxPopulation=21893095&limit=10&sort=-population',
                options: {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'e40f407ef8mshd86ba4874a53172p14365bjsn3bd506c84483',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                }
            },
            {
                url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=city&excludedCountryIds=CN%2CPK%2CSG&maxPopulation=14910351&limit=10&sort=-population',
                options: {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c6f1d1e81bmsh378da47209b8c0dp1ef54ejsnf48b28e81dc3',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                }
            },
            {
                url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=city&excludedCountryIds=CN%2CSG%2CPK%2CIR%2CVN%2CIQ%2CCO%2CIN%2CMM%2CTR%2CCL%2CBR%2CRU%2CSD&maxPopulation=9000000&limit=10&sort=-population',
                options: {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '172e9f93d6msh57352fe94d33a5ap16da53jsn85e0fd8f4cd2',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                }
            },
            {
                url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=city&excludedCountryIds=CN%2CIN%2CIR%2CVN%2CIQ%2CCO%2CSA%2CMM%2CCL%2CTR%2CTZ%2CTW%2CAF%2CJO%2CJP%2CNG%2CMA%2CDZ&maxPopulation=4869999&limit=10&sort=-population',                options: {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '4ce995f6e7msha3914884fe478c2p1467edjsnbacf80e267c6',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                }
            },

        ]

        async function fetchDataFromUrls(urls) {
            const fetchPromises = urls.map(async (url, index) => {
              await new Promise((resolve) => setTimeout(resolve, 1700 * index));
              const response = await fetch(url.url, url.options);
              const result = await response.json();
              return result.data;
            });

            const dataArrays = await Promise.all(fetchPromises);
            const totalCities = dataArrays.reduce((acc, data) => [...acc, ...data], []);
          
            return totalCities;
        }


        totalCities = fetchDataFromUrls(urls)
        .then((totalCities) => {
          console.log(totalCities); 
          return totalCities// Process the combined data from all URLs here
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });

        return totalCities
    }

    // getting actual weather for cities generated

    const getWeather = async (lat,long) => {
        const key = 'dcdc4d244bb99171abc7072ad680346c'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            return result
        } catch (error) {
            console.error(error);
        }
    }

    // get city images for each city

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


    // set weather info we need for cities generated including images and weather

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
        const timezone = weatherDetails.timezone - 3600

        return {
            id:id,
            cityName:cityName,
            country:country,
            population:population,
            lat:lat,
            long:long,
            
            timezone: timezone,
            time:moment.unix(weatherDetails.dt + timezone).format('h:mm A').toLowerCase(),
            temperature:Math.round(weatherDetails.main.temp),
            feels_like:Math.round(weatherDetails.main.feels_like),
            temp_min:Math.round(weatherDetails.main.temp_min),
            temp_max:Math.round(weatherDetails.main.temp_max),
            humidity:Math.round(weatherDetails.main.humidity),
            pressure:Math.round(weatherDetails.main.pressure),
            windSpeed:weatherDetails.wind.speed,

            sunrise:moment.unix(weatherDetails.sys.sunrise).format('h:mm A').toLowerCase(),
            sunset:moment.unix(weatherDetails.sys.sunset).format('h:mm A').toLowerCase(),

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

    // sort cities by dropdown selecr

    const sortWeatherInfoForCities = (sortBy) =>{
        var key = ''

        switch (sortBy) {

            case 'default':
                key = 'cityName'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return a[key].localeCompare(b[key])
                })
                setCitiesWithInfo(listCopy)
                break;

            case 'temperature':
                key = 'temperature'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return a[key] - b[key]
                })
                setCitiesWithInfo(listCopy)
                break;

            case 'temperature reversed':
                key = 'temperature'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return  b[key] - a[key]
                })
                setCitiesWithInfo(listCopy)
                break;

            case 'population':
                key = 'population'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return   a[key] - b[key]
                })
                setCitiesWithInfo(listCopy)
                break;

            case 'population reversed':
                key = 'population'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return  b[key] - a[key]
                })
                setCitiesWithInfo(listCopy)
                break;
            default:
                break;
        }
    }

    // handling update on fiters factor

    const updateFiltered = (bool,string) =>{
        setIsFiltered({
            isFiltered:bool,
            filterBy:string
        })

    }

    // filter cities based on dropdown select

    const filterWeatherInfoForCities = (searchedList,filterBy) => {

        const selectElement = document.getElementById('sortSelect')
        selectElement.value = 'default'


        switch (filterBy) {
            case 'clear sky' :
                var listCopy = [...searchedList].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '8'     
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'rain' :
                var listCopy = [...searchedList].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '5' || firstDigitOfWeatherId === '3'    
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'thunderstorm' :
                var listCopy = [...searchedList].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '2'      
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'snow' :
                var listCopy = [...searchedList].filter((item)=>{
                    var weatherId = item.weatherId
                    var weatherIdAsString = Math.abs(weatherId).toString()
                    var firstDigitOfWeatherId = weatherIdAsString[0]

                    return firstDigitOfWeatherId === '6'      
                })
                setCitiesWithInfo(listCopy)
                break;


            case 'other' :
                var listCopy = [...searchedList].filter((item)=>{
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

    // update search state

    const updateSearch = (e) => {
        setSearchValue(e)
    }

    // filter by search

    const filterForSearchedCities = (searchValue) => {

        const selectElement = document.getElementById('sortSelect')
        selectElement.value = 'default'


        var listCopy = [...initialCities].filter((item) => {
            return item.cityName.toLowerCase().includes(searchValue.toLowerCase())
        })
        return listCopy
    }


    // intial function for getting cities and weatherinfo

    const fetchWeatherDetails = async () => {
        const cities = await getCities()
        const weatherInfoForCities = await getWeatherInfoForCities(cities)
        setInitialCities(weatherInfoForCities)
        setCitiesWithInfo(weatherInfoForCities)
        setIsLoading(false)
       
    }

    // Use effects for intial rendering filtering and sorting

    useEffect(() =>{
        fetchWeatherDetails()
    } ,[])

    useEffect(() => { 
            sortWeatherInfoForCities(isSorted.sortBy)
    }, [isSorted])

    useEffect(() => {
        if(isFiltered.isFiltered === false){
            searchValue !== ''? 
            setCitiesWithInfo(filterForSearchedCities(searchValue)):
            setCitiesWithInfo(initialCities)
        }else{
            var searchedList = filterForSearchedCities(searchValue)
            filterWeatherInfoForCities(searchedList,isFiltered.filterBy)
        }
    },[isFiltered,searchValue])


  return (
    <div>
        <div className='flex justify-between items-center w-full px-4 pb-10 md:px-16'>
            <Search searchValue={searchValue} updateSearch={updateSearch}/>
            <Filter updateFiltered={updateFiltered}/>
        </div>

        <div className='bg-[beige] h-max'>
        {
            citiesWithInfo.length !== 0 ?
            <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 md:gap-8 pb-32'>
                {citiesWithInfo.map((item)=>{
                    return <City key={item.id} item={item}/>
                })}
            </div>
        :
            !isloading?

             <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-[#40434bff] tracking-wider font-poppins mb-6'>
                     No results found, try editing filters
                </h1>
                <img className='w-[100px]' src='/projectSvgs/snowImage.svg' alt="cloud png" />
            </div>
                :

            <PreloaderAnimation/>               
        }
        </div>   
    </div>
  )
}
export default Cities