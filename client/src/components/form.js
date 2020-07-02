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
      answers: [],
      disabled: false,
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
          this.preFillForm()
        }
    });
  }

  preFillForm() {
    if (this.context.loggedIn) {
      axios.post('http://localhost:5000/fillForm',{data: this.context.email})
        .then(res => {
          if(Object.keys(res.data.filledForm).length > 1) {
            this.setState({disabled: true});
          }
            for (var i = 0; i < Object.keys(res.data.filledForm).length; i++) {
                  if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[2].value) {
                    this.refs['q' + i].childNodes[2].checked = true;
                  }
                  else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[3].value) {
                    this.refs['q' + i].childNodes[3].checked = true;
                  }
                  else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[4].value) {
                    this.refs['q' + i].childNodes[4].checked = true;
                  }
                  else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[5].value) {
                    this.refs['q' + i].childNodes[5].checked = true;
                  }
                  else if (res.data.filledForm['question' + i] == this.refs['q' + i].childNodes[6].value) {
                    this.refs['q' + i].childNodes[6].checked = true;
                  }
            }
      });
    }
  }

  handleClick(e) {
    this.state.answers[e.currentTarget.name] = parseInt(e.currentTarget.value);
    console.log(this.state.answers);
    //let sum =  this.state.answers.reduce((result,number) => result+number);
    //console.log(sum);
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
    var counter = -1;
    return (
      <form onSubmit={this.handleSubmit} method="POST">
      {this.state.questions.map(index => {
        counter++;
        if(index.area == this.props.location.state.value || index.area == 'Undefined') {
          return (
            <div className = 'questionSet' ref = {'q'+ counter} >
                <label>{index.question}</label>
                <div><sub className="disa">Disagree</sub><sub className="agg">Agree</sub></div>
                <input type = "radio" ref = "opt0"  value = "-2" name = {'question'+ counter} onChange={this.handleClick.bind(this)} disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt1" value = "-1" name = {'question'+ counter} onChange={this.handleClick.bind(this)}  disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt2" value = "0" name = {'question'+ counter} onChange={this.handleClick.bind(this)}   disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt3" value = "1" name = {'question'+ counter} onChange={this.handleClick.bind(this)}   disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt4" value = "2" name = {'question'+ counter} onChange={this.handleClick.bind(this)}   disabled = {this.state.disabled}/>
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
