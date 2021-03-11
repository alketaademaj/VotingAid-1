import React from 'react';
import './App.css';
import Navigation from './components/navbar.js'
import UserContextProvider from './context/userContext';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <UserContextProvider>
        <div className="App">
          <Navigation />
        </div>
      </UserContextProvider>
    );
  }
}

export default App;
