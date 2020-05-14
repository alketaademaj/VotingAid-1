import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/form.js'
import Navigation from './components/navbar.js'
import Content from './components/homeContent.js'
import Registration from './components/registration.js'
import Login from './components/login.js'

import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  UserContextProvider  from './userContext';


  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        user: {}
      };
    }


  render() {
    return (
      <div className="App">
      <UserContextProvider>
      <BrowserRouter>
       <div>
         <Navigation />
           <Switch>
            <Route path="/Form" component={Form}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Registration}/>
            <Route path="/" component={Content}/>
          </Switch>
       </div>
      </BrowserRouter>
      </UserContextProvider>
      </div>
    );
  }
}


export default App;
