import React, { Component } from 'react';
import { UserContext } from '../context/userContext';
import Table from 'react-bootstrap/Table';
import axios from "axios";

  class Candidates extends Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: [],
      }
    }

    componentDidMount() {
     axios.get('http://localhost:5000/')
       .then(res => {
         let q = [];
         for(var i = 0; i < res.data.length;i++) {
           this.setState({ ['Candidate' + i]: res.data[i]})
           q.push(res.data[i].name);
           var joined = this.state.amount.concat(q[i]);
           this.setState({ amount: joined })
         }
     });
   }

    render() {
      var counter = -1;
      {console.log(this.state.amount.length)}
      return (
        <div style = {{width: '50%', marginLeft: '25%', marginTop: '5%'}}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate</th>
              </tr>
            </thead>
            <tbody>
            {this.state.amount.map(index => {
              counter++;
                return (
                    <tr>
                      <td>{counter + 1}</td>
                      <td>{this.state['Candidate' + counter].name + ' ' + this.state['Candidate' + counter].surname}</td>
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
