import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

import Form from './form.js';
import Content from './homeContent.js';
import Registration from './registration.js';
import Login from './login.js';

import { UserContext } from '../context/userContext';

  class NavContent extends Component {

    handleChange(event) {
      this.render();
    }
    static contextType = UserContext;
    render() {
      if(this.context.loggedIn) {
        return (
           <div>
              <NavLink to="/"> Home </NavLink>
              <NavLink to="/Register"> Registration </NavLink>
              <NavLink to="/Login"> Login </NavLink>
           </div>
         );
      }
      else {
        return (
          <h1>moi</h1>
        );
      }
    }
  }

  class Navigation extends Component {
  render() {
    return (
      <BrowserRouter>
       <div>
         <NavContent />
           <Switch>
            <Route path="/Form" component={Form}/>
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
