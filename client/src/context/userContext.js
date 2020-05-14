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

  render() {
    return (
      <UserContext.Provider value = {{...this.state, changeUser: this.changeUser }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
