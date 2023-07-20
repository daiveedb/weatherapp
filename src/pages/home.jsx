import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cities from '../components/Cities'

const Home = () => {

  const [isSorted, setIsSorted] = useState({
    isSorted:false,
    sortBy:"default"
  })

  const updateSorted = (bool,string) =>{
    setIsSorted({
      isSorted:bool,
      sortBy:string,
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