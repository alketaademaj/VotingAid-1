import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import LoginNavbar from './loginNavbar';
import LogoutNavbar from './logoutNavbar';

const NavbarContent = ({}) => {
    const user = useContext(UserContext);
    if (user.loggedIn) {
        return <LogoutNavbar />
    } else {
        return <LoginNavbar />
    }
} 
export default NavbarContent;