import React, { Component } from 'react';
import axios from 'axios';


class OptionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        name: '',
    };
  }
    initName(name) {
      this.setState({name: name});
    }
    initValue(value) {
      this.setState({value: value });
    }

    render() {
      return (
        <input type = "radio" value = { this.initValue() } name = { this.initName() }
        //onChange = { this.handleClick.bind(this) }
        />
      );
    }
}

export default OptionButton;
