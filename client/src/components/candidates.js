import React, { Component } from 'react';
import { SetCandidateTable, FilterCandidateTable } from '../functions/dbCalls';
import { QuestionAreaList } from './partials/selectMenuLists'
import SelectMenu from './partials/selectMenu.js';
import CandidateTable from './partials/candidateTable';

  class Candidates extends Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: [],
        Association: [],
      }
    }

    SetStateArray = (stateArray,value) => {
      this.setState({[stateArray]: value});
    } 

    componentDidMount() {
      SetCandidateTable(this.SetStateArray);
   }

   handleChange(e) {
     if (e.target.value != 'Undefined') {
     FilterCandidateTable(this.SetStateArray,e.target.value);
     } else {
      SetCandidateTable(this.SetStateArray); // IF undefined value is given, Return table state including every candidate
     }
   }


    render() {
      return (
        <div style = {{width: '50%', marginLeft: '25%', marginTop: '5%'}}>
        <label htmlFor ="school">Filter by School</label>
        <SelectMenu
          className={'studentAssociationList'} 
          selectMenuList={QuestionAreaList}
          action={this.handleChange.bind(this)}
        />
        {console.log(this.state.amount)}
         <CandidateTable stateArray={this.state} counter={-1} />
         </div>
      );
    }
  }
  export default Candidates;
