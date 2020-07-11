import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import Table from 'react-bootstrap/Table';
import axios from "axios";

  class Questions extends Component {

    constructor(props) {
      super(props);
      this.state={
        questions: [],
        schools: [],
      };
    }

    componentDidMount() {
      axios.get('http://localhost:5000/questions')
        .then(res => {
          let q = [];
          let s = [];
          for(var i = 0; i < res.data.length;i++) {
            q.push(res.data[i]);
            var joined = this.state.questions.concat(q[i]);
            this.setState({ questions: joined })
            s.push(res.data[i].area);
          }
          const uniqueSchools = Array.from(new Set(s));
          this.setState({ schools: uniqueSchools });
      });
    }

    render() {
      console.log(this.state.schools);
      var counter = -1;
      return (
        <div>
        {this.state.questions.map(question => {
          counter++;
            return (
              <div className = 'questionSet' ref = {'q'+ counter} >
                  <p style = {{display: "inline"}}>{question.question}</p>
                  <select ref="school" /*onChange={this.handleChange.bind(this)}*/ value = {question.area}>
                    {this.state.schools.map(school => {
                        return (
                          <option value = {school}>{school}</option>
                        );
                    }
                    )}
                  </select>
                  <br />
                  <br />
              </div>
            );
        }
      )}
      </div>
      );
    }
}

export default Questions;
