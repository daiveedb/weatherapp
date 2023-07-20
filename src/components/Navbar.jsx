import React from 'react'

const Navbar = ({updateSorted}) => {

  var dropdownSelected = 'default'


  const handleSort = (selected) =>{
    dropdownSelected = selected

    if (dropdownSelected != 'default'){
      updateSorted(true,dropdownSelected)
    } else{
      updateSorted(false,'default')
    }
  }




  return (
    <div>
        <nav className='bg-gradient-to-b from-sky-600 to-[beige] w-full h-max px-16 py-10 flex font-poppins justify-between items-center mb-16'>
            <h1 className='text-5xl font-bold text-white tracking-wider uppercase'>Cloud Nine</h1>
            <div className='flex'>
              <label>
                {/* Sort By: */}
                <select
                defaultValue='default'
                onChange={(e)=> handleSort(e.target.value)}
                className='py-2 px-3 rounded shadow-lg outline-none'
                >
                  <option value="default"> Default</option>
                  <option value="temperature reversed">Hottest</option>
                  <option value="temperature">Coldest</option>
                  <option value="population">Population (Ascending)</option>
                  <option value="population reversed">Population (Descending)</option>
                </select>
              </label>
            </div>
        </nav>
    </div>
  )
}

export default Navbar