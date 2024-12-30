import { Navbar } from 'flowbite-react'
import React from 'react'

const AppNavbar = () => {
  return (
    <Navbar fluid className='bg-cyan-700 text-white'>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Anime Manga</span>
      </Navbar.Brand>
    </Navbar>
  )
}

export default AppNavbar