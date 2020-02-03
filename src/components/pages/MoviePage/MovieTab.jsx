import React from 'react'
import { NavLink } from 'react-router-dom'

const MovieTab = function (props) {
  const { movie, tabName } = props
  return (
    <li className='nav-item'>
      <NavLink
        to={`/movie/${movie.id}/details`}
        className='nav-link'
        activeClassName='active'
      >
        {tabName}
      </NavLink>
    </li>
  )
}

export default MovieTab
