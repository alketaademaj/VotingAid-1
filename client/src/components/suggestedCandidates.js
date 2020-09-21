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
         this.setState({['similarity'+i]: 1});
         this.setState({['danger'+i]: 1});
         let candidateArray = [];

         for (var j = 0; j < Object.keys(res.data[i].filledForm).length / 2; j++) {
           if (userAnswers[j] === res.data[i].filledForm['question' + j]) {
             this.setState({['similarity'+i]: this.state['similarity'+ i] += 1});

           }

           candidateArray.push(res.data[i].filledForm['question' + j]); //Creating an array from filledForm integers
           // if(userAnswers[j] >) IN A  CERTAIN RANGE


           if( (userAnswers[j]  == 2 && res.data[i].filledForm['question' + j] == -2) || (userAnswers[j]  == -2 && res.data[i].filledForm['question' + j] == 2) ) {
             this.setState({['danger'+i]: this.state['danger'+ i] += 1});
           }
         }
         let userSum = userAnswers.reduce((result,number) => result+number);
         let candSum = candidateArray.reduce((result,number) => result+number);
         console.log("//------------------------------------------------//");
         console.log('KANDIDAATTI ' + res.data[i].name + ' ' + res.data[i].surname);
         console.log(userSum + " Nää on vastaajan tulokset");
         console.log(candSum + " Nää on kandidaatin tulokset");
         console.log("Samoja Vastauksia " + this.state['similarity'+ i]);
         console.log("Päinvastasia vastauksia " + this.state['danger' + i] + " DANGER");
         console.log("//------------------------------------------------//");
          console.log(userAnswers.length + " VASTATUN FORMIN PITUUS");
          console.log(Object.keys(res.data[i].filledForm).length / 2 + " VASTATUN KANDIDAATIN PITUUS");

         if ( (userSum >= (candSum * 0.50) || this.state['danger' + i] <= 0.25 * userAnswers.length) && this.state['similarity' + i] >= (0.30 * userAnswers.length) ) {
           s.push(res.data[i]);
           this.setState({suggestions: s});
         }
       }
       console.log(this.state);
   });
   //JOS HALUTAAN PROSENTUAALISTA VERTAILUA if(userSum >= (candSum * 0.75))
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
