import React, { createContext, Component} from 'react';

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    user: 'Quest',
    email: '',
    loggedIn: false,
  }
  render() {
    return (
      <UserContext.Provider value = {{...this.state}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
