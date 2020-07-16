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
      answersDesc: [],
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
    var email = this.context.email;
    if(this.props.location.data != null) {
      email = this.props.location.data.email;
    }

    if (this.context.loggedIn) {
      axios.post('http://localhost:5000/fillForm',{data: email})
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
                  this.refs['desc' + i].value = res.data.filledForm['questiondesc' + i];
            }
      });
    }
  }

  isQuest(counter) {
    if(this.context.user != 'Quest') {
      return <input type= "text" name = {counter} ref = {"desc" + counter}  placeholder = "fiif miten fä niinky peruftelifit fun valinnan" style={{marginBottom: "41px", width: "50%"}} onChange={this.handleChange.bind(this)} disabled = {this.state.disabled}></input>
    }
  }

  handleChange(e) {
    this.state.answersDesc[e.currentTarget.name] = e.currentTarget.value;
    console.log(this.state.answersDesc);
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
    axios.post('http://localhost:5000/send',{ans: this.state.answers, desc: this.state.answersDesc})
      .then(res => {
          console.log(res);
      });
  }

  render() {
    if(this.props.location.state != null) {
      var area = this.props.location.state.value;
    }

    if(this.props.location.data != null) {
      area = this.props.location.data.school;
    }
    var counter = -1;
    return (
      <form onSubmit={this.handleSubmit} method="POST">
      {this.state.questions.map(index => {
        counter++;
        if(index.area == area || index.area == 'Undefined') {
          return (
            <div className = 'questionSet' ref = {'q'+ counter} >
                <label>{index.question}</label>
                <div><sub className="disa">Disagree</sub><sub className="agg">Agree</sub></div>
                <input type = "radio" ref = "opt0"  value = "-2" name = {counter} onChange={this.handleClick.bind(this)} disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt1" value = "-1" name = {counter} onChange={this.handleClick.bind(this)}  disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt2" value = "0" name = {counter} onChange={this.handleClick.bind(this)}   disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt3" value = "1" name = {counter} onChange={this.handleClick.bind(this)}   disabled = {this.state.disabled}/>
                <input type = "radio" ref = "opt4" value = "2" name = {counter} onChange={this.handleClick.bind(this)}   disabled = {this.state.disabled}/>
                <br />
                {this.isQuest(counter)}
                <br />
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
