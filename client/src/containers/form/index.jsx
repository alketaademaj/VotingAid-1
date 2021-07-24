import React, { Component } from "react";

import axios from "axios";
import { url, endpoint } from "../../api";
import { UserContext } from "../../context/userContext";

import Swal from "sweetalert2";

import DefaultInput from "../../components/defaultInput";
import DefaultButton from "../../components/defaultButton";

import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";

class Form extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      answersDesc: [],
      area: "",
      path: this.props.location.pathname.split("/")[2],
    };
  }

  componentDidMount() {
    axios
      .post(url + endpoint.questions, { data: this.state.path })
      .then((res) => {
        this.setState({ questions: res.data });
        if (this.context.loggedIn) {
          axios
            .post(url + endpoint.fillForm, { data: this.context.email })
            .then((response) => {
              console.log(this.state.questions.length);
              res.data.forEach((element, idx) => {
                let count = 0;
                for (
                  var i = 0;
                  i < Object.keys(response.data.filledForm).length / 2;
                  i++
                ) {
                  if (
                    res.data.filledForm["question" + count] ===
                    this.refs["q" + count].childNodes[2].childNodes[0].value
                  ) {
                    this.refs[
                      "q" + count
                    ].childNodes[2].childNodes[0].checked = true;
                  } else if (
                    res.data.filledForm["question" + count] ===
                    this.refs["q" + count].childNodes[3].childNodes[0].value
                  ) {
                    this.refs[
                      "q" + count
                    ].childNodes[3].childNodes[0].checked = true;
                  } else if (
                    res.data.filledForm["question" + count] ===
                    this.refs["q" + count].childNodes[4].childNodes[0].value
                  ) {
                    this.refs[
                      "q" + count
                    ].childNodes[4].childNodes[0].checked = true;
                  } else if (
                    res.data.filledForm["question" + count] ===
                    this.refs["q" + count].childNodes[5].childNodes[0].value
                  ) {
                    this.refs[
                      "q" + count
                    ].childNodes[5].childNodes[0].checked = true;
                  } else if (
                    res.data.filledForm["question" + count] ===
                    this.refs["q" + count].childNodes[6].childNodes[0].value
                  ) {
                    this.refs[
                      "q" + count
                    ].childNodes[6].childNodes[0].checked = true;
                  }
                  this.refs["desc" + count].value =
                    res.data.filledForm["questiondesc" + count];
                  count++;
                }
              });
            });
        }
      });
  }

  componentDidUpdate() {}

  preFillForm() {
    var email = this.context.email;
    if (this.context.loggedIn) {
      axios.post(url + endpoint.fillForm, { data: email }).then((res) => {
        console.log(res);
        // if (Object.keys(res.data.filledForm).length > 1) {
        //   this.setState({ disabled: true });
        // }
        // for (var i = 0; i < Object.keys(res.data.filledForm).length / 2; i++) {
        //   if (
        //     res.data.filledForm["question" + i] ==
        //     this.refs["q" + i].childNodes[2].childNodes[0].value
        //   ) {
        //     this.refs["q" + i].childNodes[2].childNodes[0].checked = true;
        //   } else if (
        //     res.data.filledForm["question" + i] ==
        //     this.refs["q" + i].childNodes[3].childNodes[0].value
        //   ) {
        //     this.refs["q" + i].childNodes[3].childNodes[0].checked = true;
        //   } else if (
        //     res.data.filledForm["question" + i] ==
        //     this.refs["q" + i].childNodes[4].childNodes[0].value
        //   ) {
        //     this.refs["q" + i].childNodes[4].childNodes[0].checked = true;
        //   } else if (
        //     res.data.filledForm["question" + i] ==
        //     this.refs["q" + i].childNodes[5].childNodes[0].value
        //   ) {
        //     this.refs["q" + i].childNodes[5].childNodes[0].checked = true;
        //   } else if (
        //     res.data.filledForm["question" + i] ==
        //     this.refs["q" + i].childNodes[6].childNodes[0].value
        //   ) {
        //     this.refs["q" + i].childNodes[6].childNodes[0].checked = true;
        //   }
        //   this.refs["desc" + i].value = res.data.filledForm["questiondesc" + i];
        // }
      });
    }
  }

  isQuest(counter) {
    if (this.context.user !== "Quest") {
      return (
        <input
          type="text"
          name={counter}
          placeholder="Explain your choice"
          style={{ marginBottom: "41px", width: "50%" }}
          onChange={this.handleChange}
          disabled={this.state.disabled}
        />
      );
    }
  }

  choice(counter, value) {
    return (
      <input
        className=""
        type="radio"
        value={value}
        ref={"opt" + counter}
        name={counter}
        onChange={this.handleClick}
        disabled={this.state.disabled}
      />
    );
  }

  handleChange = (e) => {
    this.state.answersDesc[e.currentTarget.name] = e.currentTarget.value;
    console.log(this.state.answersDesc);
  };

  handleClick = (e) => {
    this.state.answers[e.currentTarget.name] = parseInt(e.currentTarget.value);
    console.log(this.state.answers);
    let sum = this.state.answers.reduce((result, number) => result + number);
    console.log(sum);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.context.user !== "Quest") {
      axios
        .post(url + endpoint.send, {
          ans: this.state.answers,
          desc: this.state.answersDesc,
          email: this.context.email,
          studentAssociation: this.context.path,
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "You have succesfully filled the form!",
            icon: "success",
            confirmButtonText: "Confirm",
          });
        });
    } else {
      this.props.history.push({
        pathname: "/suggestedCandidates",
        data: {
          answers: this.state.answers,
          studentAssociation: this.state.path,
        },
      });
    }
  };

  render() {
    return (
      <div
        className="homeScreen"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          {this.state.questions &&
            React.Children.toArray(
              this.state.questions.map((question, idx) => (
                <>
                  <div className="questionSet">
                    <label style={{ fontSize: 16 }}>
                      <strong>Question:</strong>
                      {this.context.language === "fin"
                        ? question.questionFin
                        : question.question}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                      }}
                    >
                      <span>Disagree</span>
                      <span className="agg">Agree</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                      }}
                    >
                      <label className="boxContainer">
                        {this.choice(idx, -2)}
                        <span className="checkmark"></span>
                        <span
                          style={{
                            fontSize: 14,
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          -2
                        </span>
                      </label>
                      <label className="boxContainer">
                        {this.choice(idx, -1)}
                        <span className="checkmark"></span>
                        <span
                          style={{
                            fontSize: 14,
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          -1
                        </span>
                      </label>
                      <label className="boxContainer">
                        {this.choice(idx, 0)}
                        <span className="checkmark"></span>
                        <span
                          style={{
                            fontSize: 14,
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          0
                        </span>
                      </label>
                      <label className="boxContainer">
                        {this.choice(idx, 1)}
                        <span className="checkmark"></span>
                        <span
                          style={{
                            fontSize: 14,
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          1
                        </span>
                      </label>
                      <label className="boxContainer">
                        {this.choice(idx, 2)}
                        <span className="checkmark"></span>
                        <span
                          style={{
                            fontSize: 14,
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          2
                        </span>
                      </label>
                    </div>
                    {this.context.user !== "Quest" && (
                      <DefaultInput
                        label="Explain your choice"
                        type="text"
                        name={idx}
                        ref={"desc" + idx}
                        onChange={this.handleChange}
                        disabled={this.state.disabled}
                      />
                    )}
                  </div>
                </>
              ))
            )}

          <DefaultButton
            type="submit"
            borderColor={DARK_GREEN}
            backgroundColor={GREEN}
            textColor={WHITE}
            text={"Fill ur form"}
          />
        </form>
      </div>
    );
  }
}
export default Form;
