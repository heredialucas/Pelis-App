import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./Navbar.module.css";
import Imagen from '../../assets/images/logo.png'

export default function NavBara() {

  const redir = useNavigate()

  return (
    <div className={s.navBar}>
      <img onClick={()=>{
        redir('/')
      }} src={Imagen} alt='ilndaisdl'/>
      <div className={s.containerbtn}>
        <NavLink className={s.btn} to="/">Home</NavLink>
        <NavLink className={s.btn} to="/favs">Favoritos</NavLink>
      </div>
    </div>
  );
}
