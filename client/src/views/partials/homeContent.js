import React from 'react';
import { Link } from 'react-router-dom';

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

  render() {
    return (
      <div>
        <label for="campus">Valitse Koulusi</label>
          <select ref="campus" onChange={this.handleChange.bind(this)}>
            <option value="Laurea">Laurea</option>
            <option value="Metropolia">Metropolia</option>
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
