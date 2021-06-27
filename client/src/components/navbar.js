import React, { Component, useContext } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { BiHome } from "react-icons/bi";
import { BsLock } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import swal from 'sweetalert2';


//Components
import Form from './form.js';
import Content from './homeContent.jsx';
import Registration from './registration.js';
import Login from './login.js';
import Profile from './profile.js';
import Candidates from './candidates.js';
import Questions from './questions.js';
import Suggestions from './suggestedCandidates.js';
import AddCandidates from './addCandidates.js';
import AddOneCandidate from './addOneCandidate.js';
import AddQuestion from './addQuestion.js';
import language from "../properties/language";
import { UserContext } from '../context/userContext';

import ThemeToggleButton from "./themeToggleButton";
// import { theme } from "./context/theme";
// import { ThemeContext } from "./context/ThemeProvider";

import NavLogin from "./NavLogin";

// Create new file for this component
class AdminNavbar extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    }

  }

  render() {
    return this.context.loggedIn && this.context.user === "Admin" &&
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#404040', color: '#FFFFFF', paddingLeft: 10, paddingRight: 10, fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h5 style={{ margin: 0 }}>{language.adminLogo[this.context.language]}</h5>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavLink style={{ color: '#FFFFFF' }} to="/addCandidates" className="whiteFont"> {language.addCandidates[this.context.language]}</NavLink>
          <NavLink style={{ color: '#FFFFFF' }} to="/addOneCandidate" className="whiteFont">  {language.addCandidate[this.context.language]} </NavLink>
          <NavLink style={{ color: '#FFFFFF' }} to="/Candidates" className="whiteFont"> {language.browseCandidates[this.context.language]} </NavLink>
          <NavLink style={{ color: '#FFFFFF' }} to="/addQuestion" className="whiteFont"> {language.addQuestion[this.context.language]} </NavLink>
          <NavLink style={{ color: '#FFFFFF' }} to="/Questions" className="whiteFont"> {language.browseQuestions[this.context.language]} </NavLink>
        </div>
      </div>
  }
}


// Simple Auth check with out token just to stop us to navigate in any private route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    // Here need to check if Token exist because is unsecure
    sessionStorage.getItem("status") // TODO: TOKEN
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/Login',
        state: { from: props.location }
      }} />
  )} />
)

const Navigation = () => {
  return <>
    <BrowserRouter>
      <div>
        <AdminNavbar />
        <NavLogin />
        <Switch>
          <PrivateRoute path="/addQuestion" component={AddQuestion} />
          <PrivateRoute path="/addCandidates" component={AddCandidates} />
          <PrivateRoute path="/addOneCandidate" component={AddOneCandidate} />
          <PrivateRoute path="/Candidates" component={Candidates} />
          <PrivateRoute path="/Questions" component={Questions} />
          <PrivateRoute path="/Profile" component={Profile} />
          <Route path="/suggestedCandidates" component={Suggestions} />
          <Route path="/Form" component={Form} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Registration} />
          <Route path="/" component={Content} />
        </Switch>
      </div>
    </BrowserRouter>
  </>
}

export default Navigation;