import React, { useEffect, useState } from 'react'
import City from './City';
import Filter from './Filter';
import Search from './Search';


const Cities = ({isSorted}) => {

    const [searchValue, setSearchValue] = useState('')
    
    const [isFiltered, setIsFiltered]= useState({
        isFiltered:false,
        filterBy:""
    })
    const [initialCities, setInitialCities] = useState([])
    const [citiesWithInfo, setCitiesWithInfo] = useState([])


    // getting alist of popular cities

    const getCities = async () => {
        const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?types=city&minPopulation=2000000&limit=&sort=name';
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

    // getting actual weather for cities generated

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

    // sort cities by dropdown selecr

    const sortWeatherInfoForCities = (sortBy) =>{

        switch (sortBy) {

            case 'default':
                var key = 'cityName'
                var listCopy = [...citiesWithInfo].sort((a,b) =>{
                    return a[key].localeCompare(b[key])
                })
                setCitiesWithInfo(listCopy)
                break;

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
       
    }



   


    // Use effects for intial rendering filtering and sorting

    useEffect(() => fetchWeatherDetails,[])

    useEffect(() => { 
            sortWeatherInfoForCities(isSorted.sortBy)
    }, [isSorted])

    useEffect(() => {
        if(isFiltered.isFiltered == false){
            searchValue !== ''? 
            setCitiesWithInfo(filterForSearchedCities(searchValue)):
            setCitiesWithInfo(initialCities)
        }else{
            var searchedList = filterForSearchedCities(searchValue)
            filterWeatherInfoForCities(searchedList,isFiltered.filterBy)
        }
    },[isFiltered,searchValue])

    // useEffect(()=>{
    //     filterForSearchedCities(searchValue)
    //     // console.log(searchValue);
    // },[searchValue])







  return (
    <div>
        <div className='flex justify-between items-center w-full mb-16 px-16'>
            <Search searchValue={searchValue} updateSearch={updateSearch}/>
            <Filter updateFiltered={updateFiltered}/>
        </div>

        <div>
        {
            citiesWithInfo.length == 0 ?
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl text-[#40434bff] tracking-wider font-poppins mb-6'>
                        No results found, try editing filters
                    </h1>
                    <img className='w-[100px]' src='/projectSvgs/snowImage.svg' alt="cloud png" />
                </div>

             :

                <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 md:gap-8 mb-16'>
                {citiesWithInfo.map((item)=>{
                    return <City key={item.id} item={item}/>
                })}
                </div>
        }
        </div>      
    </div>
  )
}
export default Cities