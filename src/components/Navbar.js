import React from 'react'
import { NavLink } from 'react-router-dom'
import Searchbar from './Searchbar'
import { useTheme } from '../hooks/useTheme'
import './Navbar.css'

const Navbar = () => {
  const {color, changeColor} = useTheme()

  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <NavLink to='/' className='brand'>
          <h1>Unique Recipes</h1>
        </NavLink>
        <Searchbar />
        <NavLink to='/create'>
          Create Recipe
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar