import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

//Components
import Form from './form.js';
import Content from './homeContent.js';
import Registration from './registration.js';
import Login from './login.js';
import Profile from './profile.js';
import Candidates from './candidates.js';
import Questions from './questions.js';
import Suggestions from './suggestedCandidates.js';
import AddCandidates from './addCandidates.js';

import { UserContext } from '../context/userContext';

  class NavContent extends Component {
    static contextType = UserContext;
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      if(this.context.loggedIn && this.context.user === "Admin") { //BETTER FIX FOR THESE LINES PLEASE
        return (
           <div>
           <h2>Admin Navbar</h2>
              <NavLink to="/"> Home |</NavLink>
              <NavLink to="/addCandidates"> Add Candidates |</NavLink>
              <NavLink to="/Candidates"> Browse Candidates |</NavLink>
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
    render() {
      const { changeUser } = this.context;
      if (this.context.loggedIn && this.context.user == "Admin") { //BETTER FIX FOR THESE LINES PLEASE
        return (
          <div>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/logout" onClick={() => changeUser('Quest','',false)}>logout </NavLink>
            <NavLink to="/Profile"> Profile </NavLink>
          </div>
        );
      }
      else {
        return (
          <div>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/Login"> Login </NavLink>
            <NavLink to="/Register"> Registration </NavLink>
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
            <Route path="/addCandidates" component={AddCandidates}/>
            <Route path="/Candidates" component={Candidates}/>
            <Route path="/suggestedCandidates" component={Suggestions}/>
            <Route path="/Questions" component={Questions}/>
            <Route path="/Form" component={Form}/>
            <Route path="/Profile" component={Profile}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Registration}/>
            <Route path="/" component={Content}/>
          </Switch>
       </div>
      </BrowserRouter>
    );
  }
}
export default Navigation;
