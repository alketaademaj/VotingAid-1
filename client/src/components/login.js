import React, { Component } from "react";
import { UserContext } from '../context/userContext';
import language from "../properties/language";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

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

    axios.post('http://localhost:5000/login', user)
      .then(res => {
        if (res) {
          const { changeUser } = this.context;
          changeUser(res.data.status, res.data.email, true, this.context.language);
          if (!this.context.user || !this.context.email) {  // TODO: COME UP WITH SOMETHING BETTER MAYBE
            changeUser('Quest', '', false, this.context.language);
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
            sessionStorage.setItem('email', this.context.email);
            sessionStorage.setItem('status', this.context.user);
            sessionStorage.setItem('language', this.context.language);
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
          <input type="email" name="email" placeholder={language.emailPlaceHolder[this.context.language]} value={this.state.email} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder={language.passwordPlaceHolder[this.context.language]} value={this.state.password} onChange={this.handleChange} required />
          <button type="submit">{language.loginButton[this.context.language]}</button>
          <Link
            to={{
              pathname: "/"
            }}> {language.mainPageLink[this.context.language]} </Link> <br></br><br></br>
          {/* <p className="forgot-password text-right">
            <Link
              to={{
                pathname: "/newPassword"
              }}> Unohditko salasanan? </Link></p> */}
        </form>
      </div>
    );
  }
}

export default Login;
