import React, { Component } from "react";
import axios from "axios";

class Registration extends React.Component {
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
    this.setState({area: this.refs.area.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const question = {
      question: this.state.question,
      area: this.state.area,
    }

    axios.post('http://localhost:5000/addQuestion',  question)
      .then(res => {

      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="question" name="question" placeholder="question" value={this.state.question} onChange={this.handleChange} required/>
          <select ref="area" onChange={this.handleArea.bind(this)}>
          <option value="-">Oppilaskunta / universaali</option>
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
          <button type="submit">Add Question</button>
        </form>
      </div>
    );
  }
}

export default Registration;
