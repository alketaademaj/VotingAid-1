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
            <option value="Undefined">Undefined</option>
            <option value="Laurea">Laurea</option>
            <option value="Metropolia">Metropolia</option>
            <option value="Haaga-Helia">Haaga-Helia</option>
            <option value="JAMK">JAMK</option>
            <option value="O'Diako">O'Diako</option>
          </select>
          <button type="submit">Add Question</button>
        </form>
      </div>
    );
  }
}

export default Registration;
