import React, { useEffect, useState } from 'react'

const Search = ({searchValue,updateSearch}) => {

  



  const handleSearch = (e) => {
    updateSearch(e)
  }


  return (
    <div>
      <input 
      className='p-3 capitalize bg-transparent text-sky-600 border border-sky-600 rounded-lg outline-none w-[300px]' 
      type="text"
      placeholder='Search for a City'
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
       />
    </div>
  )
}

export default Search