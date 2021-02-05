import React, { Component } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import OptionButton from "./optionButton.js";

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
    console.log(this.props.location.state.value);
    axios
      .post("http://localhost:5000/questions", {
        data: this.props.location.state.value,
      })
      .then((res) => {
        let q = [];
        for (var i = 0; i < res.data.length; i++) {
          q.push(res.data[i]);
          var joined = this.state.questions.concat(q[i]);
          this.setState({ questions: joined });
          this.preFillForm();
        }
      });
  }


  preFillForm() {
    var email = this.context.email;
    if (this.props.location.data != null) {
      email = this.props.location.data.email;
    }

    if (this.context.loggedIn) {
      axios
        .post("http://localhost:5000/fillForm", { data: email })
        .then((res) => {
          if (Object.keys(res.data.filledForm).length > 1) {
            //this.setState({disabled: true}); ENABLE THIS WHILE NOT TESTING
          }
          for (
            var i = 0;
            i < Object.keys(res.data.filledForm).length / 2;
            i++
          ) {
            if (
              res.data.filledForm["question" + i] ==
              this.refs["q" + i].childNodes[2].value
            ) {
              this.refs["q" + i].childNodes[2].checked = true;
            } else if (
              res.data.filledForm["question" + i] ==
              this.refs["q" + i].childNodes[3].value
            ) {
              this.refs["q" + i].childNodes[3].checked = true;
            } else if (
              res.data.filledForm["question" + i] ==
              this.refs["q" + i].childNodes[4].value
            ) {
              this.refs["q" + i].childNodes[4].checked = true;
            } else if (
              res.data.filledForm["question" + i] ==
              this.refs["q" + i].childNodes[5].value
            ) {
              this.refs["q" + i].childNodes[5].checked = true;
            } else if (
              res.data.filledForm["question" + i] ==
              this.refs["q" + i].childNodes[6].value
            ) {
              this.refs["q" + i].childNodes[6].checked = true;
            }
            this.refs["desc" + i].value =
              res.data.filledForm["questiondesc" + i];
          }
        });
    }
  }

  isQuest(counter) {
    if (this.context.user != "Quest") {
      return (
        <input
          type="text"
          name={counter}
          ref={"desc" + counter}
          placeholder="Explain your choice"
          style={{ marginBottom: "41px", width: "50%" }}
          onChange={this.handleChange.bind(this)}
          disabled={this.state.disabled}
        ></input>
      );
    }
  }

  choice(counter, value) {
    return (
      <input
        type="radio"
        ref={"opt" + counter}
        value={value}
        name={counter}
        onChange={this.handleClick.bind(this)}
        disabled={this.state.disabled}
      />
    );
  }

  handleChange(e) {
    this.state.answersDesc[e.currentTarget.name] = e.currentTarget.value;
    console.log(this.state.answersDesc);
  }

  handleClick(e) {
    this.state.answers[e.currentTarget.name] = parseInt(e.currentTarget.value);
    console.log(this.state.answers);
    let sum = this.state.answers.reduce((result, number) => result + number);
    console.log(sum);
  }

  handleSubmit = (event) => {
    if (this.context.user != "Quest") {
      event.preventDefault();
      let answers = {};
      for (var i = 0; i < this.state.questions.length; i++) {
        //  answers[i]
        console.log();
      }
      axios
        .post("http://localhost:5000/send", {
          ans: this.state.answers,
          desc: this.state.answersDesc,
          email: this.context.email,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      this.props.history.push({
        pathname: "/suggestedCandidates",
        data: {
          answers: this.state.answers,
          school: this.props.location.state.value,
        },
      });
    }
  };

  render() {
    if (this.props.location.state != null) {
      var area = this.props.location.state.value;
    }

    if (this.props.location.data != null) {
      area = this.props.location.data.school;
    }
    var counter = -1;
    return (
      <form onSubmit={this.handleSubmit} method="POST">
        {this.state.questions.map((index) => {
          counter++;
          //if(index.area == area || index.area == 'Undefined') {
          return (
            console.log(area),
            (
              <div className="questionSet" ref={"q" + counter}>
                <label>{index.question}</label>
                <div>
                  <sub className="disa">Disagree</sub>
                  <sub className="agg">Agree</sub>
                </div>
                <label class="container">
                  {this.choice(counter, -2)}
                  <span class="checkmark"></span>
                </label>
                <label class="container">
                  {this.choice(counter, -1)}
                  <span class="checkmark"></span>
                </label>
                <label class="container">
                  {this.choice(counter, 0)}
                  <span class="checkmark"></span>
                </label>
                <label class="container">
                  {this.choice(counter, 1)}
                  <span class="checkmark"></span>
                </label>
                <label class="container">
                  {this.choice(counter, 2)}
                  <span class="checkmark"></span>
                </label>
                <br />
                {this.isQuest(counter)}
                <br />
              </div>
            )
          );
          //}
          //if (index.area != area || index.area != 'Undefined') {
          //counter--;
          //}
        })}
        <input
          className="filled-form"
          type="submit"
          value="Fill ur form"
        ></input>
      </form>
    );
  }
}

export default Form;
