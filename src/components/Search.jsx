import React from 'react'

const Search = ({searchValue,updateSearch}) => {

  



  const handleSearch = (e) => {
    updateSearch(e)
  }


  return (
    <div>
      <input 
      className='p-[6px] sm:p-2 md:p-3 text-xs sm:text-sm md:text-base first-letter:capitalize bg-transparent text-sky-600 border border-sky-600 rounded-lg outline-none w-[150px] sm:w-[200px] md:w-[300px]' 
      type="text"
      placeholder='Search for a city'
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
       />
    </div>
  )
}

export default Search