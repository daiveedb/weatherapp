import React from 'react'

const Filter = ({updateFiltered}) => {

    var filterSelected = 'none'

    const handleFilter = (selected) =>{
        filterSelected = selected

        if (filterSelected !== 'none'){
          updateFiltered(true,filterSelected)
        } else{
          updateFiltered(false,'none')
        }
    }





  return (
    <div>
        <label>
            <select
            defaultValue='default'
            onChange={(e)=> handleFilter(e.target.value)}
            className='bg-transparent text-sky-600 font-bold border border-sky-600 p-1 sm:p-2 md:p-3 rounded shadow-lg outline-none w-[150px] sm:w-[200px] md:w-[240px]'
            >
              <option value="none"> None</option>
              <option value="clear sky">Clear Sky</option>
              <option value="rain">Rain</option>
              <option value="thunderstorm">Thunderstorm</option>
              <option value="snow">Snowy</option>
              <option value="other">Other</option>
            </select>
        </label>
    </div>
  )
}

export default Filter