import { NavLink } from 'react-router-dom';
import { BiHome } from "react-icons/bi";
import { BsLock } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
import ThemeChanger from './themeChanger';
  
    const LoginNavbar= () => {
        return (
         <div className="homeNav" >
            <ThemeChanger  />
            <NavLink to="/"> <BiHome /> Home </NavLink>
            <NavLink to="/Login"><BsLock /> Login </NavLink>
            <NavLink to="/Register"><HiOutlineUserAdd /> Registration </NavLink>
          </div>
        );
      }

  export default LoginNavbar;