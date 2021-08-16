import React, { createContext, Component } from 'react';

export const UserContext = createContext();
class UserContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = this.existingLogin() || {
      user: 'Quest',
      email: '',
      loggedIn: false,
      language: 'fin',
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('language')) {
      this.setState({ language: sessionStorage.getItem('language') })
    }
  }

  changeLanguage = (e) => {
    this.setState({ language: e });
    sessionStorage.setItem('language', e);
  }

  changeUser = (user, email, loggedIn, language) => {
    this.setState({
      user: user,
      email: email,
      loggedIn: loggedIn,
    });
  }

  logOut = () => {
    this.changeUser('Quest', '', false);
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('status');
  }

  checkExistingLogin = () => {
    let email = sessionStorage.getItem('email');
    let status = sessionStorage.getItem('status');
    if (email && status) {
      this.changeUser(status, email, true);
    }
  }

  existingLogin() {
    let email = sessionStorage.getItem('email');
    let status = sessionStorage.getItem('status');
    if (email && status) {
      return {
        user: status,
        email: email,
        loggedIn: true,
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={{
        ...this.state,
        changeUser: this.changeUser,
        checkExistingLogin: this.checkExistingLogin,
        logOut: this.logOut,
        changeLanguage: this.changeLanguage,
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;