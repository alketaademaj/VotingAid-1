import React, { Component } from "react";
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

import axios from "axios";
import swal from 'sweetalert';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverResponse: "",
    };

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
        this.setState({serverResponse: res.data.email});
        const { changeUser } = this.context;
        changeUser(res.data.status,res.data.email,true);
        swal({
          title: "You've Succesfully Logged In",
          text: "You may now enter",
          icon: "./theReconing.png",
          button: "NICE COCK!",
        });
        this.props.history.push({
          pathname: '/',
        })

      });
      swal('Invalid Password or Email Address')
  }

  componentWillMount() {
    console.log(this.context);
          localStorage.setItem('rememberMe', this.context);
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
