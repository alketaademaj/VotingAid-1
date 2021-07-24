import React, { PureComponent } from "react";
import language from "../../properties/language";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

export class CandidateAnswers extends PureComponent {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      //   suggested: "",
      //   answers: [],
      //   answersDesc: [],
      //   area: "",
      //   path: this.props.location.pathname.split("/")[2],
    };
  }

  componentDidMount = () => {
    // this.setState({ suggested: this.props.suggested });
    console.log(this.props.suggestions);
  };

  render() {
    return (
      <div>
        <h1>THIS WORKS</h1>
        <Link to="/suggestedCandidates">Go back</Link>
      </div>
    );
  }
}

export default CandidateAnswers;
