import React, { Component } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import language from "../properties/language";
import { UserContext } from '../context/userContext';

class Registration extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      area: "",

    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleArea() {
    this.setState({ area: this.refs.area.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const question = {
      question: this.state.question,
      area: this.state.area,
    }

    axios.post('http://localhost:5000/addQuestion', question)
      .then(res => {
        console.log(res);
      });
  }

  onSubmit = () => { //alert as soon as a question is added 
    Swal.fire({
      title: 'You have succesfully submitted a question!',
      icon: "success",
      confirmButtonText: "Confirm",
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="question" name="question" placeholder={''} value={this.state.question} onChange={this.handleChange} required />
          <select ref="area" onChange={this.handleArea.bind(this)}>
            {/* <option value="-">Oppilaskunta / universaali</option> */}
            <option value="Undefined">Undefined</option>
            <option value="ASK">ASK</option>
            <option value="Helga">Helga</option>
            <option value="HUMAKO">HUMAKO</option>
            <option value="JAMKO">JAMKO</option>
            <option value="Laureamko">Laureamko</option>
            <option value="METKA">METKA</option>
            <option value="O'Diako">O'Diako</option>
            <option value="TUO">TUO</option>
          </select>
          <br></br>
          <button type="submit" onClick={this.onSubmit}>{language.addQuestionButton[this.context.language]}</button>
        </form>
      </div>
    );
  }
}

export default Registration;
