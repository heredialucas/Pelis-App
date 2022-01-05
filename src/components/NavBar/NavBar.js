import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function NavBara() {
  return (
        <div>
        
              <NavLink  to='/'>Home</NavLink>
              <NavLink  to='/favs'>Favoritos</NavLink>
        </div>
  );
}
