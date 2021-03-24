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
import AddQuestion from './addQuestion.js';


import { UserContext } from '../context/userContext';

class NavContent extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    if (this.context.loggedIn && this.context.user != "Quest") { //BETTER FIX FOR THESE LINES PLEASE, THIS IS NOT WORKING AS INTENDED, CANDIDATES CAN SEE ADMIN BAR NOW
      return (
        <div>
          <h2>Admin Navbar</h2>
          <NavLink to="/addCandidates"> Add Candidates |</NavLink>
          <NavLink to="/Candidates"> Browse Candidates |</NavLink>
          <NavLink to="/addQuestion"> Add Question |</NavLink>
          <NavLink to="/Questions"> Browse Questions </NavLink>
        </div>
      );
    }
    else {
      return (
        null
      );
    }
  }
}

class NavLogin extends Component {
  static contextType = UserContext;

  componentDidMount() {
    const { checkExistingLogin } = this.context;
    checkExistingLogin();
  }

  changeTheme() {
    if (this.refs.theme.value == 'BLACK') {
      document.body.style.backgroundColor = 'black';
    }
    if (this.refs.theme.value == 'WHITE') {
      document.body.style.backgroundColor = 'white';
    }
    swal.fire("Color changed to " + this.refs.theme.value);
  }
  render() {
    const { changeUser } = this.context;
    const { logOut } = this.context;
    if (this.context.loggedIn) { //BETTER FIX FOR THESE LINES PLEASE
      return (
        <div className="homeNav">
          <select ref="theme" onChange={this.changeTheme.bind(this)}>
            <option value="-">Valitse Teema</option>
            <option value="BLACK">BLACK</option>
            <option value="WHITE">WHITE</option>
          </select>
          <NavLink to="/">
            <BiHome /> Home
          </NavLink>
          <NavLink
            to="/logout"
            onClick={() => logOut()}
          ><BsLock />
              logout
          </NavLink>
          <NavLink to="/Profile"> Profile </NavLink>
        </div>
      );
    }
    else {
      return (
        <div className="homeNav" >
          <select ref="theme" onChange={this.changeTheme.bind(this)}>
            <option value="-">Valitse Teema</option>
            <option value="BLACK">BLACK</option>
            <option value="WHITE">WHITE</option>
          </select>
          <NavLink to="/">
            <BiHome />
              Home
          </NavLink>
          <NavLink to="/Login"><BsLock /> Login </NavLink>
          <NavLink to="/Register"><HiOutlineUserAdd /> Registration </NavLink>
        </div>
      );
    }
  }
}

class Navigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavLogin />
          <NavContent />
          <Switch>
            <Route path="/addQuestion" component={AddQuestion} />
            <Route path="/addCandidates" component={AddCandidates} />
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
      </BrowserRouter>
    );
  }
}
export default Navigation;
