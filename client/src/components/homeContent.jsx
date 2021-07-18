import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import language from "../properties/language";

class Content extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      studentAssociation: "-",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ studentAssociation: this.refs.campus.value });
    console.log(this.state.studentAssociation);
  }

  render() {
    return (
      <div className="homeScreen">
        <h1>{language.title[this.context.language]}</h1>
        <p>{language.homePageDescription[this.context.language]}</p>
        <label htmlFor="campus">
          {language.selectStudentAssociation[this.context.language]}
        </label>
        <select ref="campus" onChange={this.handleChange.bind(this)}>
          <option value="-">
            {" "}
            {language.selectStudentAssociation[this.context.language]}
          </option>
          <option value="ASK">ASK</option>
          <option value="Helga">Helga</option>
          <option value="HUMAKO">HUMAKO</option>
          <option value="JAMKO">JAMKO</option>
          <option value="Laureamko">Laureamko</option>
          <option value="METKA">METKA</option>
          <option value="O'Diako">O'Diako</option>
          <option value="TUO">TUO</option>
        </select>
        <Link
          className="Form-button"
          style={{
            visibility:
              this.state.studentAssociation != "-" ? "visible" : "hidden",
          }}
          to={{
            pathname: "/Form",
            studentAssociation: this.state.studentAssociation,
          }}
        >
          {language.formButton[this.context.language]}
        </Link>
      </div>
    );
  }
}

export default Content;
