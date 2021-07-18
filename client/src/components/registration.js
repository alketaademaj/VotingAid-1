import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import language from "../properties/language";
import { UserContext } from '../context/userContext';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
      password_confirmation: this.state.password_confirmation,
      status: "Candidate"
    }
    if (this.state.password == this.state.password_confirmation) {
      axios.post('http://localhost:5000/registration', user)
        .then(res => {
          console.log(user.email);
          console.log(res.data);
          Swal.fire({
            text: res.data,
            icon: res.data.includes('address') ? 'error' : 'success'
          })
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Confirmation Password Must Match With Password',
      })
    }
  }

  static contextType = UserContext;

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder={language.emailPlaceHolder[this.context.language]} value={this.state.email} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder={language.passwordPlaceHolder[this.context.language]} value={this.state.password} onChange={this.handleChange} required />
          <input type="password" name="password_confirmation" placeholder={language.passwordConfirmationPlaceHolder[this.context.language]} value={this.state.password_confirmation} onChange={this.handleChange} required />
          <button type="submit"> {language.registerButton[this.context.language]} </button>
          <Link
            to={{
              pathname: "/"
            }}> {language.mainPageLink[this.context.language]} </Link>
        </form>
      </div>
    );
  }
}

export default Registration;
