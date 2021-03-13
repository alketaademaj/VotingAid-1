import React, { useContext } from 'react'
import TitleLabel from './titleLabel';
import { UserContext } from '../../context/userContext';
import { NavLink } from 'react-router-dom';
  
const AdminNavbar = () => {
    const user = useContext(UserContext); 
    if (user.user == "Admin") {
        return (
            <div>
                <TitleLabel questionTitle={'Admin Navbar'} />
                <NavLink to="/addCandidates"> Add Candidates |</NavLink>
                <NavLink to="/Candidates"> Browse Candidates |</NavLink>
                <NavLink to="/addQuestion"> Add Question |</NavLink>
                <NavLink to="/Questions"> Browse Questions </NavLink>
            </div>
        );
    } else {
        return (
            null
        );
    }
}
  
export default AdminNavbar;