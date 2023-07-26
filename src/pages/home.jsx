import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Cities from '../components/Cities'
import Footer from '../components/Footer'


const Home = () => {

  const [isSorted, setIsSorted] = useState({
    sortBy:"default"
  })

  const updateSorted = (sortBy) =>{
    setIsSorted({
      sortBy:sortBy,
    })
  }

  return (
    <main className='bg-[beige] h-[100vh]'>
        <Navbar updateSorted={updateSorted}/>
        <Cities isSorted={isSorted}/>
        <Footer/>
    </main>
  )
}

export default Home