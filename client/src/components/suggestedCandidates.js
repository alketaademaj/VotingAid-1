import React, { Component } from 'react';
import axios from "axios";
import Picture from './partials/picture';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      similarity: []
    };
  }

  componentDidMount() {
    var userAnswers = this.props.location.data.answers;
    var data = {
      answers: this.props.location.data.answers,
      studentAssociation: this.props.location.data.studentAssociation
    };
    axios.post('http://localhost:5000/suggested', { data: data })
      .then(res => {
        this.setState({ suggestions: res.data });
        this.setState({ similarity: res.data[0].filledForm });
        console.log(this.similarity) // yhden kandidaatin formivastaukset, seuraava vaihe on laskea ne yhteen ja verrata ne omaan yhteenlaskettuun summaan
      });
    console.log(this.similarity)
    //JOS HALUTAAN PROSENTUAALISTA VERTAILUA if(userSum >= (candSum * 0.75))
  }

  render() {
    if (this.state.suggestions.length > 0) {
      return (
        <div className="candidateSuggestions">
          <h1>Candidates With Matching Values:</h1>
          {this.state.suggestions.map((candidate, index) => {
            return (
              console.log(this.state.suggestions),
              <div className="candidateSuggestionCenter">
                <h2> {<Picture className="pic" source={process.env.PUBLIC_URL + candidate.image}></Picture>} {candidate.name} {candidate.surname}</h2>
              </div>
            );
          }
          )}
        </div>
      );
    }
    else {
      return (
        <h2 className="candidateSuggestions"> Unfortunately no one related with your answers </h2>
      );
    }
  }
}

export default Suggestions;
