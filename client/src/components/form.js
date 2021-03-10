import React, { Component } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { GetQuestions, PreFillForm } from "../functions/dbCalls";
import  FormOptionSet  from "./partials/formOptionSet";

class Form extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      answersDesc: [],
      area: '',
    };
  }

  SetQuestionArray = (array) => {
    this.setState({questions: array});
  }

  SetArea = () => {
    this.props.location.studentAssociation == undefined ? 
    this.setState({area: this.props.location.data.studentAssociation}) : 
    this.setState({area: this.props.location.studentAssociation})
  }
 
  componentDidMount() {
  GetQuestions(this.props.location.studentAssociation, this.SetQuestionArray)
  this.SetArea();
  }

  handleChange(e) {
    this.state.answersDesc[e.currentTarget.name] = e.currentTarget.value;
  }

  handleClick(e) {
    this.state.answers[e.currentTarget.name] = parseInt(e.currentTarget.value);
    let sum = this.state.answers.reduce((result, number) => result + number);
  }

  handleSubmit = event => {
    if (this.context.user != 'Quest') {
      event.preventDefault();
      for (var i = 0; i < this.state.questions.length; i++) {
      }
      axios.post('http://localhost:5000/send', { 
        ans: this.state.answers, 
        desc: this.state.answersDesc, 
        email: this.context.email 
      })
        .then(res => {
          console.log(res);
        });
    }
    else {
      this.props.history.push({
        pathname: '/suggestedCandidates',
        data: {
          answers: this.state.answers,
          school: this.state.area,
        }
      })
    }
  }

  render() {
    var counter = -1;
    return (
      <div className="VotingAidForm">
        <form onSubmit={this.handleSubmit} method="POST">
        {this.state.questions.map(index => {
          counter++;
            return (
              <FormOptionSet
                key={'q' + counter} 
                isCandidate={this.isCandidate} 
                questionTitle={index.question} 
                counter={counter} 
                action={this.handleClick.bind(this)}
              />
            );       
        }
      )}
          <input type="submit" value="Fill ur form"></input>
        </form>
        {this.context.loggedIn ? PreFillForm(this.context.email) : ''}
        </div>
      );
  }
}
export default Form;