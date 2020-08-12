import React, { Component } from 'react';
import axios from "axios";

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  componentDidMount() {
    var userAnswers = this.props.location.data.answers;
   axios.post('http://localhost:5000/forms',{data: this.props.location.data.school})
     .then(res => {
       let s = [];
       for (var i = 0; i < res.data.length; i++) {
         let counterS = 0;
         let counterD = 0;
         for (var j = 0; j < Object.keys(res.data[i].filledForm).length / 2; j++) {
           if (userAnswers[j] === res.data[i].filledForm['question' + j]) {
             counterS++;
             this.setState({['similarity'+i]: counterS});
             console.log('LÄPI MENI');
           }
           // if(userAnswers[j] >) IN A  CERTAIN RANGE


           if( (userAnswers[j]  == 2 && res.data[i].filledForm['question' + j] == -2) || (userAnswers[j]  == -2 && res.data[i].filledForm['question' + j] == 2) ) {
             counterD++;
             this.setState({['danger'+i]: counterD});
           }
         }

         if (this.state['similarity' + i] >= 1) {
           s.push(res.data[i]);
           this.setState({suggestions: s});
         }
       }
       console.log(this.state);
   });
 }

 render() {
     if(this.state.suggestions.length > 0) {
       return (
         <div className = "candidateSuggestions">
         <h1>Candidates With Matching Values:</h1>
           {this.state.suggestions.map((candidate, index) => {
              return (
                 <h2>{candidate.name} | Similarity Score: {this.state['similarity' + (index)]} | Additive Inverse: {this.state['danger' + (index)]}</h2>
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
