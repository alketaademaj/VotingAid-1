import React, { Component } from 'react';
import axios from "axios";

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: {},
      similarity: 0,
    };
  }

  componentDidMount() {
    var userAnswers = this.props.location.data.answers;
   axios.post('http://localhost:5000/forms',{data: this.props.location.data.school})
     .then(res => {
       for (var i = 0; i < res.data.length; i++) {
         for (var j = 0; j < Object.keys(res.data[i].filledForm).length / 2; j++) {
           if (userAnswers[j] === res.data[i].filledForm['question' + j]) {
             this.setState({similarity: this.state.similarity + 1});
             console.log('LÄPI MENI');
           }
         }
       }

   });
 }

 render() {
   return <h1>{this.state.similarity}</h1>;
 }
}

export default Suggestions;
