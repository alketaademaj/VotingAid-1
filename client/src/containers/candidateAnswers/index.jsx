import React, { Component } from "react";
// import language from "../../properties/language";
// import { UserContext } from "../../context/userContext";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

export class CandidateAnswers extends Component {
  // static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
    };
  }

  render() {
    return (
      <div>
        <h1>THIS WORKS</h1>
      </div>
    );
  }
}

export default CandidateAnswers;
