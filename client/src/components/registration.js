import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { HandleRegistration } from '../functions/dbCalls';
import SingleInputField from "./partials/singleInputField";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      status: "Candidate"
    }
    HandleRegistration(user, this.state.password, this.state.password_confirmation);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <SingleInputField 
            type = {'email'} name = {'email'} 
            placeholder = {'Email'} 
            value={this.state.email}
            action = {this.handleChange} 
            mandatory = {true}
          />
          <SingleInputField 
            type = {'password'} 
            name = {'password'} 
            placeholder = {'Password'} 
            value={this.state.password} 
            action = {this.handleChange} 
            mandatory = {true} 
          />
          <SingleInputField 
            type = {'password'} 
            name = {'password_confirmation'}
            placeholder = {'Confirm Password'} 
            value={this.state.password_confirmation} 
            action = {this.handleChange} 
            mandatory = {true} 
          />
          <button type="submit">Register</button>
          <Link to={{pathname: "/"}}> Back to MainPage </Link>
        </form>
      </div>
      //ERRORS WORK, BUT FORM IS SUBMITTED EVEN WHEN ERROR IS GIVEN
    );
  }
}

export default Registration;
