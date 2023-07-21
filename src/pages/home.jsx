import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cities from '../components/Cities'

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
    <main>
        <Navbar updateSorted={updateSorted}/>
        <Cities isSorted={isSorted}/>
    </main>
  )
}

export default Home