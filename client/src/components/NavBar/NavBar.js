import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/Logo_videoGames.png';

import './NavBar.css';

export default function NavBar() {
  return (
    <nav id="navbar">
      <NavLink exact to='/'>
        <span className="navbar-brand">
          <img id="logoJuegos" src={Logo} width="100" height="90" className="logoVideoGames" alt="" />
          VideoGames
        </span>
      </NavLink>
      <NavLink exact to="/videogames" className="link-Home">Ver videojuegos</NavLink>
      <NavLink exact to="/addVideogame" className="link-Form">Crear videojuego</NavLink>
    </nav>
  )
}