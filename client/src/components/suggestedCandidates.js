import React, { Component } from 'react';
import axios from "axios";

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
  }

  componentDidMount() {
    var userAnswers = this.props.location.data.answers;
    var data = {
      answers: this.props.location.data.answers,
      school: this.props.location.data.school
    };
    console.log(this.props.location.data.school) //KORJAA, miks ne on undefined? 
    axios.post('http://localhost:5000/suggested', { data: data })
      .then(res => {
        this.setState({ suggestions: res.data });
      });
    //JOS HALUTAAN PROSENTUAALISTA VERTAILUA if(userSum >= (candSum * 0.75))
  }

  render() {
    if (this.state.suggestions.length > 0) {
      return (
        <div className="candidateSuggestions">
          <h1>Candidates With Matching Values:</h1>
          {this.state.suggestions.map((candidate, index) => {
            return (
              <h2>{candidate.name} </h2>
            );
          }
          )}
        </div>
      );
    }
    else {
      return (
        <h2 className="candidateSuggestions"> You are so obscure that no one relates with you </h2>
      );
    }
  }
}

export default Suggestions;
