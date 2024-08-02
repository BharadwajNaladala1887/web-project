import React from 'react'
import Search from '../components/Search'
import Navbar from '../components/Navbar'

const SearchPage = () => {
  return (
    <div className="flex flex-col relative">
      <Navbar/>
      <Search/>
    </div>
  )
}

export default SearchPage