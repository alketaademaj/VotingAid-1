import React, { Component } from 'react';
import axios from "axios";
import language from "../properties/language";
import { UserContext } from '../context/userContext';

class Questions extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      schools: [],
      filtersData: [],
    };
  }

  componentDidMount() {
    this.allQuestions();
  }

  changeInputValue = (e, idx) => {
    let newQuestions = [...this.state.questions];
    let question = newQuestions.findIndex((q) => q._id === idx)
    //newQuestions[question].question = e.target.value;
    newQuestions[question].question = e.target.value;
    this.setState({ questions: [...newQuestions] })
  }

  allQuestions = () => {
    console.log('inside')
    this.setState({ questions: [] })
    axios.get('http://localhost:5000/allQuestions')
      .then(res => {
        this.setState({ questions: res.data })
        let newFilters = [];
        res.data.map(filter => newFilters.push(filter.area))
        let unique = [...new Set(newFilters)];
        this.setState({ filtersData: [...unique] })
      });
  }

  FilterQuestions = (filter) => {
    this.setState({ questions: [] })
    axios.post('http://localhost:5000/filteredQuestions', { data: filter })
      .then(res => {
        this.setState({ questions: res.data })
      })
  }

  handleChange = (e) => {
    if (e.target.value !== 'Select filter') {
      console.log('not select filter')
      this.FilterQuestions(e.target.value);
    } else {
      console.log('select filter')
      this.allQuestions()
    }
  }

  confirmChange = (e) => {
    e.e.preventDefault();
    let defaultData = (this.refs[e.e.target.id].defaultValue);
    let id = e.id
    var data = {
      default: defaultData,
      id: id,
    }
    axios.post('http://localhost:5000/submitQhuahoo', { data })
      .then(res => {
        alert("We've changed you");
      }).catch(e => {
        console.log(e)
      });

  }

  confirmDelete = (value) => {
    value.e.preventDefault();
    let id = value.id;
    var del = value.e.target.className;

    var remove = this.state.questions.map(function (e) { return e.question; })
      .indexOf(this.refs[del].value);
    this.refs['set' + remove].remove();

    axios.post('http://localhost:5000/deleteQhuahoo', { id })
      .then(res => {
        alert('is removed')
      });

  }

  render() {
    // console.log(this.refs.set0);
    var counter = -1;
    return (
      <div>
        <label style={{ marginTop: '5%' }} htmlFor="school" className="filterCandidateLabel">{language.filterCandidateLabel[this.context.language]}</label>
        <select onChange={this.handleChange}>
          {/* <option value="-">Oppilaskunta / universaali</option> */}
          <option value="Select filter">Select filter</option>
          {/* <option value="Undefined">Undefined</option>
          <option value="ASK">ASK</option>
          <option value="Helga">Helga</option>
          <option value="HUMAKO">HUMAKO</option>
          <option value="JAMKO">JAMKO</option>
          <option value="Laureamko">Laureamko</option>
          <option value="METKA">METKA</option>
          <option value="O'Diako">O'Diako</option>
          <option value="TUO">TUO</option> */}
          {console.log(this.state.filtersData)}
          {this.state.filtersData && this.state.filtersData.map(filter => <option value={filter}>{filter}</option>)}
        </select>
        <br></br>
        <form style={{ marginTop: '2%' }}>
          {this.state.questions && this.state.questions.map((question, idx) =>
            <div className={'set' + idx} ref={'set' + idx}>
              <input
                ref={'question' + idx}
                type="text"
                style={{ display: "inline" }}
                defaultValue={question.question}
                onChange={(e) => this.changeInputValue(e, question._id)} />
              <p>{question.question}</p>
              <p style={{ display: "inline" }}>{question.area}</p>
              <br />
              <button onClick={(e) => this.confirmChange({ e, id: question._id })} id={'question' + idx}>EDIT</button>
              <button
                className={'question' + idx}
                onClick={(e) => this.confirmDelete({ e, id: question._id })}>DELETE </button>
              < br />
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Questions;
