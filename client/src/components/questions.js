import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import { IoMdCheckmark } from "react-icons/io";
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
      axios.get('http://localhost:5000/allQuestions')
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

    handleChange(e) {
      console.log(e.target.select.option)
    }

    confirmChange = (e) => {
      var defaultData = (this.refs[e.target.id].defaultValue);
      var changed = (this.refs[ e.target.id].value);


      var data = {
        default: defaultData,
        changed: changed,
      }

      console.log(data);
      axios.post('http://localhost:5000/submitQhuahoo',{data})
        .then(res => {

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
              <div className = {'set' + counter}>
                  <input ref = {'question' + counter} type = "text" style = {{display: "inline",}} defaultValue = {question.question} onChange={this.handleChange} />
                  <p  id = {'school' + counter} ref = {'school' + counter} style = {{display: "inline",}}>{question.area}</p>
                  < IoMdCheckmark  onClick={this.confirmChange} id = {'question' + counter}/>
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
