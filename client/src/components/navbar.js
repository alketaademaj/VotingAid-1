import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { BiHome } from "react-icons/bi";
import { BsLock } from "react-icons/bs";
import { HiOutlineUserAdd } from "react-icons/hi";
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

class NavContent extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    }

  }

  render() {
    if (this.context.loggedIn && this.context.user == "Admin") { //BETTER FIX FOR THESE LINES PLEASE, THIS IS NOT WORKING AS INTENDED, CANDIDATES CAN SEE ADMIN BAR NOW
      return (
        <div>
          <h2>Admin Navbar</h2>
          <NavLink to="/addCandidates"> Add Candidates |</NavLink>
          <NavLink to="/addOneCandidate"> Add a Single Candidate |</NavLink>
          <NavLink to="/Candidates"> Browse Candidates |</NavLink>
          <NavLink to="/addQuestion"> Add Question |</NavLink>
          <NavLink to="/Questions"> Browse Questions </NavLink>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

class NavLogin extends Component {
  static contextType = UserContext;

  componentDidMount() {
    const { checkExistingLogin } = this.context;
    checkExistingLogin();
  }

  changeTheme = () => {
      console.log(this.context)
    if (this.refs.theme.value == 'BLACK') {
      document.body.style.backgroundColor = 'black';
      console.log("Black works")
    }
    else if (this.refs.theme.value == 'WHITE') {
      document.body.style.backgroundColor = 'white';
      console.log("White works")
    }
    else if (this.refs.theme.value == '-') {
      document.body.style.backgroundColor = '#5da57b93';
    }
    swal.fire("Color changed to " + this.refs.theme.value);

  }

  render() {
    const { changeUser } = this.context;
    const { logOut } = this.context;
    const { changeLanguage } = this.context;
    
    if (this.context.loggedIn) { //BETTER FIX FOR THESE LINES PLEASE
      return (
        <div className="homeNav">
          <select ref="theme" onChange={this.changeTheme}>
            <option value="-">Valitse Teema</option>
            <option value="BLACK">BLACK</option>
            <option value="WHITE">WHITE</option>
          </select>
          <NavLink to="/">
            <BiHome />
            {language.navigationHome[this.context.language]}
          </NavLink>
          <NavLink
            to="/logout"
            onClick={() => logOut()}
          ><BsLock />
            {language.navigationLogOut[this.context.language]}
          </NavLink>
          <NavLink to="/Profile">  {language.navigationProfile[this.context.language]} </NavLink>
          <select name="lang" onChange={changeLanguage}>
            <option>Valitse kieli</option>
            <option selected={this.context.language = !!'fin'} value="fin">Finnish</option>
            <option selected={sessionStorage.getItem('language') === 'eng'} value="eng">English</option>
          </select>
        </div>
      );
    }
    else {
      return (
        <div className="homeNav" >
          <select ref="theme" onChange={this.changeTheme}>
            <option value="-">Valitse Teema</option>
            <option value="BLACK">BLACK</option>
            <option value="WHITE">WHITE</option>
          </select>
          <NavLink to="/">
            <BiHome />
            {language.navigationHome[this.context.language]}
          </NavLink>
          <NavLink to="/Login"><BsLock /> {language.navigationLogin[this.context.language]} </NavLink>
          <NavLink to="/Register"><HiOutlineUserAdd /> {language.navigationRegister[this.context.language]} </NavLink>
          <select name="lang" onChange={changeLanguage}>
            <option value="fin">Valitse kieli</option>
            <option value="fin">Finnish</option>{/*selected={this.context.language = !!'fin'}*/}
            <option value="eng">English</option>{/*selected={this.context.language = !!'fin'}*/}
          </select>
        </div>
      );
    }
  }
}

class Navigation extends Component {
  render() {
    return (
      < BrowserRouter >
        <div>
          <NavLogin />
          <NavContent />
          <Switch>
            <Route path="/addQuestion" component={AddQuestion} />
            <Route path="/addCandidates" component={AddCandidates} />
            <Route path="/addOneCandidate" component={AddOneCandidate} />
            <Route path="/Candidates" component={Candidates} />
            <Route path="/suggestedCandidates" component={Suggestions} />
            <Route path="/Questions" component={Questions} />
            <Route path="/Form" component={Form} />
            <Route path="/Profile" component={Profile} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Registration} />
            <Route path="/" component={Content} />
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}
export default Navigation;
