import React, { Component } from "react";
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

import axios from "axios";
import Swal from 'sweetalert2';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }

    axios.post('http://localhost:5000/login',  user)
      .then(res => {
        if (res) {
          const { changeUser } = this.context;
          changeUser(res.data.status,res.data.email,true);
          if(!this.context.user || !this.context.email) {  // TODO: COME UP WITH SOMETHING BETTER MAYBE
            changeUser('Quest','',false);
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: 'Invalid Username Or Password',
            })
          } else {
              Swal.fire({
                title: "You've Succesfully Logged In",
                text: "You may now enter",
                icon: "success",
                confirmButtonText: "Confirm",
              });
              sessionStorage.setItem('email',this.context.email);
              sessionStorage.setItem('status',this.context.user);
              this.props.history.push({
                pathname: '/',
              })
          }
        }
      });
  }

  static contextType = UserContext;

  render() {
    const { changeUser } = this.context;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
          <button type="submit">Login</button>
          <Link
          to={{
            pathname: "/"
          }}> Back to MainPage </Link>
        </form>
      </div>
    );
  }
}

export default Login;
