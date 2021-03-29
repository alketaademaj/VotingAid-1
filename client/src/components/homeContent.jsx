import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

class Content extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      studentAssociation: "Undefined",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ value: this.refs.campus.value });
  }

  render() {
    return (
      <div className="homeScreen">
        <h1>Tervetuloa vaalikoneeseen!</h1>
        <p>
          Here will be information about the voting machine. Sunt labore laboris
          enim velit tempor esse reprehenderit tempor consectetur mollit
          cupidatat consequat velit deserunt. Quis dolor quis in cupidatat
          reprehenderit dolor. Officia eiusmod proident dolore nisi exercitation
          incididunt et sit proident elit pariatur. Proident fugiat deserunt
          mollit mollit voluptate ut. Tempor occaecat aute pariatur ut deserunt.
          Mollit irure magna commodo voluptate. Aliquip mollit qui est minim
          nostrud commodo dolor non est.
        </p>
        <label htmlFor="campus">Valitse Koulusi</label>
        <select ref="campus" onChange={this.handleChange.bind(this)}>
          <option value="-">Valitse opiskelijakuntasi</option>
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
          to={{
            pathname: "/Form",
            studentAssociation: this.state.studentAssociation,
          }}
        >
          Form
        </Link>
      </div>
    );
  }
}

export default Content;
