import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';


export default function NavBar() {
    return (
        <header className="navbar">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink to="/" >Home</NavLink>
                        <br/>
                        <NavLink to="/favs" >Favoritas</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}