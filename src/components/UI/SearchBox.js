import React from 'react'

const SearchBox = ({onChange, onClick}) => {
    return (
<div className="p-8 ">
  <div className="bg-white flex items-center rounded-full shadow-xl">
    <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none " id="search" type="text" placeholder="Search" onChange={onChange}/>
    
    <div className="p-4">
      <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
     </svg>
      </button>
      </div>
    </div>
  </div>
    )
}

export default SearchBox
