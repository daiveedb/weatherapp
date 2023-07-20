import React from 'react'

const Search = () => {
  return (
    <div>
      <input 
      className='p-3 bg-transparent text-sky-600 border border-sky-600 rounded-lg outline-none w-[300px]' 
      type="text"
      placeholder='Search for a City'
       />
    </div>
  )
}

export default Search