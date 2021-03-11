import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { BiHome } from "react-icons/bi";
import { BsLock } from "react-icons/bs";
import {UserContext} from '../../context/userContext'


const LogoutNavbar = () => {
    const user = useContext(UserContext);
    if (user.loggedIn) { 
      return (
        <div className="homeNav">
          <NavLink to="/"> <BiHome /> Home </NavLink>
          <NavLink to="/logout" onClick={() => user.logOut()}> <BsLock /> logout </NavLink>
          <NavLink to="/Profile"> Profile </NavLink>
        </div>
      );
    }
}

export default LogoutNavbar;