import React, { Component } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import OptionButton from './optionButton.js';

class Form extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: []
    };
  }

   componentDidMount() {
     console.log(this.props);
    axios.get('http://localhost:5000/questions')
      .then(res => {
        let q = [];
        for(var i = 0; i < res.data.length;i++) {
          q.push(res.data[i]);
          var joined = this.state.questions.concat(q[i]);
          this.setState({ questions: joined })
        }
    });
      if (this.context.loggedIn) {
        axios.post('http://localhost:5000/fillForm',{data: this.context.email})
          .then(res => {

        });
      }

  }

  handleClick(e) {
    this.state.answers[e.currentTarget.name] = parseInt(e.currentTarget.value);
    console.log(this.state.answers);
    let sum =  this.state.answers.reduce((result,number) => result+number);
    console.log(sum);
  }

  handleSubmit = event => {
    event.preventDefault();

    let answers = {};
    for (var i = 0; i < this.state.questions.length; i++) {
    //  answers[i]
      console.log();
    }
    axios.post('http://localhost:5000/send',this.state.answers)
      .then(res => {
          console.log(res);
      });
  }

  render() {
    console.log(this.props.location.state);
    var counter = -1;
    return (
      <form onSubmit={this.handleSubmit} method="POST">
      {this.state.questions.map(index => {
        counter++;
        if(index.area == this.props.location.state.value || index.area == 'Undefined') {
          return (
            <div className = {'questionSet'} >
                <label>{index.question}</label>
                <div><sub className="disa">Disagree</sub><sub className="agg">Agree</sub></div>
                <input type="radio" value="-2" name = {'question'+ counter} onChange={this.handleClick.bind(this)} checked = 'true' />
                <input type="radio" value="-1" name = {'question'+ counter} onChange={this.handleClick.bind(this)} />
                <input type="radio" value="0" name = {'question'+ counter} onChange={this.handleClick.bind(this)} />
                <input type="radio" value="1" name = {'question'+ counter} onChange={this.handleClick.bind(this)} />
                <input type="radio" value="2" name = {'question'+ counter} onChange={this.handleClick.bind(this)} />
            </div>
          );
        }
      }
    )}
        <input type="submit" value="Fill ur form"></input>
      </form>
    );
  }
}
export default Form;
