import React, { PureComponent } from "react";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { endpoint, url } from "../../api";

export class CandidateAnswers extends PureComponent {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  componentDidMount() {
    console.log(this.props.location.data);
  }

  render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
}

export default CandidateAnswers;
