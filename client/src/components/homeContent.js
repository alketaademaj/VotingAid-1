import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Laurea'
    }
  }

  handleChange() {
    this.setState({value: this.refs.campus.value});
  }
  static contextType = UserContext;
  render() {
    console.log(this.context);
    return (
      <div className="homeScreen">
        <label htmlFor="campus">Valitse Koulusi</label>
          <select ref="campus" onChange={this.handleChange.bind(this)}>
            <option value="Laurea">Laurea</option>
            <option value="Metropolia">Metropolia</option>
            <option value="Haaga-Helia">Haaga-Helia</option>
            <option value="JAMK">JAMK</option>
            <option value="O'Diako">O'Diako</option>
          </select>
        <Link
          to={{
            pathname: "/Form",
             state: this.state
          }}> Form </Link>
      </div>
    );
  }
}

export default Content;
