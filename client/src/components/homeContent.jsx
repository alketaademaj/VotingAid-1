import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Undefined",
    };
  }

  handleChange() {
    this.setState({ value: this.refs.campus.value });
  }

  static contextType = UserContext;
  
  componentDidMount() {
    const { checkExistingLogin } = this.context;
    checkExistingLogin();

    if (window.location.pathname === "/") {
      document.body.style.backgroundColor = "#D3CCE3";
    } else {
      console.log("toimii");
    }
  }

  render() {
    return (
      <div className="homeScreen">
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
        <option value="Undefined">Undefined</option>
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
            state: this.state,
          }}
        >
          {" "}
          Form{" "}
        </Link>
      </div>
    );
  }
}

export default Content;
