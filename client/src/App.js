import React from 'react';
import './App.css';
import './AppMini.css';
import Navigation from './components/navbar.js'
import UserContextProvider from './context/userContext';

export default function App() {

  return <>
    <UserContextProvider>
      <div className={"App"}>
        <Navigation />
      </div>
    </UserContextProvider>
  </>
}