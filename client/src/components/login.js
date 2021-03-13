import React from "react";
import { Link } from 'react-router-dom';
import { HandleLogin } from '../functions/dbCalls';
import SingleInputField from "./partials/singleInputField";
import { UserContext } from "../context/userContext";

class Login extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  changeLogin = (status, email, isLoggedIn) => {
    const { changeUser } = this.context;
    changeUser(status, email, isLoggedIn);
    sessionStorage.setItem('email',this.context.email);
    sessionStorage.setItem('status',this.context.user);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    HandleLogin(user, this.changeLogin);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <SingleInputField
           type = {'email'} 
           name = {'email'} 
           placeholder = {'Email'} 
           value = {this.state.email} 
           action = {this.handleChange} 
           mandatory = {true}
          />
          <SingleInputField 
            type = {'password'} 
            name = {'password'} 
            placeholder = {'Password'} 
            value = {this.state.password} 
            action = {this.handleChange} 
            mandatory={true} 
          /> 
          <button type="submit"> Login </button>
          <Link to={{ pathname: "/"}}> Back to MainPage </Link> 
        </form>
      </div>
      // ERRORS WORK, BUT FORM IS SUBMITTED EVEN WHEN ERROR IS GIVEN
    );
  }
}

export default Login;
