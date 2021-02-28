import React, { createContext, Component} from 'react';

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    user: 'Quest',
    email: '',
    loggedIn: false,
  }

  changeUser = (user, email, loggedIn) => {
    this.setState({
      user: user,
      email: email,
      loggedIn: loggedIn
    });
  }

  logOut = () => {
    this.changeUser('Quest','',false);
    sessionStorage.clear();
  }

  checkExistingLogin = () => {
    var email = sessionStorage.getItem('email');
    var status = sessionStorage.getItem('status');
    if (email && status) {
      this.changeUser(status,email,true);
    }
  }

  render() {
    return (
      <UserContext.Provider value = {{...this.state,
        changeUser: this.changeUser,
        checkExistingLogin: this.checkExistingLogin,
         logOut: this.logOut
       }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
