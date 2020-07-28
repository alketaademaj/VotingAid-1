import React, { Component } from 'react';
import axios from "axios";

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      similarity: 0,
    };
  }

  componentDidMount() {
    var userAnswers = this.props.location.data.answers;
   axios.post('http://localhost:5000/forms',{data: this.props.location.data.school})
     .then(res => {
       let s = [];
       for (var i = 0; i < res.data.length; i++) {
         this.setState({similarity: 0});

         for (var j = 0; j < Object.keys(res.data[i].filledForm).length / 2; j++) {
           if (userAnswers[j] === res.data[i].filledForm['question' + j]) {
             this.setState({similarity: this.state.similarity + 1});
             console.log('LÄPI MENI');
           }
         }

         if (this.state.similarity >= 2) {
           s.push(res.data[i]);
           this.setState({suggestions: s});
         }
       }
       console.log(this.state.suggestions.length);
   });
 }

 render() {
     if(this.state.suggestions.length > 0) {
       return (
         <div className = "candidateSuggestions">
         <h1>Candidates With Matching Values:</h1>
           {this.state.suggestions.map(index => {
              return (
                 <h2>{index.name}</h2>
              );
           }
          )}
          </div>
       );
    }
    else {
      return (
        <h2> You are so obscure that no one relates with you </h2>
      );
    }
  }
}

export default Suggestions;
