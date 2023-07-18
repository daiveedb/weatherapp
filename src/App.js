import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CityWeatherDetails from './pages/cityWeatherDetails';


function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home/>} />
      <Route path=":cityId" element={<CityWeatherDetails/>}/>
   </Routes>
  );
}

export default App;
