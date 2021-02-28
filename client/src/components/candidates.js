import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Link } from 'react-router-dom';
import Profile from './profile.js';

  class Candidates extends Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: [],
        Association: [],
      }
    }

    componentDidMount() {
     axios.get('http://localhost:5000/')
       .then(res => {
         let q = [];
         let s = [];
         for(var i = 0; i < res.data.length;i++) {
           this.setState({ ['Candidate' + i]: res.data[i]})
           q.push(res.data[i].name);
           var joined = this.state.amount.concat(q[i]);
           this.setState({ amount: joined });
           s.push(res.data[i].studentAssociation);

         }
         const uniqueAssociations = Array.from(new Set(s));
         this.setState({ Association: uniqueAssociations });
     });
   }

   handleChange() {
     axios.post('http://localhost:5000/filteredCandidates',{data: this.refs.school.value})
       .then(res => {
         let q = [];
         for(var i = 0; i < res.data.length;i++) {
           this.setState({ ['Candidate' + i]: res.data[i]})
           q.push(res.data[i].name);
           this.setState({ amount: q});
         }
       });
   }


    render() {
      var counter = -1;
      return (
        <div style = {{width: '50%', marginLeft: '25%', marginTop: '5%'}}>
        <label htmlFor ="school">Filter by School</label>
        <select ref="school" onChange={this.handleChange.bind(this)}>
          {this.state.Association.map(index => {
              return (
                <option value = {index}>{index}</option>
              );
          }
          )}
        </select>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate</th>
                <th>Student Association</th>
              </tr>
            </thead>
            <tbody>
            {this.state.amount.map(index => {
              counter++;
                return (
                    <tr>
                      <td>{counter + 1}</td>
                      <td style = {{cursor: "pointer"}}>
                      <Link
                        to={{
                          pathname: "/Profile",
                          data: this.state['Candidate' + counter].email
                        }}> {this.state['Candidate' + counter].name + ' ' + this.state['Candidate' + counter].surname}
                      </Link>
                      </td>
                      <td>{this.state['Candidate' + counter].studentAssociation}</td>
                    </tr>
                );
            }
          )}
          </tbody>
          </Table>
        </div>
      );
    }
  }
  export default Candidates;
