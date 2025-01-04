import { Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AppNavbar = () => {
  const location = useLocation();

  return (
    <Navbar fluid className='bg-gray-300 text-white'>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black">Anime Manga</span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active={location.pathname === "/"}>
          Animes
        </Navbar.Link>
        <Navbar.Link as={Link} to="/authors" active={location.pathname === "/authors"}>
          Authors
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavbar