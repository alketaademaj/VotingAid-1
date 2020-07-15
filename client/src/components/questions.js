import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import { IoIosBrush } from "react-icons/io";
import { IoIosTrash } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";


import Table from 'react-bootstrap/Table';
import axios from "axios";

  class Questions extends Component {

    constructor(props) {
      super(props);
      this.state={
        questions: [],
        schools: [],
        disabled: true,
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

    handleChange() {
      this.value = this;
    }

    enableEdit(e) {
      let target = e.target.getAttribute('name');
      this.refs['question' + target].disabled = false;
      this.refs['school' + target].disabled = false;
    }

    addQuestion() {

    }

    render() {
      console.log(this.state.schools);
      var counter = -1;
      return (
        <div>
        {this.state.questions.map(question => {
          counter++;
            return (
              <div className = {'set' + counter}>
                  <input ref = {'question' + counter} type = "text" style = {{display: "inline",}} defaultValue = {question.question} onChange={this.handleChange.bind(this)} disabled = {this.state.disabled} />
                  <select ref = {'school' + counter} /*onChange={this.handleChange.bind(this)}*/ value = {question.area} disabled = {this.state.disabled}>
                    {this.state.schools.map(school => {
                        return (
                          <option value = {school}>{school}</option>
                        );
                    }
                    )}
                  </select>
                  <IoIosBrush  name = {counter} onClick = {this.enableEdit.bind(this)}/>
                  <IoIosTrash />
                  <br />
                  <br />
              </div>
            );
        }
      )}
      <IoIosAddCircleOutline onClick = {this.addQuestion.bind(this)} style = {{cursor: 'pointer', fontSize: '50px'}} />
      </div>

      );
    }
}

export default Questions;
