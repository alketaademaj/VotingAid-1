import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import {UserContext} from './../context/userContext'

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
import AdminNavbar from './partials/adminNavbar';
import NavbarContent from './partials/navbarContent'


class Navigation extends Component {
  static contextType = UserContext;
  componentDidMount() {
    this.context.checkExistingLogin();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavbarContent/>
          <AdminNavbar />
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
