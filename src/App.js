import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CityWeatherDetails from './pages/CityWeatherDetails';



function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home/>} />
      <Route path=":cityId" element={<CityWeatherDetails/>}/>
   </Routes>
  );
}

export default App;
