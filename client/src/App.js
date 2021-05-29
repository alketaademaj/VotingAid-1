import React from 'react';
import './App.css';
import './AppMini.css';
import Navigation from './components/navbar.js'
//import Content from './components/homeContent.jsx'
import UserContextProvider from './context/userContext';
import language from "./properties/language";

const App = () =>
  <div>
    <UserContextProvider>
      <div className="App">
        <Navigation />
      </div>
    </UserContextProvider>
  </div>
export default App;
