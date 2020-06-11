import React, { Component } from 'react';
import axios from 'axios';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

   componentDidMount() {
    axios.get('http://localhost:5000/questions')
      .then(res => {
        let q = [];
        for(var i = 0; i < res.data.length;i++) {
          q.push(res.data[i]);
          var joined = this.state.questions.concat(q[i]);
          this.setState({ questions: joined })
        }
    });
  }

  render() {
    console.log(this.props.location.state);
    var counter = -1;
    return (
      <form action ="/Send" method="POST">
      {this.state.questions.map(index => {
        counter++;
        if(index.area == this.props.location.state.value || index.area == 'Undefined') {
          return (
            <div className="radio">
                <label>{index.question}</label>
                <div><sub className="disa">Disagree</sub><sub className="agg">Agree</sub></div>
                <input type="radio" value="option1" name = {counter} />
                <input type="radio" value="option2" name = {counter} />
                <input type="radio" value="option3" name = {counter} />
                <input type="radio" value="option4" name = {counter} />
                <input type="radio" value="option5" name = {counter} />
            </div>
          );
        }
      })}
        <input type="submit" value="Fill ur form"></input>
      </form>
    );
  }
}
export default Form;
