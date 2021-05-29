import React, { createContext, Component } from 'react';
import language from "../properties/language";

export const UserContext = createContext();

class UserContextProvider extends Component {
  constructor(props) {
    super(props)
    this.state = this.existingLogin() || {
      user: 'Quest',
      email: '',
      loggedIn: false,
      language: sessionStorage.getItem('language') ? sessionStorage.getItem('language') : 'fin'
    }
  }

  changeLanguage = (e) => {
    this.setState({ language: e.target.value });
    sessionStorage.setItem('language', e.target.value);
  }

  changeUser = (user, email, loggedIn, language) => {
    this.setState({
      user: user,
      email: email,
      loggedIn: loggedIn,
      language: language,
    });
    console.log(this.state);
  }

  logOut = () => {
    this.changeUser('Quest', '', false, language);
    sessionStorage.clear();
  }

  checkExistingLogin = () => {
    let email = sessionStorage.getItem('email');
    let status = sessionStorage.getItem('status');
    let language = sessionStorage.getItem('language');
    if (email && status) {
      this.changeUser(status, email, true, language);
    }
  }

  existingLogin() {
    let email = sessionStorage.getItem('email');
    let status = sessionStorage.getItem('status');
    let language = sessionStorage.getItem('language');
    if (email && status) {
      return {
        user: status,
        email: email,
        loggedIn: true,
        language: language
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
        changeLanguage: this.changeLanguage
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
