import React from 'react'


const Navbar = ({updateSorted}) => {

  var dropdownSelected = 'default'


  const handleSort = (selected) =>{
    dropdownSelected = selected

    updateSorted(dropdownSelected)

  }

  return (
    <div>
        <nav className='bg-gradient-to-b from-sky-600 to-[beige] w-full h-max px-4 py-10 md:px-16 flex font-poppins justify-between items-center mb-6'>
          <div className='flex items-center'>
            {/* <img className='w-[100px] -translate-y-2 mr-8' src='/projectSvgs/rainImage.svg' alt="cloud png" /> */}
            <h1 className='text-3xl mr-8 md:text-5xl font-bold text-white tracking-wider uppercase'>Cloud <span className='text-[#40434bff]'>Nine</span></h1>
            <img className='w-[100px] -translate-y-2' src='/projectSvgs/rainImage.svg' alt="cloud png" />
          </div>

            {/* Sort Cities */}
            <div className='flex'>
              <label>
                {/* Sort By: */}
                <select
                id='sortSelect'
                defaultValue='default'
                onChange={(e)=> handleSort(e.target.value)}
                className='bg-transparent text-[#40434bff] font-bold border border-[#40434bff] px-1 py-1 sm:py-2 sm:px-2 md:py-3 md:px-3 rounded shadow-lg outline-none w-[150px] sm:w-[200px] md:w-[240px]'
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