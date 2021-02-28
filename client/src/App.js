import React from 'react';
import './App.css';
import Navigation from './components/navbar.js'
import Content from './components/homeContent.jsx'
import UserContextProvider from './context/userContext';
import swal from 'sweetalert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
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
