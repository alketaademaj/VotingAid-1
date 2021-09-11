import React, { Component } from "react";
import axios from "axios";
import Picture from "../../components/partials/picture";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";
import { endpoint } from "../../api";
import CandidateAnswers from "../candidateAnswers";

class Suggestions extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      showCandidateAnswers: false,
    };
  }

  hideComponent = (name) => {
    console.log(name);
    switch (name) {
      case "showCandidateAnswers":
        this.setState({
          showCandidateAnswers: !this.state.showCandidateAnswers,
        });
        break;
    }
  };

  componentDidMount() {
    var data = {
      answers: this.props.location.data.answers,
      studentAssociation: this.props.location.data.studentAssociation,
    };
    axios.post(endpoint.suggested, { data: data }).then((res) => {
      this.setState({ suggestions: res.data });
      /*console.log(this.state.suggestions);*/
    });
  }

  render() {
    const { showCandidateAnswers } = this.state;
    const myData = [].concat(this.state.suggestions);
    if (this.state.suggestions.length > 0) {
      return (
        <div
          className="candidateSuggestions"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h1
            style={{
              display: "inline-block",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {language.matchingCandidates[this.context.language]}
          </h1>
          {myData
            .sort((a, b) => (a.similarity < b.similarity ? 1 : -1))
            .map((candidate) => {
              return (
                /*console.log(this.state.suggestions),*/
                <div>
                  <div className="candidateSuggestionCenter">
                    <h2
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      {" "}
                      {
                        <Picture
                          className="pic"
                          source={process.env.PUBLIC_URL + candidate.image}
                        ></Picture>
                      }{" "}
                      {candidate.name} {candidate.surname}{" "}
                      {candidate.similarity.toFixed() + "%"}
                    </h2>{" "}
                  </div>
                  {showCandidateAnswers && (
                    <CandidateAnswers candidateInfo={candidate} />
                  )}
                  <button
                    style={{
                      margin: "0 auto",
                      display: "block",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      /*paddingLeft: '10px',
  paddingRight: '10px',*/
                      backgroundColor: "transparent",
                      width: "auto",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      fontSize: "20px",
                    }}
                    onClick={() => this.hideComponent("showCandidateAnswers")}
                  >
                    {showCandidateAnswers ? <p>Show less</p> : <p>Show more</p>}
                  </button>
                </div>
              );
            })}
        </div>
      );
    } else {
      return (
        <h2
          className="candidateSuggestions"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {" "}
          Unfortunately no one related with your answers{" "}
        </h2>
      );
    }
  }
}

export default Suggestions;
