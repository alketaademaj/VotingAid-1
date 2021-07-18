import React, { Component } from 'react';
import { SetCandidateTable, FilterCandidateTable } from '../functions/dbCalls';
import { QuestionAreaList } from './partials/selectMenuLists'
import SelectMenu from './partials/selectMenu.js';
import CandidateTable from './partials/candidateTable';
import language from "../properties/language";
import { UserContext } from '../context/userContext';

class Candidates extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      amount: [],
      Association: [],
      theme: this.props.theme,
      filtered: false,
    }
  }

  SetStateArray = (stateArray, value) => {
    // console.log(value)
    this.setState({ [stateArray]: value });
  }

  componentDidMount() {
    this.state.filtered ? console.log('filtteröinnin ja poiston chekki') :
      SetCandidateTable(this.SetStateArray)
  }

  handleChange(e) {
    if (e.target.value != 'Select filter') {
      this.setState({ filtered: true })
      FilterCandidateTable(this.SetStateArray, e.target.value);
    } else {
      SetCandidateTable(this.SetStateArray); // IF undefined value is given, Return table state including every candidate
    }
  }

  render() {
    return (
      <div style={{ width: '50%', marginLeft: '25%', marginTop: '5%' }}>
        <label htmlFor="school" className="filterCandidateLabel">{language.filterCandidateLabel[this.context.language]}</label>
        <SelectMenu
          className={'studentAssociationList'}
          selectMenuList={QuestionAreaList}
          action={this.handleChange.bind(this)}
        />
        {/* {console.log(this.state.amount)} */}
        <CandidateTable
          stateArray={this.state} counter={-1}
          candidateDeleted={() => {
            console.log('Got event')
            SetCandidateTable(this.SetStateArray)
          }}
        />
      </div>
    );
  }
}
export default Candidates;